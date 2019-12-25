import requests
import time
import random
from web3 import Web3, HTTPProvider
from eth_abi import encode_abi
from eth_utils import function_signature_to_4byte_selector, to_checksum_address
from eth_account.messages import defunct_hash_message
from config import (
    JSON_RPC_ENDPOINT,
    RESOLVER_ADDRESS,
    RESOLVER_PK,
    COORDINATOR_ENDPOINT,
    DATASET_ADDRESS,
)

web3 = Web3(HTTPProvider(JSON_RPC_ENDPOINT))
NONCE = -1


def sign_aggregate(tcd_address, key_bytes, value, timestamp, status, private_key):
    message_hash = web3.soliditySha3(
        ["bytes", "uint256", "uint64", "uint8", "address"],
        [key_bytes, value, timestamp, status, to_checksum_address(tcd_address)],
    )
    signed_message = web3.eth.account.signHash(
        defunct_hash_message(message_hash), bytes.fromhex(private_key)
    )
    v = int(signed_message.v)
    r = int(signed_message.r).to_bytes(32, byteorder="big")
    s = int(signed_message.s).to_bytes(32, byteorder="big")
    return (v, r, s)


def generate_data(dataset_address, key, price, timestamp):
    V, R, S = [], [], []
    for pk in PROVIDER_PKS.split(","):
        v, r, s = sign_aggregate(
            dataset_address, str.encode(key), price, timestamp, 1, pk
        )
        V.append(v)
        R.append(r)
        S.append(s)
    return (
        "0x"
        + (
            function_signature_to_4byte_selector(
                "report(bytes,uint256,uint64,uint8,uint8[],bytes32[],bytes32[])"
            )
            + encode_abi(
                [
                    "bytes",
                    "uint256",
                    "uint64",
                    "uint8",
                    "uint8[]",
                    "bytes32[]",
                    "bytes32[]",
                ],
                [str.encode(key), price, timestamp, 1, V, R, S],
            )
        ).hex()
    )


def get_data():
    key = "SPOTPX/BTC-USD"
    try:
        return requests.post(
            COORDINATOR_ENDPOINT,
            json={"dataset": DATASET_ADDRESS, "key": key, "broadcast": False},
            timeout=10,
        ).json()["data"]
    except:
        print("Failed to get data from coordinator node", flush=True)
        return None


def resolve_bet(contract_address, px, id):
    global NONCE
    NONCE = max(web3.eth.getTransactionCount(RESOLVER_ADDRESS, "pending"), NONCE)
    gas_price = requests.get("https://ethgasstation.info/json/ethgasAPI.json").json()[
        "fast"
    ]
    last_data = bytes.fromhex(px["data"][2:])
    func_sig = function_signature_to_4byte_selector("resolve(uint256,bytes)")
    signed = web3.eth.account.signTransaction(
        {
            "to": contract_address,
            "data": func_sig + encode_abi(["uint256", "bytes"], [id, last_data]),
            "nonce": NONCE,
            "gasPrice": web3.toWei(str(gas_price / 10 + 5), "gwei"),
            "gas": 250000,
        },
        RESOLVER_PK,
    )

    NONCE += 1

    txhash = web3.eth.sendRawTransaction(signed.rawTransaction).hex()
    return txhash


def play(contract_address, data):
    NONCE = web3.eth.getTransactionCount(RESOLVER_ADDRESS, "pending")
    gas_price = requests.get("https://ethgasstation.info/json/ethgasAPI.json").json()[
        "fast"
    ]
    last_data = bytes.fromhex(data[2:])
    func_sig = function_signature_to_4byte_selector("buy(uint64,bool,bytes)")
    signed = web3.eth.account.signTransaction(
        {
            "to": contract_address,
            "data": func_sig
            + encode_abi(
                ["uint64", "bool", "bytes"],
                [int(time.time()) + 345, random.randint(0, 1) == 0, last_data],
            ),
            "nonce": NONCE,
            "gasPrice": web3.toWei(str(gas_price / 10 + 5), "gwei"),
            "value": web3.toWei("0.104", "ether"),
            "gas": 350000,
        },
        RESOLVER_PK,
    )

    txhash = web3.eth.sendRawTransaction(signed.rawTransaction).hex()
    return txhash

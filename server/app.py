import eventlet

eventlet.monkey_patch()

import requests
import time
import pickle
import random
from collections import deque, defaultdict
from flask import Flask
from flask_cors import CORS
from flask_apscheduler import APScheduler
from flask_socketio import SocketIO, emit
from util import get_data, resolve_bet
from config import CONTRACT_ADDRESS

FILENAME = "backup_price.pkl"

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")
scheduler = APScheduler()

# For run Gunicorn
scheduler.init_app(app)
scheduler.start()

pxs = deque()

try:
    pxs = pickle.load(open(FILENAME, "rb"))
except:
    current_time = int(time.time())
    for t in range(current_time - 1800, current_time):
        pxs.append(
            {"px": random.randint(10000 * 1e18, 11000 * 1e18), "ts": t, "data": ""}
        )


@scheduler.task(
    "interval", id="reload", seconds=2, max_instances=6, misfire_grace_time=10
)
def reload_px():
    data = get_data()
    if data is None:
        return
    time.sleep(5)
    px = str(int(data[74:138], 16))
    ts = int(data[138:202], 16)
    obj = {"px": px, "ts": ts, "data": data}
    socketio.emit("update", obj)
    pxs.append(obj)
    while pxs and int(time.time()) - pxs[0]["ts"] >= 1800:
        pxs.popleft()

    pickle.dump(pxs, open(FILENAME, "wb"))


LAST_RESOLVE = defaultdict(int)


@scheduler.task("interval", id="resolve", seconds=5, max_instances=3)
def resolve():
    query = requests.post(
        "https://api.thegraph.com/subgraphs/name/taobun/bitswing-mainnet",
        json={
            "query": """{ orders(where: {resolveTime_lt: """
            + str(int(time.time()) - 30)
            + """, status: "WAITING"}) { id resolveTime } }"""
        },
    ).json()["data"]["orders"]
    for item in query:
        if (
            LAST_RESOLVE[item["id"]] == 0
            or int(time.time()) - LAST_RESOLVE[item["id"]] > 60
        ) and item["resolveTime"] < pxs[-1]["ts"]:
            nearest_index = -1
            while (
                abs(nearest_index) <= len(pxs)
                and pxs[nearest_index]["ts"] > item["resolveTime"]
            ):
                nearest_index -= 1
            print(
                "Resolve now.",
                int(time.time()),
                item["resolveTime"],
                pxs[nearest_index + 1]["ts"],
            )
            ok = resolve_bet(CONTRACT_ADDRESS, pxs[nearest_index + 1], int(item["id"]))
            if ok:
                LAST_RESOLVE[item["id"]] = int(time.time())


@socketio.on("connect")
def initialize_px():
    emit("init", list(pxs))


@app.route("/healthcheck")
def healthcheck():
    return "OK"


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=9000, debug=False)

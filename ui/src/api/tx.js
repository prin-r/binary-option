import abi from './abi'

const contractAddress = '0xd120546fd587fbB3d82E7e0aD5b467BE276c8b27'

export const buy = (library, sender, resolveTime, isCall, data, amount) => {
  const contract = new library.eth.Contract(abi, contractAddress)

  contract.methods.buy(resolveTime, isCall, data).send({
    from: sender,
    value: amount,
    gas: '300000',
  })
}

export const registerInfo = async (library, sender, info) => {
  const contract = new library.eth.Contract(
    [
      {
        constant: true,
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'users',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [{ internalType: 'string', name: 'user', type: 'string' }],
        name: 'setUser',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    '0x588Fc7C4DB5c2028fB406c818723f05545A8C464',
  )

  try {
    const result = await contract.methods.setUser(info).send({ from: sender })
    return result.transactionHash
  } catch (err) {
    console.error(err)
  }
}

window.registerInfo = registerInfo

export const getOrderFee = async library => {
  const contract = new library.eth.Contract(abi, contractAddress)
  return contract.methods.queryFee().call()
}

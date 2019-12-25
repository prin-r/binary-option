export default [
  {
    constant: false,
    inputs: [
      { name: 'resolveTime', type: 'uint64' },
      { name: 'isCall', type: 'bool' },
      { name: 'data', type: 'bytes' },
    ],
    name: 'buy',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'queryFee',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

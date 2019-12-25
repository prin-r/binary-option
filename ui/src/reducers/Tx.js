export const TxStateTemplate = {
  address: '',
  network: '',
  balance: '0',
  profit: '0',
  loss: '0',
}

export const TxActions = (state, action) => {
  // some middleware
  switch (action.type) {
    case 'setAddress':
      return {
        ...state,
        address: action.address,
      }
    case 'setNetwork':
      return {
        ...state,
        network: action.network,
      }
    case 'setTxState':
      return {
        ...state,
        ...action.state,
      }
    default:
      return state
  }
}

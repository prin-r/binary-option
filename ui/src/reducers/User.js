export const UserStateTemplate = {
  address: '',
  network: '',
  balance: '0',
  profit: '0',
  loss: '0',
  loginWith: '',
}

export const UserActions = (state, action) => {
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
    case 'setUserState':
      return {
        ...state,
        ...action.state,
      }
    default:
      return state
  }
}

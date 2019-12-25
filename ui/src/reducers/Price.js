export const PriceStateTemplate = {
  init: [],
  userTxsCache: [],
  globTxsCache: [],
  latest: {
    px: '0',
    ts: 0,
    data: '',
  },
}

export const PriceActions = (state, action) => {
  // some middleware
  switch (action.type) {
    case 'init':
      return {
        ...state,
        init: [...action.init],
      }
    case 'setLatest':
      return {
        ...state,
        latest: { ...action.latest },
      }
    case 'setUserTxsCache':
      return {
        ...state,
        userTxsCache: [...action.userTxs],
      }
    case 'setGlobTxsCache':
      return {
        ...state,
        globTxsCache: [...action.globTxs],
      }
    default:
      return state
  }
}

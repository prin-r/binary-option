import React, { createContext, useContext } from 'react'
import { useUserContextState } from './User'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const OpenOrderContext = createContext()

export const OpenOrderProvider = ({ children }) => {
  const [{ address }] = useUserContextState()
  const { data, loading } = useSubscription(
    gql`
      subscription txHistory($userAddress: String!) {
        user(id: $userAddress) {
          orders(first: 1, orderBy: buyTimestamp, orderDirection: desc) {
            startTime
            resolveTime
            status
            strikePrice
            isCall
          }
        }
      }
    `,
    { variables: { userAddress: address ? address.toLowerCase() : '' } },
  )

  let result
  if (loading || !data || !data.user || !data.user.orders.length) {
    result = { strikePrice: null, isCall: null }
  } else {
    const order = data.user.orders[0]
    if (order.status === 'RESOLVED') {
      result = { hasOpen: false, strikePrice: null, isCall: null }
    } else {
      const remaining = order.resolveTime * 1000 - Date.now()
      result = {
        hasOpen: true,
        strikePrice: remaining > 0 ? order.strikePrice : null,
        isCall: order.isCall,
        startTime: order.startTime,
        resolveTime: order.resolveTime,
      }
    }
  }

  return (
    <OpenOrderContext.Provider value={result}>
      {children}
    </OpenOrderContext.Provider>
  )
}

export const useOpenOrderContextState = () => useContext(OpenOrderContext)

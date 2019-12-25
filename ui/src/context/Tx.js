import React, { createContext, useContext, useState } from 'react'
import { useUserContextState } from './User'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const TxContext = createContext()

export const TxProvider = ({ children }) => {
  const [userOffset, setUserOffset] = useState(0)
  const [globOffset, setGlobOffset] = useState(0)

  const [{ address }, _] = useUserContextState()

  const userAddress = address ? address.toLowerCase() : ''

  const { data: userData, loading: loadingUserData } = useSubscription(
    gql`
      subscription txHistory($userAddress: String!, $userOffset: Int!) {
        userOrders: orders(
          first: 10
          skip: $userOffset
          orderBy: buyTimestamp
          orderDirection: desc
          where: { owner: $userAddress }
        ) {
          id
          owner {
            id
          }
          resolveTime
          isCall
          strikePrice
          settlementPrice
          status
          placed
          reward
          result
          buyTxHash
          resolveTxHash
          buyTimestamp
        }
      }
    `,
    {
      variables: {
        userAddress,
        userOffset,
      },
    },
  )

  const { data: globData, loading: loadingGlobData } = useSubscription(
    gql`
      subscription txHistory($globOffset: Int!) {
        orders(
          first: 10
          skip: $globOffset
          orderBy: buyTimestamp
          orderDirection: desc
          where: { result_not: 3 }
        ) {
          id
          owner {
            id
          }
          resolveTime
          isCall
          strikePrice
          settlementPrice
          status
          placed
          reward
          result
          buyTxHash
          resolveTxHash
          buyTimestamp
        }
      }
    `,
    { variables: { globOffset } },
  )

  const { userOrders } = userData || { userOrders: [] }
  const { orders } = globData || { order: [] }

  return (
    <TxContext.Provider
      value={{
        userOrders,
        orders,
        loadingUserData,
        loadingGlobData,
        setUserOffset,
        setGlobOffset,
        userOffset,
        globOffset,
      }}
    >
      {children}
    </TxContext.Provider>
  )
}

export const useTxContextState = () => useContext(TxContext)

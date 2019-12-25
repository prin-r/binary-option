import React, { createContext, useContext } from 'react'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const { data, loading } = useSubscription(
    gql`
      subscription global($id: String!) {
        contracts(id: $id) {
          id
          totalPending
          totalCorrectOrder
          totalMissOrder
          payoutRate
          reservedAmount
          maxUsageAmount
        }
      }
    `,
    {
      variables: { id: '0xf540459bce103624330a92cf6c5acb7cc39b75f7' },
    },
  )

  let result
  if (loading || !data || !data.contracts || !data.contracts[0]) {
    result = { payoutRate: 0, maxUsageAmount: 0, reservedAmount: 0 }
  } else {
    const global = data.contracts[0]
    result = {
      maxUsageAmount: global.maxUsageAmount / 1e18,
      reservedAmount: global.reservedAmount / 1e18,
      payoutRate: global.payoutRate / 1e18,
    }
    // console.log(result)
  }

  return (
    <GlobalContext.Provider value={result}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContextState = () => useContext(GlobalContext)

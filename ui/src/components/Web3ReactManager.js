import React, { useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { Flex } from 'rebass'

export default ({ children }) => {
  const { active, error, setFirstValidConnector } = useWeb3Context()

  if (!active && !error) {
    // loading
    return children
  } else if (error) {
    //error
    return children
  } else {
    // success
    return children
  }
}

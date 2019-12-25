import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Image } from 'rebass'
import { useUserContextState } from '../context/User'
import { ModalConsumer } from 'context/Modal'
import MetamaskSrc from 'images/metamaskLogo.png'
import FortmaticSrc from 'images/fortmaticLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useWeb3Context } from 'web3-react'
import { isMobile } from 'ui/media'

const _isMobile = isMobile()

const WalletLink = styled(Flex).attrs({
  justifyContent: 'space-between',
  alignItems: 'center',
})`
  cursor: pointer;
  padding: 0px 30px;
  color: white;
  margin: 20px 0px;
  width: 100%px;
  height: 65px;
  border-radius: 8px;
  box-shadow: 3px 3px 9px 0 rgba(0, 0, 0, 0.5);
  background-color: rgba(216, 216, 216, 0.17);
`

const LoginModal = ({ hideModal }) => {
  const [_, userDispatch] = useUserContextState()
  const { setConnector } = useWeb3Context()

  const setLoginFlag = (flag, connectorName) => {
    setConnector(connectorName)
    userDispatch({ type: 'setUserState', state: { loginWith: flag } })
    hideModal()
  }

  return (
    <Flex
      p="10%"
      mx="auto"
      flexDirection="column"
      bg="rgba(41, 40, 42, 0.83)"
      style={{
        fontSize: window.innerWidth < 640 ? '18px' : '20px',
        width: '520px',
        height: '350px',
        borderRadius: '8px',
        boxShadow: '3px 3px 4px 0 rgba(0, 0, 0, 0.5)',
        maxWidth: '90%',
      }}
    >
      <Text mb="20px" color="#dad8d8">
        Login with Web3 wallet
      </Text>
      <WalletLink onClick={() => setLoginFlag('metamask', 'Injected')}>
        {_isMobile ? (
          <Flex width="100%" justifyContent="center">
            Mobile Wallet
          </Flex>
        ) : (
          <>
            <Flex alignItems="center">
              <Flex mr="50px" style={{ maxHeight: '30px', maxWidth: '30px' }}>
                <Image src={MetamaskSrc} height="30px" />
              </Flex>
              Metamask
            </Flex>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              onClick={e => {
                window.open('https://metamask.io/', '_target')
                e.stopPropagation()
              }}
            />
          </>
        )}
      </WalletLink>
      <WalletLink onClick={() => setLoginFlag('fortmatic', 'Fortmatic')}>
        <Flex alignItems="center">
          <Flex mr="50px" style={{ maxHeight: '30px', maxWidth: '30px' }}>
            <Image src={FortmaticSrc} />
          </Flex>
          Fortmatic
        </Flex>
      </WalletLink>
    </Flex>
  )
}

export default props => (
  <ModalConsumer>
    {({ setModal }) => <LoginModal setModal={setModal} {...props} />}
  </ModalConsumer>
)

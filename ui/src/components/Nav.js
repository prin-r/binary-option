import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { ModalConsumer } from 'context/Modal'
import { Flex, Image, Text, Button, Box } from 'rebass'
import Ethereum from 'images/ethereum.svg'
import Logo from 'images/bitswinglogo.svg'
import { useUserContextState } from 'context/User'
import PageContainer from 'components/PageContainer'
import Fortmatic from 'fortmatic'
import { isMobile } from 'ui/media.js'
import Loading from 'components/Loading'
import AuraFlex from 'components/AuraFlex'
import A from 'components/A'
import connectors from '../connectors.js'
import { useWeb3Context } from 'web3-react'

const BalanceBox = styled(Flex)`
  border-radius: 4px;
  box-shadow: 3px 3px 9px 0 rgba(0, 0, 0, 0.5);
`

const LoginButton = styled(Button)`
  color: white;
  border-radius: 4px;
  font-family: Source Code Pro;
  background: #0a937a;
  height: 30px;
  transition: all 200ms;
  outline: none;
  border: none;
  opacity: 0.8;
  cursor: pointer;
  padding: 0 15px;
  box-shadow: 1px 1px 3px black;

  &:hover {
    opacity: 1;
    border: none;
    color: white;
    box-shadow: 1px 1px 9px black;
  }

  &:active {
    opacity: 1;
    border: none;
    color: white;
    box-shadow: 1px 1px 9px black;
  }
`
const _isMobile = isMobile()

const Nav = ({ setModal }) => {
  const [{ balance, loginWith }, userDispatch] = useUserContextState()
  const [connecting, setConnecting] = useState(false)
  const {
    account: address,
    networkId: network,
    setFirstValidConnector,
    library,
    active,
  } = useWeb3Context()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const connect = async (force = false, autoEnable = true) => {
  //   if (window.ethereum) {
  //     if (connecting) return
  //     setConnecting(true)
  //     window.web3 = new Web3(window.ethereum)
  //     try {
  //       if (autoEnable) {
  //         await window.ethereum.enable()
  //       }
  //       const addr = (await window.web3.eth.getAccounts())[0] || ''
  //       userDispatch({
  //         type: 'setUserState',
  //         state: {
  //           address: addr,
  //           balance: addr !== '' ? await window.web3.eth.getBalance(addr) : '0',
  //         },
  //       })
  //     } catch (error) {
  //       alert('User denied account access')
  //     }
  //     setConnecting(false)
  //   } else if (force) {
  //     setConnecting(true)
  //     const fm = new Fortmatic('pk_test_077724267CA70139', 'mainnet')
  //     const web3 = new Web3(fm.getProvider())
  //     try {
  //       if ((await web3.eth.getAccounts())[0]) {
  //         window.web3 = web3
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     setConnecting(false)
  //   }
  // }

  // useEffect(() => {
  //   if (loginWith === 'fortmatic') {
  //     connect(true)
  //   }
  //   userDispatch({ type: 'setUserState', state: { loginWith: '' } })
  // }, [loginWith])

  // useEffect(() => {
  //   window.addEventListener('load', () => {
  //     if (!window.localStorage.getItem('showedOnBoard')) {
  //       setModal('instruction')
  //       window.localStorage.setItem('showedOnBoard', true)
  //     }
  //     connect(
  //       false,
  //       false,
  //     )
  //   })
  // }, [])

  const [clock, setClock] = useState(false)
  useEffect(() => {
    ;(async () => {
      const startTime = Date.now()
      if (active) {
        let addr = ''
        let networkId = 42
        let bal = '0'
        try {
          addr = (await library.eth.getAccounts())[0] || ''
          networkId = await library.eth.net.getId()
          bal = addr ? await library.eth.getBalance(addr) : '0'
        } catch (e) {}
        if (addr !== address || networkId !== network || bal !== balance) {
          userDispatch({
            type: 'setUserState',
            state: {
              address: addr,
              balance: bal,
              network: networkId,
            },
          })
        }
      }
      const deltaTime = Date.now() - startTime
      if (deltaTime < 1000)
        await new Promise(r => setTimeout(r, 1000 - deltaTime))
      setClock(!clock)
    })()
  }, [address, clock, active])

  const addr =
    address && address.length > 20 ? address.slice(0, 10) + '...' : address

  return (
    <PageContainer>
      <Flex alignItems="center" bg="tranparent" style={{ height: '60px' }}>
        <Flex
          flex={1}
          style={{
            minWidth: '60px',
            maxWidth: window.innerWidth < 640 ? '60px' : '300px',
          }}
        >
          <Box>
            <Image src={Logo} width="60px" style={{ minWidth: '60px' }} />
          </Box>
          {!_isMobile && (
            <>
              {/* <A
                href="https://medium.com/bandprotocol/7750fe756ecf"
                target="_blank"
              >
                <Flex
                  ml="20px"
                  p="8px 5px"
                  bg="#db6b00"
                  fontSize="14px"
                  color="white"
                  style={{
                    cursor: 'pointer',
                    fontWeight: 500,
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    boxShadow: '1px 1px 3px 0 rgba(0, 0, 0, 0.5)',
                    textDecoration: 'none',
                    transition: 'all 200ms',
                  }}
                  css={{
                    '&:hover': {
                      backgroundColor: '#ff7c00',
                    },
                  }}
                >
                  BNB giveaway
                </Flex>
              </A> */}
              {/* <A onClick={() => setModal('register')}>
                <AuraFlex
                  ml="20px"
                  p="8px 5px"
                  bg="#d1a415"
                  fontSize="14px"
                  color="black"
                  justifyContent="center"
                  style={{
                    maxWidth: '120px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Claim Reward
                </AuraFlex>
              </A> */}
            </>
          )}
        </Flex>
        <Flex
          flexDirection="row"
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          {!address ? (
            <Flex>
              <LoginButton onClick={() => setModal('login')}>
                <Flex
                  flexDirection="row"
                  alignItems="center"
                  fontSize={['14px', '18px']}
                  style={{
                    letterSpacing: '2px',
                  }}
                >
                  {address ? (
                    <Flex
                      style={{ transform: 'translateY(-15px) scale(0.5,0.5)' }}
                    >
                      <Loading />
                    </Flex>
                  ) : (
                    'Login'
                  )}
                </Flex>
              </LoginButton>
            </Flex>
          ) : (
            <React.Fragment>
              {network !== 1 ? (
                <Text fontSize={['12px', '16px']} color="white">
                  Please switch to Ethereum mainnet.
                </Text>
              ) : (
                <React.Fragment>
                  <BalanceBox
                    alignItems="center"
                    justifyContent="flex-end"
                    color="white"
                    mx="15px"
                    bg="#222832"
                    pl={['15px', '20px']}
                    py={['9px', '13px']}
                  >
                    <Text fontSize={['12px', '16px']}>
                      {(balance / 1e18).toFixed(3)}
                    </Text>
                    <Image src={Ethereum} width={['15px', '20px']} />
                  </BalanceBox>

                  <Flex
                    mr="5px"
                    color="hsl(0,0%,100%)"
                    fontSize={['12px', '16px']}
                  >
                    {isMobile() ? addr : address}
                  </Flex>
                  <Flex
                    ml="15px"
                    bg="#13171f"
                    style={{
                      boxShadow: '2px 2px 5px #13171f',
                      borderRadius: '50%',
                    }}
                  >
                    <Jazzicon
                      diameter={30}
                      seed={jsNumberForAddress(address)}
                    />
                  </Flex>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Flex>
      </Flex>
    </PageContainer>
  )
}

export default props => (
  <ModalConsumer>
    {({ setModal }) => <Nav setModal={setModal} {...props} />}
  </ModalConsumer>
)

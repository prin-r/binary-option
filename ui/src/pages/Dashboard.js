import React, { useState, useEffect } from 'react'
import { Flex, Text, Box } from 'rebass'
import styled from 'styled-components'
import PriceGraph from 'components/PriceGraph'
import { AutoSizer } from 'react-virtualized'
import { GlobalTxHistory, UserTxHistory } from 'components/TxHistory'
import { useUserContextState } from 'context/User'
import OptionBox from 'components/OptionBox'
import PageContainer from 'components/PageContainer'
import GraphSrc from 'images/graphBg.svg'
import CountUpNumber from 'components/CountUpNumber'
import { ModalConsumer } from 'context/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isMobile } from 'ui/media'
import GlobalCap from 'components/GlobalCap'
import { FormattedMessage } from 'react-intl'

import {
  faMediumM,
  faTwitter,
  faTelegramPlane,
} from '@fortawesome/free-brands-svg-icons'

const GraphBG = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 800px;
  opacity: 0.2;
  bottom: 0;
  z-index: 0;
  background-image: url(${GraphSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const StyleFontAwesome = styled(Text)`
  cursor: pointer;
`

const _isMobile = isMobile()

const Dashboard = ({ setModal }) => {
  const [tab, setTab] = useState(0)
  const [{ address, network }] = useUserContextState()

  const isPrompt = address && network === 1

  // history
  useEffect(() => {
    if (isPrompt) {
      setTab(0)
    } else {
      setTab(1)
    }
  }, [address, network])

  // inform changes
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('show-inform'))) {
      setTimeout(() => setModal('inform'), 1000)
    }
  }, [])

  return (
    <Flex flexDirection="column" style={{ position: 'relative' }}>
      <PageContainer pb="40px">
        <Flex
          flexDirection={['column', 'row']}
          mt={['20px', '20px']}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            color="white"
            p={['14px 10px', '26px 22px']}
            bg="rgba(0,0,0, 0.15)"
            style={{ borderRadius: '4px' }}
          >
            <Flex
              flexDirection={['column', 'row']}
              lineHeight={[1.6, 1]}
              fontSize={['13px', '24px']}
            >
              {_isMobile ? (
                <Text textAlign="center">
                  On-chain Trustless Binary Options, <br />
                  Powered by Band Protocol
                </Text>
              ) : (
                <Text textAlign="center">
                  <FormattedMessage id="On-chain Trustless Binary Options, Powered by Band Protocol"></FormattedMessage>
                </Text>
              )}

              <Flex
                mt={['10px', '0px']}
                ml={['0px', '14px']}
                justifyContent="center"
              >
                <StyleFontAwesome
                  onClick={() => window.open('https://medium.com/bandprotocol')}
                >
                  <FontAwesomeIcon icon={faMediumM}></FontAwesomeIcon>
                </StyleFontAwesome>
                <StyleFontAwesome
                  ml="13px"
                  onClick={() =>
                    window.open('https://twitter.com/bandprotocol')
                  }
                >
                  <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                </StyleFontAwesome>
                <StyleFontAwesome
                  ml="13px"
                  onClick={() =>
                    window.open('https://t.me/joinchat/E48nA06UIBFmNsE9OaDusQ')
                  }
                >
                  <FontAwesomeIcon icon={faTelegramPlane}></FontAwesomeIcon>
                </StyleFontAwesome>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Flex
          flex={1}
          flexDirection={['column', 'row']}
          alignItems="center"
          mb="20px"
        >
          <Flex
            flex={1}
            width="100%"
            flexDirection="column"
            alignItems="center"
            mt="30px"
            mb={['30px', '0px']}
            pr={['0px', '70px']}
          >
            {/* Header */}
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Text
                color="rgba(255, 255, 255, 0.6);"
                fontSize="1.6em"
                fontFamily="Montserrat"
                fontWeight={300}
              >
                BTC-USD
              </Text>
              <Text fontSize="1.6em" color="white" fontWeight={700}>
                <CountUpNumber />
              </Text>
            </Flex>

            {/* Graph */}
            <Box width="100%" style={{ height: '100%' }} mt="20px">
              <AutoSizer disableHeight>
                {({ width }) => <PriceGraph width={width} />}
              </AutoSizer>
            </Box>

            {/* Global Cap */}
            <GlobalCap />
          </Flex>
          <Flex flexDirection="column" justifyContent="space-between" mt="20px">
            <OptionBox setModal={setModal} />
          </Flex>
        </Flex>

        {/* History Tab */}
        <Flex mt="40px" flexDirection="column" width="100%">
          <Flex
            flexDirection="row"
            style={{ position: 'relative' }}
            width="100%"
          >
            {/* <Flex
              style={{
                zIndex: 0,
                position: 'absolute',
                width: isPrompt ? '95px' : '135px',
                height: '200%',
                transform: isPrompt
                  ? `translate(${[0, 155][tab]}px,0px) scaleX(${[1, 1.4][tab]})`
                  : '',
                transition: 'all 200ms',
                borderBottom: '3px solid white',
              }}
            /> */}
            {isPrompt && (
              <Flex
                mr="30px"
                color="#fff"
                onClick={() => setTab(0)}
                style={{
                  fontWeight: tab === 0 ? 700 : 500,
                  opacity: tab === 0 ? 1 : 0.8,
                  zIndex: 1,
                  minWidth: '90px',
                  cursor: 'pointer',
                  height: '35px',
                  borderBottom: tab === 0 ? '2px solid white' : 0,
                }}
              >
                <FormattedMessage id="My History"></FormattedMessage>
              </Flex>
            )}
            <Flex
              color="#fff"
              onClick={() => setTab(1)}
              style={{
                zIndex: 1,
                fontWeight: tab === 1 ? 700 : 500,
                opacity: tab === 1 ? 1 : 0.8,
                minWidth: '120px',
                cursor: 'pointer',
                height: '35px',
                borderBottom: tab === 1 ? '2px solid white' : 0,
              }}
            >
              <FormattedMessage id="Global History"></FormattedMessage>
            </Flex>
          </Flex>
          {/* History Table */}
          <Flex mt="20px" flex={1} style={{ minWidth: 0 }}>
            {tab === 0 && <UserTxHistory />}
            {tab === 1 && <GlobalTxHistory />}
          </Flex>
        </Flex>
        <Flex
          mt="20px"
          justifyContent="center"
          alignItems="center"
          style={{ height: '30px', zIndex: 20000, position: 'relative' }}
        >
          <Box
            bg="#2d3033"
            p="10px 20px"
            style={{ cursor: 'pointer' }}
            onClick={() => setModal('tos')}
          >
            <Text fontSize="14px" color="white">
              <FormattedMessage id="Terms of Service"></FormattedMessage>
            </Text>
          </Box>
        </Flex>
      </PageContainer>
      <GraphBG />
    </Flex>
  )
}

export default props => (
  <ModalConsumer>
    {({ setModal }) => <Dashboard setModal={setModal} {...props} />}
  </ModalConsumer>
)

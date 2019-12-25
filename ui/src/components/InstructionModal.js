import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Image } from 'rebass'
import MetamaskSrc from 'images/metamask-tag.png'
import FortmaticSrc from 'images/fortmatic-tag.png'
import { FormattedMessage } from 'react-intl'

const Container = styled(Flex).attrs({
  flexDirection: 'column',
  justifyContent: 'flex-start',
})`
  max-width: 720px;
  max-height: 630px;
  border-radius: 8px;
  box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 0 #979797;
  background-color: rgba(41, 40, 42, 0.83);
  font-size: 21px;
  color: #dad8d8;
`
const StyledLink = styled(Text)`
  color: #02b47f;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }
`
const HighLightAbleBox = styled(Flex)`
  box-sizing: content-box
    ${props =>
      props.isHighLight &&
      `
  box-shadow: 1px 1px 4px 0 #289d79;
  border: solid 2px #0ab495;
  padding: 16px;
  margin: 0 -16px 20px -16px;
   `};
`

export default class InstructionModal extends React.Component {
  render() {
    const currentStep = this.props.currentStep || 0
    const { hideModal } = this.props
    const isHighLight = num => num === currentStep
    return (
      <Container>
        <Flex flexDirection="column" p={['20px 30px', '40px 55px']}>
          <Text mb="23px" fontSize={['20px', '24px']} lineHeight={['1.2', '1']}>
            <FormattedMessage id="Instructions"></FormattedMessage>
          </Text>
          <Flex
            flexDirection="column"
            style={{ color: '#dad8d8' }}
            fontSize={['16px', '20px']}
          >
            <HighLightAbleBox
              isHighLight={isHighLight(1)}
              flexDirection="column"
              mb="20px"
            >
              <Flex mb="17px" alignItems="center">
                <Text fontSize={['20px', '35px']}>></Text>
                <Text fontSize={['13px', '21px']} ml={['10px', '30px']}>
                  <FormattedMessage id="Login using Web3 wallet"></FormattedMessage>
                </Text>
              </Flex>
              <Flex
                ml={['0px', '45px']}
                alignItems="center"
                flexDirection={['column', 'row']}
              >
                <Image
                  mr={['0px', '45px']}
                  mb={['20px', '0px']}
                  style={{ height: '2em', cursor: 'pointer' }}
                  onClick={() => window.open('https://metamask.io')}
                  src={MetamaskSrc}
                ></Image>
                <Image
                  style={{ height: '1.4em', cursor: 'pointer' }}
                  onClick={() => window.open('https://fortmatic.com/')}
                  src={FortmaticSrc}
                ></Image>
              </Flex>
            </HighLightAbleBox>

            <HighLightAbleBox
              mb="34px"
              isHighLight={isHighLight(2)}
              alignItems="center"
            >
              <Text fontSize={['20px', '35px']}>></Text>
              <Text
                fontSize={['13px', '21px']}
                ml={['10px', '30px']}
                lineHeight={['1.3', '1']}
              >
                <FormattedMessage id="Connect to Mainnet network"></FormattedMessage>
              </Text>
            </HighLightAbleBox>

            <HighLightAbleBox
              mb="36px"
              isHighLight={isHighLight(3)}
              alignItems="center"
            >
              <Text fontSize={['20px', '35px']}>></Text>
              <Flex
                fontSize={['13px', '21px']}
                flexDirection={['column', 'row']}
                lineHeight={['1.3', '1']}
              >
                <Text ml={['10px', '30px']}>
                  <FormattedMessage id="Deposit ETH to this address."></FormattedMessage>
                </Text>
              </Flex>
            </HighLightAbleBox>

            {/* <HighLightAbleBox
              mb="36px"
              isHighLight={isHighLight(3)}
              alignItems="center"
            >
              <Text fontSize={['20px', '35px']}>></Text>
              <Flex
                fontSize={['13px', '21px']}
                flexDirection={['column', 'row']}
                lineHeight={['1.3', '1']}
              >
                <Text ml={['10px', '30px']}>
                  Load up some ETH to your wallet
                </Text>
              </Flex>
            </HighLightAbleBox> */}

            <HighLightAbleBox
              mb="26px"
              flexDirection="column"
              isHighLight={isHighLight(4)}
            >
              <Flex mb="15px" alignItems="center" lineHeight={['1.3', '1']}>
                <Text fontSize={['20px', '35px']}>></Text>
                <Text fontSize={['13px', '21px']} ml={['10px', '30px']}>
                  <FormattedMessage id="Predict BTC-USD price in next 20 minute"></FormattedMessage>
                </Text>
              </Flex>
              <Flex
                flexDirection={['row']}
                alignItems="center"
                ml={['22px', '52px']}
                fontSize={['13px', '16px']}
              >
                <Text>
                  <FormattedMessage id="Click"></FormattedMessage>
                </Text>
                <Flex
                  p="5px"
                  bg="#0ab495"
                  mx=".7em"
                  style={{ borderRadius: '4px' }}
                >
                  <Text fontWeight="bold">
                    <FormattedMessage id="CALL"></FormattedMessage>
                  </Text>
                </Flex>
                <Text>
                  <FormattedMessage id="or"></FormattedMessage>
                </Text>
                <Flex
                  p="5px"
                  bg="#d32571"
                  mx=".7em"
                  style={{ borderRadius: '4px' }}
                >
                  <Text fontWeight="bold">
                    <FormattedMessage id="PUT"></FormattedMessage>
                  </Text>
                </Flex>
                <Text>
                  <FormattedMessage id="to trade"></FormattedMessage>
                </Text>
              </Flex>
            </HighLightAbleBox>

            {/* BNB campaign */}
            {/* <HighLightAbleBox
              mb="31px"
              flexDirection="column"
              isHighLight={isHighLight(5)}
            >
              <Flex mb="11px" alignItems="center">
                <Text fontSize={['20px', '35px']}>></Text>
                <Text
                  fontSize={['13px', '21px']}
                  ml={['10px', '30px']}
                  lineHeight={['1.3', '1']}
                >
                  Get raffle ticket every 3 consecutive wins!
                </Text>
              </Flex>

              <Flex
                flexDirection={['row']}
                fontSize={['13px', '16px']}
                ml={['22px', '52px']}
                lineHeight={['1.3', '1']}
                flexWrap="wrap"
              >
                <Text>Each ticket gives you chance to win 1 BNB.</Text>
                <StyledLink
                  ml={['0px', '10px']}
                  onClick={() =>
                    window.open('https://medium.com/bandprotocol/7750fe756ecf')
                  }
                >
                  {' '}
                  Learn more
                </StyledLink>
              </Flex>
            </HighLightAbleBox> */}
            <Flex justifyContent="center" alignItems="center">
              <Button
                width="192px"
                height="42px"
                fontSize={['16px', '20px']}
                fontFamily="inherit"
                bg="#289d79"
                style={{ cursor: 'pointer' }}
                onClick={() => hideModal()}
              >
                <FormattedMessage id="Got it"></FormattedMessage>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    )
  }
}

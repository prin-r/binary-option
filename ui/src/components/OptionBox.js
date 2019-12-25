import React, { useState, useEffect } from 'react'
import { Flex, Text, Image } from 'rebass'
import { useGlobalContextState } from 'context/Global'
import { useUserContextState } from 'context/User'
import { usePriceContextState } from 'context/Price'
import { useOpenOrderContextState } from 'context/OpenOrder'
import { buy, getOrderFee } from 'api/tx'
import AuraButton from './AuraButton'
import AmountSelector from './AmountSelector'
import ProgressBar from 'components/ProgressBar'
import Ethereum from 'images/ethereum.svg'
import styled from 'styled-components'
import Tooltip from 'components/Tooltip.js'
import { FormattedMessage } from 'react-intl'
import { useWeb3Context } from 'web3-react'

const HelpBox = styled(Flex)`
  padding: 11px 8px;
  border: solid 1px #979797;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.74);
  :hover {
    cursor: pointer;
  }
`
const TimeProgress = ({ startTime, baseTime }) => {
  const [remaining, setRemaining] = useState(parseInt(baseTime - Date.now()))

  useEffect(() => {
    if (remaining <= 0) {
      setRemaining(0)
      return
    }
    ;(async () => {
      await new Promise(r => setTimeout(r, 1000))
      setRemaining(baseTime - Date.now())
    })()
  }, [remaining])

  const duration = Math.floor((baseTime - startTime) / 1000)
  const secs = Math.floor(remaining / 1000)
  const minutes = Math.floor(secs / 60)
  let secsRemain = secs - minutes * 60
  secsRemain = secsRemain < 10 ? '0' + secsRemain : secsRemain

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" justifyContent="space-between" mb="15px">
        <Text fontSize="16px" color="rgba(255, 255, 255, 0.59)" mr="15px">
          <FormattedMessage id="Waiting for order to settle"></FormattedMessage>
        </Text>
      </Flex>
      <ProgressBar
        current={duration - secs}
        total={duration}
        text={`${minutes}:${secsRemain}`}
        progressColor="#ff9100"
        shadowColor="#3d2300"
        tabColor="rgba(255, 145, 0, 0.52)"
      ></ProgressBar>
    </Flex>
  )
}

export default ({ setModal }) => {
  const [{ balance }, dispatchUser] = useUserContextState()

  const {
    active,
    account: address,
    networkId: network,
    library,
  } = useWeb3Context()

  const [{ latest }, dispatchPrice] = usePriceContextState()
  const { payoutRate } = useGlobalContextState()
  const { data } = latest
  const [fee, setFee] = useState('')
  const { hasOpen, resolveTime, startTime } = useOpenOrderContextState()
  useEffect(() => {
    if (active) {
      ;(async () => {
        setFee(await getOrderFee(library))
      })()
    }
  }, [active])

  const [amount, setAmount] = useState('100000000000000000')
  const total = Number(amount) + Number(fee)
  const time = 1200

  const wrapBuy = async isCall => {
    if (!address) {
      setModal('instruction', { currentStep: 1 })
      return
    }
    if (network !== 1) {
      setModal('instruction', { currentStep: 2 })
      return
    }
    if (balance <= total) {
      setModal('instruction', { currentStep: 3 })
      return
    }
    const resolveTime = Math.floor(Date.now() / 1000 + time)
    buy(library, address, resolveTime, isCall, data, total)
  }

  return (
    <Flex
      flexDirection="column"
      fontSize={['14px', '18px']}
      p="1.5em 2em 2.5em 2em"
      bg="rgba(42, 53, 64, 0.62)"
      alignSelf="center"
      style={{
        borderRadius: '4px',
        boxShadow: '3px 3px 20px 0 rgba(0, 0, 0, 0.5)',
        border: 'solid 0 #979797',
      }}
    >
      <Flex mb="20px" justifyContent="space-between" alignItems="center">
        <Text
          fontSize={['16px', '18px']}
          fontWeight="500"
          color="#ffffff"
          mr="15px"
        >
          BTC {time / 60} Min Binary Options
        </Text>
        <HelpBox onClick={() => setModal('instruction')}>Help</HelpBox>
      </Flex>
      <Flex mb="20px" justifyContent="space-between" alignItems="center">
        <Text color="#cacaca">Order Size</Text>

        <Flex
          alignItems="center"
          width="160px"
          p="7px 0px 7px 10px"
          style={{
            borderRadius: '4px',
            boxShadow: '3px 3px 9px 0 rgba(0, 0, 0, 0.5)',
          }}
          bg="#222832"
        >
          <AmountSelector setAmount={setAmount} />
          <Flex flexDirection="column">
            <Image src={Ethereum} width="30px" />
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="10px">
        <Flex alignItems="center">
          <Text mr="8px" color="#bababa" fontWeight="300">
            <FormattedMessage id="Payout"></FormattedMessage>(
            {payoutRate === 0 ? 'loading..' : `x${payoutRate.toFixed(2)}`})
          </Text>
          <Tooltip textBg="#1e2c36">
            <Text color="white">
              <FormattedMessage id="Payout is amount that you will get."></FormattedMessage>
            </Text>
          </Tooltip>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="300" color="white" mr="6px" opacity="0.5">
            {amount && payoutRate
              ? ((amount * payoutRate) / 1e18).toFixed(4)
              : 'loading'}
          </Text>
          <Flex flexDirection="column">
            <Image src={Ethereum} width="30px" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        mb="20px"
        style={{ borderBottom: 'solid 2px #bababa', opacity: '.2' }}
      ></Flex>
      <Flex justifyContent="space-between" alignItems="center" mb="10px">
        <Flex alignItems="center">
          <Text mr="8px" color="#bababa" fontWeight="300">
            <FormattedMessage id="Fee"></FormattedMessage>
          </Text>
          <Tooltip textBg="#1e2c36">
            <Text color="white">
              <FormattedMessage id="fee.desc"></FormattedMessage>
            </Text>
          </Tooltip>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="300" color="white" mr="6px" opacity="0.5">
            {fee ? (fee / 1e18).toFixed(4) : 'loading'}
          </Text>
          <Flex flexDirection="column">
            <Image src={Ethereum} width="30px" />
          </Flex>
        </Flex>
      </Flex>
      <Flex mb={['20px', '40px']} justifyContent="space-between">
        <Text fontWeight="500" color="#b3b3b3">
          <FormattedMessage id="Total"></FormattedMessage>
        </Text>
        <Flex alignItems="center">
          <Text fontWeight="500" mr="6px" color="#ffffff">
            {amount && fee
              ? (amount / 1e18 + fee / 1e18).toFixed(4)
              : 'loading'}
          </Text>
          <Flex flexDirection="column">
            <Image src={Ethereum} width="30px" />
          </Flex>
        </Flex>
      </Flex>
      {hasOpen ? (
        <TimeProgress
          startTime={startTime * 1000}
          baseTime={resolveTime * 1000}
        ></TimeProgress>
      ) : (
        <Flex flexDirection="column">
          <Text mb="15px" color="white" fontSize={['12px', '14px']}>
            <FormattedMessage id="warning"></FormattedMessage>
          </Text>
          <Flex justifyContent="space-around">
            <AuraButton
              isCall={true}
              isMain={true}
              onClick={() => wrapBuy(true)}
              style={{ width: '130px', height: '50px' }}
            >
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                fontSize={['14px', '18px']}
              >
                <FormattedMessage id="CALL"></FormattedMessage>

                <Flex
                  fontSize="30px"
                  style={{
                    fontWeight: 900,
                    transform: `scaleY(-1) rotate(-45deg)`,
                  }}
                >
                  ↯
                </Flex>
              </Flex>
            </AuraButton>
            <AuraButton
              isCall={false}
              isMain={true}
              onClick={() => wrapBuy(false)}
              style={{ width: '130px', height: '50px' }}
            >
              <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                fontSize={['14px', '18px']}
              >
                <FormattedMessage id="PUT"></FormattedMessage>

                <Flex
                  fontSize="30px"
                  style={{
                    fontWeight: 900,
                    transform: `scaleY(1) rotate(-45deg)`,
                  }}
                >
                  ↯
                </Flex>
              </Flex>
            </AuraButton>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

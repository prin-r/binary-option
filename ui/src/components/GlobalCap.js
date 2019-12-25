import React from 'react'
import { Flex, Text } from 'rebass'
import { isMobile } from 'ui/media'
import ProgressBar from 'components/ProgressBar'
import Tooltip from 'components/Tooltip'
import { useGlobalContextState } from 'context/Global'
import { FormattedMessage } from 'react-intl'

const _isMobile = isMobile()

const TooltipCap = ({ left }) => (
  <Tooltip textBg="#1e2c36" left={left}>
    <Text color="white">
      <FormattedMessage id="tooltip.globalPotential"></FormattedMessage>
    </Text>
  </Tooltip>
)

export default () => {
  const { maxUsageAmount, reservedAmount } = useGlobalContextState()
  // console.log(maxUsageAmount, reservedAmount)
  return (
    <Flex
      flexDirection={['column', 'row']}
      justifyContent={['center']}
      width="100%"
      mt="20px"
      alignItems="center"
    >
      <Flex
        width={['100%', 'auto']}
        justifyContent="space-between"
        alignItems="center"
      >
        {_isMobile ? (
          <>
            <Flex alignItems="center" minWidth={['unset', '175px']}>
              <Text
                mr="8px"
                fontSize="12px"
                color="#bababa"
                fontWeight="300"
                style={{ whiteSpace: 'nowrap' }}
              >
                <FormattedMessage id="Global potential payout"></FormattedMessage>
              </Text>
              <TooltipCap left={100} />
            </Flex>
            <Flex>
              <Text
                ml="10px"
                fontSize="12px"
                color="white"
                minWidth={['unset', '250px']}
              >
                {reservedAmount.toFixed(2)}/{maxUsageAmount.toFixed(2)} ETH
              </Text>
            </Flex>
          </>
        ) : (
          <Flex alignItems="center" style={{ minWidth: '150px' }}>
            <Text
              fontSize="16px"
              mr="8px"
              color="#bababa"
              fontWeight="300"
              style={{ whiteSpace: 'nowrap' }}
            >
              <FormattedMessage id="Global potential payout"></FormattedMessage>
            </Text>
            <Flex
              justifyContent="flex-start"
              alignItems="center"
              style={{ minWidth: '30px' }}
            >
              <TooltipCap />
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex
        my={['10px']}
        flexDirection={['column', 'row']}
        width="100%"
        alignItems="center"
        style={{ position: 'relative' }}
      >
        <ProgressBar
          current={reservedAmount}
          total={maxUsageAmount}
          tabColor="#322d2d"
          progressColor="#ffbd2b"
          shadowColor="#00261f"
        />
        {_isMobile ? (
          ''
        ) : (
          <Text
            ml="10px"
            fontSize={['12px', '16px']}
            color="white"
            style={{ whiteSpace: 'nowrap' }}
          >
            {reservedAmount.toFixed(2)}/{maxUsageAmount.toFixed(2)} ETH
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

import React from 'react'
import { Flex, Text } from 'rebass'
import ProgressBar from 'components/ProgressBar'

export default ({ onClick, currentCounter, maxCounter, totalticket }) => (
  <Flex
    flexDirection="column"
    mt="25px"
    p="20px 26px 22px"
    bg="rgba(42, 53, 64, 0.62)"
    alignSelf="center"
    width="100%"
    onClick={() => onClick()}
    style={{
      borderRadius: '4px',
      boxShadow: '3px 3px 20px 0 rgba(0, 0, 0, 0.5)',
      border: 'solid 0 #979797',
      cursor: 'pointer',
    }}
  >
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Text
        fontSize={['16px', '18px']}
        fontWeight="500"
        color="#ffffff"
        mr="15px"
      >
        BNB Ticket Count: {totalticket}
      </Text>
    </Flex>
    <ProgressBar
      current={currentCounter}
      total={maxCounter}
      text={currentCounter + '/' + maxCounter}
      progressColor="#00ffd0"
      shadowColor="#00261f"
      tabColor="rgba(10, 180, 149, 0.45)"
    ></ProgressBar>
  </Flex>
)

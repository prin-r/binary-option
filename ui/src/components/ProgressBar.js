import React from 'react'
import { Flex, Text } from 'rebass'
import { isMobile } from 'ui/media'

export default ({
  current,
  total,
  text,
  tabColor,
  progressColor,
  shadowColor,
}) => (
  <Flex
    width="100%"
    bg={tabColor}
    style={{
      height: isMobile() ? '15px' : '18px',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: `inset 2px 2px 9px ${shadowColor}`,
    }}
  >
    <Flex
      bg={progressColor}
      width={`${(current / total) * 100}%`}
      style={{
        transition: 'all 500ms',
        borderRadius: '8px',
        position: 'absolute',
        zIndex: 1,
        left: 0,
        top: 0,
        height: '100%',
        boxShadow: `inset 1px 1px 15px ${shadowColor}, 1px 1px 9px ${shadowColor}`,
      }}
    />
    <Text
      fontSize="14px"
      color="white"
      style={{ position: 'absolute', right: 10, top: 5, zIndex: 3 }}
    >
      {text}
    </Text>
  </Flex>
)

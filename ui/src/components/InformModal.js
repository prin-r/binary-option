import React from 'react'
import { Flex, Text, Button } from 'rebass'
import { ModalConsumer } from 'context/Modal'
import { isMobile } from 'ui/media'
import { FormattedMessage } from 'react-intl'

const _isMobile = isMobile()

const InformModal = ({ hideModal }) => {
  return (
    <Flex
      p="8%"
      mx="auto"
      flexDirection="column"
      bg="rgba(41, 40, 42, 0.83)"
      alignItems="center"
      style={{
        fontSize: window.innerWidth < 640 ? '14px' : '16px',
        width: '520px',
        height: _isMobile ? '290px' : '320px',
        borderRadius: '8px',
        boxShadow: '3px 3px 4px 0 rgba(0, 0, 0, 0.5)',
        maxWidth: '90%',
      }}
    >
      <Text
        mb="30px"
        color="#dad8d8"
        letterSpacing={0.8}
        style={{ lineHeight: 1.7 }}
      >
        To experiment with different time length of binary options, we have
        updated the timespan of binary options to 20 minutes. Other rules stay
        the same. Have fun and enjoy playing! 💸
      </Text>
      <Flex justifyContent="center" alignItems="center">
        <Button
          width="192px"
          height="42px"
          fontSize={['16px', '20px']}
          fontFamily="inherit"
          bg="#289d79"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            hideModal()
            localStorage.setItem('show-inform', true)
          }}
        >
          <FormattedMessage id="Got it"></FormattedMessage>
        </Button>
      </Flex>
    </Flex>
  )
}

export default props => (
  <ModalConsumer>
    {({ setModal }) => <InformModal setModal={setModal} {...props} />}
  </ModalConsumer>
)

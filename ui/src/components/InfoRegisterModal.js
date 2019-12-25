import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'rebass'
import { useUserContextState } from '../context/User'
import { ModalConsumer } from 'context/Modal'
import { registerInfo } from '../api/tx'
import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import A from './A'

const Input = styled.input`
  width: 100%;
  outline: none;
  height: 35px;
  border: 0px;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
`

const LoginModal = ({ hideModal }) => {
  const [{ address }, _] = useUserContextState()
  const [info, setInfo] = useState('')
  const [txProcessing, setTxProcessing] = useState(false)
  const [txHash, setTxHash] = useState(null)

  return (
    <Flex
      p="10%"
      mx="auto"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
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
      <Text color="white" fontSize="21px" mb="30px">
        Add your telegram username
      </Text>
      <Input onChange={({ target }) => setInfo(target.value)} value={info} />
      {!txProcessing && !txHash && (
        <Flex
          mt="40px"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Flex
            p="16px"
            bg="#db6b00"
            fontSize="14px"
            color="white"
            justifyContent="center"
            onClick={async () => {
              if (!address) {
                alert('Please login with your wallet')
                return
              }
              if (!info) {
                alert("Info can't be empty")
                return
              }
              setTxProcessing(true)
              const txh = await registerInfo(address, info)
              setTxProcessing(false)
              setTxHash(txh)
            }}
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
            Confirm
          </Flex>
          <Flex flex={1} />
          <Flex
            p="16px"
            bg="hsl(0,0%,30%)"
            fontSize="14px"
            color="white"
            justifyContent="center"
            onClick={() => hideModal()}
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
                backgroundColor: 'hsl(0,0%,50%)',
              },
            }}
          >
            Cancel
          </Flex>
        </Flex>
      )}
      {txProcessing && <Loading />}
      {!txProcessing && txHash && (
        <A
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          style={{ marginTop: '30px' }}
        >
          <Text color="white" fontSize="14px">
            view your tx on etherscan
          </Text>
          <Text ml="10px" fontSize="14px" sdf color="white">
            <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
          </Text>
        </A>
      )}
    </Flex>
  )
}

export default props => (
  <ModalConsumer>
    {({ setModal }) => <LoginModal setModal={setModal} {...props} />}
  </ModalConsumer>
)

import React from 'react'
import { Flex, Image, Text, Box } from 'rebass'
import Loading from 'components/Loading'
import Ethereum from 'images/ethereum.svg'
import { useTxContextState } from 'context/Tx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import AutoDate from './AutoDate'
import AuraButton from './AuraButton'
import Pagination from './Pagination'
import A from './A'
import { isMobile } from 'ui/media'
import { FormattedMessage } from 'react-intl'

const _isMobile = isMobile()

const Tx = ({ tx }) => {
  const {
    owner,
    resolveTime,
    isCall,
    strikePrice,
    settlementPrice,
    status,
    placed,
    reward,
    result,
    buyTxHash,
    resolveTxHash,
    buyTimestamp,
  } = tx

  const buyDate = new Date(buyTimestamp * 1000).toISOString()
  return (
    <Flex
      pl={['40px', '40px']}
      pr={['0px', '40px']}
      my="10px"
      alignItems="center"
      flexDirection="row"
      // flexWrap="wrap"
      color="white"
      fontSize={['14px', '16px']}
      width={_isMobile ? '1100px' : '100%'}
      style={{
        fontWeight: 300,
        color: '#d1d1d1',
        minHeight: '40px',
        maxHeight: '40px',
      }}
    >
      {/* Timestamp */}
      <Flex
        flex={['0 0 175px', '0 0 175px']}
        style={{
          lineHeight: '25px',
        }}
      >
        {buyDate.slice(0, 10) + ' ' + buyDate.slice(11, 16)}
      </Flex>

      {/* Address */}
      <Flex flex="1 1 200px" style={{ minWidth: '120px' }}>
        <A
          target="_blank"
          rel="noopener noreferrer"
          color="white"
          href={`https://etherscan.io/address/${owner.id}`}
          style={{ width: '100%' }}
        >
          <Text
            width="90%"
            color="#d1d1d1"
            css={{ '&:hover': { color: 'white' } }}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {owner.id}
          </Text>
        </A>
      </Flex>

      {/* Type */}
      <Flex flex={['0 0 80px', 1]}>
        <Flex alignItems="center">
          <A
            target="_blank"
            rel="noopener noreferrer"
            href={`https://etherscan.io/tx/${buyTxHash}`}
          >
            <AuraButton isCall={isCall} style={{ width: '75px' }}>
              <Flex
                style={{
                  fontWeight: 700,
                  textDecoration: 'none',
                  lineHeight: '25px',
                }}
              >
                {isCall ? 'CALL' : 'PUT'}
              </Flex>
              {/* <Flex
                style={{
                  fontSize: '30px',
                  fontWeight: 900,
                  transform: `scaleY(${isCall ? '-1' : '1'}) rotate(-45deg)`,
                }}
              >
                ↯
              </Flex> */}
              <Text ml="10px" style={{ color: 'white' }}>
                <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
              </Text>
            </AuraButton>
          </A>
        </Flex>
      </Flex>

      {/* Size */}
      <Flex flex={['0 0 80px', 1]} alignItems="center">
        {(placed / 1e18).toFixed(3)} <Image src={Ethereum} width="1.5em" />
      </Flex>

      {/* Strike Price */}
      <Flex flex={['0 0 100px', 1]}>{(strikePrice / 1e18).toFixed(4)}</Flex>

      {/* Settlement */}
      <Flex flex={['0 0 100px', 1]} justifyContent="flex-end">
        {Math.floor(settlementPrice / 1e18) > 0
          ? (settlementPrice / 1e18).toFixed(4)
          : status === 'RESOLVED'
          ? '-'
          : ''}
      </Flex>

      {/* Status */}
      <Flex flex={2} justifyContent="flex-end">
        <Flex
          bg="rgba(149, 146, 146, 0.36)"
          style={{
            borderRadius: '4px',
            minHeight: '35px',
            maxHeight: '35px',
            minWidth: '190px',
            textShadow: '1px 1px 3px black',
          }}
        >
          {status !== 'RESOLVED' && (
            <Flex
              justifyContent="center"
              alignItems="center"
              width="100%"
              px="10px"
              style={{ color: '#ff9100' }}
            >
              <AutoDate baseTime={resolveTime * 1000} />
            </Flex>
          )}
          {status === 'RESOLVED' && (
            <A
              target="_blank"
              rel="noopener noreferrer"
              href={`https://etherscan.io/tx/${resolveTxHash}`}
              style={{ width: '100%', lineHeight: '35px' }}
            >
              <Flex
                justifyContent="space-between"
                width="100%"
                px="10px"
                style={{
                  fontWeight: 700,
                  color:
                    result === 1
                      ? '#00ffd0'
                      : result === 2
                      ? '#ff3d92'
                      : 'white',
                }}
              >
                <Flex
                  justifyContent="space-between"
                  flex={1}
                  style={{ minWidth: '130px' }}
                >
                  {result === 1 ? 'Profit' : result === 2 ? 'Loss' : 'Cancel'}
                  {result < 3 && (
                    <Flex>
                      {result === 1
                        ? '+' + (reward / 1e18).toFixed(3)
                        : '-' + (placed / 1e18).toFixed(3)}
                      <Image src={Ethereum} width="1.5em" />
                    </Flex>
                  )}
                </Flex>
                <Flex alignItems="center" style={{ color: 'white' }} ml="8px">
                  <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
                </Flex>
              </Flex>
            </A>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

const TxGroup = ({ txs, loading, isGlob }) => {
  return (
    <Flex
      flexDirection="column"
      mt="30px"
      bg="rgba(50, 45, 45,0.68)"
      flex={1}
      style={{
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        minHeight: '740px',
        maxHeight: '740px',
        minWidth: 0,
        borderRadius: '4px',
        boxShadow: '3px 3px 15px 0 rgba(0, 0, 0, 0.5)',
        overflowX: _isMobile ? 'auto' : 'unset',
      }}
    >
      {/* THead */}
      <Flex
        flexDirection="row"
        color="white"
        alignItems="center"
        width={_isMobile ? '1100px' : 'unset'}
        style={{
          minHeight: '60px',
          maxHeight: '60px',
          fontWeight: 700,
          borderBottom: '1px solid rgba(255,255,255,0.3)',
        }}
        px="20px"
        mx="20px"
        mb="15px"
        fontSize={['14px', '16px']}
      >
        <Flex flex={['0 0 175px', '0 0 175px']}>
          <FormattedMessage id="Timestamp"></FormattedMessage>
        </Flex>
        <Flex flex="1 1 200px" style={{ minWidth: '150px' }}>
          <FormattedMessage id="Address"></FormattedMessage>
        </Flex>
        <Flex flex={['0 0 80px', 1]}>
          <FormattedMessage id="Type"></FormattedMessage>
        </Flex>
        <Flex flex={['0 0 80px', 1]}>
          <FormattedMessage id="Size"></FormattedMessage>
        </Flex>
        <Flex flex={['0 0 100px', 1]}>
          <FormattedMessage id="Strike Px"></FormattedMessage>
        </Flex>
        <Flex flex={['0 0 100px', 1]} justifyContent="flex-end">
          <Text textAlign="center" style={{ whiteSpace: 'nowrap' }}>
            <FormattedMessage id="Settlement Px"></FormattedMessage>
          </Text>
        </Flex>
        <Flex flex={2} justifyContent="flex-end">
          <FormattedMessage id="Status"></FormattedMessage>
        </Flex>
      </Flex>

      {/* TBody */}
      {loading ? (
        <Flex
          width="100%"
          justifyContent="center"
          alignItems="center"
          style={{ height: '500px' }}
        >
          <Loading />
        </Flex>
      ) : txs.length === 0 ? (
        <Flex justifyContent="center" mt={['50px', '120px']}>
          <Text color="white" fontSize="20px">
            <FormattedMessage id="No Data"></FormattedMessage>
          </Text>
        </Flex>
      ) : (
        txs.map((e, i) => <Tx tx={e} key={i} />)
      )}

      {/* Pagination */}
      {!_isMobile && (
        <Flex style={{ position: 'absolute', width: '100%', bottom: '0px' }}>
          <Pagination isGlob={isGlob} />
        </Flex>
      )}
    </Flex>
  )
}

export const UserTxHistory = () => {
  const { userOrders, loadingUserData } = useTxContextState()
  return (
    <TxGroup txs={userOrders || []} isGlob={false} loading={loadingUserData} />
  )
}

export const GlobalTxHistory = () => {
  const { orders, loadingGlobData } = useTxContextState()
  return <TxGroup txs={orders || []} isGlob={true} loading={loadingGlobData} />
}

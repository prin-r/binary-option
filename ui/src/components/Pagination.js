import React, { useState } from 'react'
import { Flex } from 'rebass'
import { useTxContextState } from 'context/Tx'

const setting = [
  { size: 0.1, tx: 0.1, dir: null, showTxt: false },
  { size: 0.38, tx: 0.2, dir: null, showTxt: false },
  { size: 0.61, tx: 0.3, dir: false, showTxt: true },
  { size: 1, tx: 0.5, dir: null, showTxt: true },
  { size: 0.61, tx: 0.7, dir: true, showTxt: true },
  { size: 0.38, tx: 0.8, dir: null, showTxt: false },
  { size: 0.1, tx: 0.9, dir: null, showTxt: false },
]

const Oval = ({ pageNum, idx, func = () => false }) => {
  const { size, tx, dir, showTxt } = setting[idx]
  const isLR = dir !== null
  return (
    <Flex
      onClick={() => isLR && func(dir)}
      bg="rgba(255,255,255,0.3)"
      justifyContent="center"
      style={{
        position: 'absolute',
        transition: 'all 200ms',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        lineHeight: '40px',
        fontWeight: 700,
        opacity: size,
        transform: `translate(${400 * tx - 20}px, 0px) scale(${size})`,
        boxShadow: '3px 3px 9px #13171f',
        borderRadius: '50%',
      }}
    >
      {showTxt && Number(pageNum) + (dir === false ? -1 : Number(dir))}
    </Flex>
  )
}

export default ({ isGlob }) => {
  const {
    setUserOffset,
    setGlobOffset,
    userOffset,
    globOffset,
  } = useTxContextState()

  const pageSize = 10
  const currentPage = isGlob
    ? Math.floor(globOffset / pageSize) + 1
    : Math.floor(userOffset / pageSize) + 1

  const [ids, setIds] = useState([0, 1, 2, 3, 4, 5, 6])
  const setWithClamp = isIncrease => {
    let offset = 0
    if (isGlob) {
      offset = isIncrease ? globOffset + pageSize : globOffset - pageSize
      if (offset < 0) return
      setGlobOffset(offset)
    } else {
      offset = isIncrease ? userOffset + pageSize : userOffset - pageSize
      if (offset < 0) return
      setUserOffset(offset)
    }
    rotatePosition(!isIncrease)
  }

  const rotatePosition = reverse => {
    const arr = [...ids]
    if (reverse) arr.push(arr.shift())
    else arr.unshift(arr.pop())
    setIds(arr)
  }

  return (
    <Flex
      mx="20px"
      alignItems="center"
      justifyContent="center"
      flex={1}
      style={{
        minHeight: '60px',
        maxHeight: '60px',
        color: 'white',
        borderTop: '1px solid rgba(255,255,255,0.3)',
      }}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        style={{ minWidth: '400px', maxWidth: '400px', position: 'relative' }}
      >
        <Oval pageNum={currentPage} idx={ids[0]} func={setWithClamp} />
        <Oval pageNum={currentPage} idx={ids[1]} func={setWithClamp} />
        <Oval pageNum={currentPage} idx={ids[2]} func={setWithClamp} />
        <Oval pageNum={currentPage} idx={ids[3]} func={setWithClamp} />
        <Oval pageNum={currentPage} idx={ids[4]} func={setWithClamp} />
        <Oval pageNum={currentPage} idx={ids[5]} func={setWithClamp} />
        <Oval pageNum={currentPage} idx={ids[6]} func={setWithClamp} />
      </Flex>
    </Flex>
  )
}

import React from 'react'
import { Flex } from 'rebass'
import Select from './Select'

const optionStyle = {
  backgroundColor: '#222832',
  fontSize: 'inherit',
  border: 'none',
  fontFamily: 'Source Code Pro, monospace',
}

export default ({ setAmount }) => {
  return (
    <Flex alignItems="center" flex={1}>
      <Flex flex={1} alignItems="center">
        <Select
          defaultValue={1}
          onChange={({ target }) =>
            setAmount(Number(target.value * 1e17).toString())
          }
        >
          <option style={optionStyle} value={1}>
            0.1
          </option>
          <option style={optionStyle} value={2}>
            0.2
          </option>
          <option style={optionStyle} value={3}>
            0.3
          </option>
          <option style={optionStyle} value={4}>
            0.4
          </option>
          <option style={optionStyle} value={5}>
            0.5
          </option>
        </Select>
      </Flex>
    </Flex>
  )
}

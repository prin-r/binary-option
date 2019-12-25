import styled from 'styled-components'
import { Flex } from 'rebass'

export default styled(Flex)`
  background-color: ${p => (p.isCall ? '#0ab495' : '#d32571')};
  align-items: center;
  justify-content: center;
  font-size: 14px;
  min-width: 70px;
  border-radius: 4px;
  color: white;
  transition: all 300ms;
  text-shadow: 1px 1px 3px black;
  cursor: pointer;

  ${p =>
    p.isMain
      ? `box-shadow: 1px 1px 3px 0 black, 1px 1px 10px 0 ${
          p.isCall ? '#00d4ad' : '#ff006f'
        };`
      : 'box-shadow: 2px 3px 10px 0 rgba(0, 0, 0, 0.37)'};
  &:hover {
    background-color: ${p => (p.isCall ? '#00d4ad' : '#ff006f')};
    ${p =>
      p.isMain
        ? `box-shadow: 2px 2px 3px 0 black, 1px 1px 20px 0 ${
            p.isCall ? '#00d4ad' : '#ff006f'
          };`
        : `box-shadow: 1px 1px 3px 0 black, 1px 1px 10px 0 ${
            p.isCall ? '#00d4ad' : '#ff006f'
          };`};
  }
`

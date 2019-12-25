import styled from 'styled-components'
import { Flex } from 'rebass'

export default styled(Flex)`
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: all 200ms;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.35) 100%
  );
  &:hover {
    color: #403000;
    background-color: #ffc200;
    box-shadow: 1px 1px 3px 0 black, 1px 1px 15px 0 #d1a415;
  }
`

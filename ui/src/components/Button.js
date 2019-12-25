import styled from 'styled-components'

export default styled.button`
  color: hsl(0, 0%, 0%);
  border-radius: 4px;
  font-size: 16px;
  background: hsl(0, 0%, 80%);
  height: 30px;
  transition: all 200ms;
  outline: none;
  border: none;
  &:hover {
    border: none;
    color: hsl(0, 0%, 30%);
    background: hsl(0, 0%, 95%);
    box-shadow: 2px 2px 6px -2px rgba(0, 50, 100, 0.8);
  }

  &:active {
    border: none;
    color: hsl(0, 0%, 30%);
    background: hsl(0, 0%, 80%);
    box-shadow: 1px 1px 4px -1px rgba(0, 50, 100, 1);
  }
`

import React from 'react'
import styled, { keyframes } from 'styled-components'

const Animation = keyframes`
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
`

const Dot = styled.div`
  position: absolute;
  width: ${p => p.size || '11px'};
  height: ${p => p.size || '11px'};
  border-radius: 50%;
  background: ${p => p.color};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`

const StyledLoading = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  & .child1 {
    left: 6px;
    animation-delay: -0.24s;
  }

  & .child2 {
    left: 26px;
    animation-delay: -0.12s;
  }

  & .child3 {
    left: 45px;
    animation-delay: 0;
  }
`

const Rect = styled.div`
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: ${p => p.color || '#fff'};
  animation: ${Animation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
`

export default ({ color, size, m }) => (
  <StyledLoading>
    <Rect className="child1" color={color} />
    <Rect className="child2" color={color} />
    <Rect className="child3" color={color} />
  </StyledLoading>
)

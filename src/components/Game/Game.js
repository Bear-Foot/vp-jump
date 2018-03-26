import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { levelSelector, positionSelector } from '../../redux/selectors'

export const GameComponent = ({ position, level }) => {
  const pos = { bottom: position.y, left: position.x }
  return (
    <WrappingBox style={level.wrappingBox}>
      <Avatar dim={level.avatarSize} style={pos} />
    </WrappingBox>
  )
}

export const Game = connect(state => ({
  position: positionSelector(state),
  level: levelSelector(state),
}))(GameComponent)

const WrappingBox = styled.div`
  background: aquamarine;
  position: relative;
`

const Avatar = styled.div`
  position: absolute;
  background: yellow;
  width: ${p => p.dim.width}px;
  height: ${p => p.dim.height}px;
`


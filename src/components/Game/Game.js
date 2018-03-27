import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { levelSelector, positionSelector } from '../../redux/selectors'

export const GameComponent = ({ position, level }) => {
  const pos = { bottom: position.y, left: position.x }
  return (
    <WrappingBox style={level.wrappingBox}>
      <Avatar dim={level.avatarSize} style={pos} />
      {level.blocks.map(block => <Block block={block} />)}
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

const Block = styled.div`
  position: absolute;
  background: palevioletred;
  bottom: ${p => p.block.y}px;
  left: ${p => p.block.x}px;
  width: ${p => p.block.width}px;
  height: ${p => p.block.height}px;
`


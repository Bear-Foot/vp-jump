import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Game } from '../Game'

import {
  gameKeyDownLeft,
  gameKeyUpLeft,
  gameKeyDownRight,
  gameKeyUpRight,
  gameKeyDownSpace,
} from '../../redux/game/actions'

const keyMaps = {
  65: 'Left',
  68: 'Right',
  32: 'Space',
}

class GameInputComponent extends Component {
  handleKeyDown = (e) => {
    const key = e.keyCode
    const word = keyMaps[key]
    const movement = this.props[`gameKeyDown${word}`]
    if (!this[word] && movement) {
      if (word !== 'Space') {
        this[word] = true
      }
      movement()
    }
  }
  handleKeyUp = (e) => {
    const key = e.keyCode
    const word = keyMaps[key]
    const movement = this.props[`gameKeyUp${word}`]
    if (this[word] && movement) {
      this[word] = false
      movement()
    }
  }
  render() {
    return (
      <div tabIndex="0" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}>
        <Game />
      </div>
    )
  }
}

export const GameInput = connect(null, {
  gameKeyDownLeft,
  gameKeyUpLeft,
  gameKeyDownRight,
  gameKeyUpRight,
  gameKeyDownSpace,
})(GameInputComponent)

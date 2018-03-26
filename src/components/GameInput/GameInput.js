import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Game } from '../Game'

class GameInputComponent extends Component {
  handleKeyDown = (e) => {
    console.log(e)
  }
  handleKeyUp = (e) => {

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

})(GameInputComponent)

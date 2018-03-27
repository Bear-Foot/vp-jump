import { createReducer } from '../../utils/createReducer'
import { detectCollision } from '../../utils/detectCollision'

import {
  GAME_INIT,
  GAME_TICK,
  GAME_KEY_DOWN_LEFT,
  GAME_KEY_UP_LEFT,
  GAME_KEY_DOWN_RIGHT,
  GAME_KEY_UP_RIGHT,
  GAME_KEY_DOWN_SPACE,
} from './actions'

const actionHandlers = {
  [GAME_INIT]: (state, action) => ({
    ...state,
    position: action.level.startPosition,
    level: action.level,
  }),
  [GAME_KEY_DOWN_LEFT]: state => ({
    ...state, goingLeft: true,
  }),
  [GAME_KEY_UP_LEFT]: state => ({
    ...state, goingLeft: false,
  }),
  [GAME_KEY_DOWN_RIGHT]: state => ({
    ...state, goingRight: true,
  }),
  [GAME_KEY_UP_RIGHT]: state => ({
    ...state, goingRight: false,
  }),
  [GAME_KEY_DOWN_SPACE]: state => ({
    ...state,
    ySpeed: (state.ySpeed === 0 ? state.level.jumpForce : state.ySpeed),
  }),
  [GAME_TICK]: (state) => {
    const newPosition = { ...state.position }
    const now = Date.now()
    const { level } = state
    const diff = ((now - state.lastUpdate) / 1000)

    // X management
    let { xSpeed } = state
    const acceleration = level.horizontalAcceleration * diff
    if (state.goingLeft) {
      xSpeed -= acceleration
    }
    if (state.goingRight) {
      xSpeed += acceleration
    }

    if (!state.goingLeft && !state.goingRight) {
      if (xSpeed > 0) {
        xSpeed -= acceleration
        xSpeed = xSpeed < 0 ? 0 : xSpeed
      } else {
        xSpeed += acceleration
        xSpeed = xSpeed > 0 ? 0 : xSpeed
      }
    }

    xSpeed = Math.abs(xSpeed) >= level.maxxSpeed ?
      (xSpeed / Math.abs(xSpeed)) * level.maxxSpeed :
      xSpeed

    newPosition.x += (xSpeed * diff)

    // Y ySpeed
    let { ySpeed } = state
    ySpeed -= level.gravityForce * diff
    newPosition.y += (ySpeed * diff)

    // blocks collisions
    level.blocks.forEach((block) => {
      if (detectCollision(block, { ...level.avatarSize, ...newPosition })) {
        console.log('test')
      }
    })

    // borderCollisions
    if (newPosition.y < 0) {
      newPosition.y = 0
      ySpeed = 0
    }
    if (newPosition.y > level.wrappingBox.height - level.avatarSize.height) {
      newPosition.y = level.wrappingBox.height - level.avatarSize.height
      ySpeed = 0
    }
    if (newPosition.x < 0) {
      newPosition.x = 0
      xSpeed = 0
    }
    if (newPosition.x > level.wrappingBox.width - level.avatarSize.width) {
      newPosition.x = level.wrappingBox.width - level.avatarSize.width
      xSpeed = 0
    }

    return {
      ...state,
      position: newPosition,
      lastUpdate: now,
      xSpeed,
      ySpeed,
    }
  },
}

const initialState = {
  position: null,
  xSpeed: 0,
  ySpeed: 0,
  lastUpdate: Date.now(),
  goingRight: false,
  goingLeft: false,
  level: null,
}

export const game = createReducer(actionHandlers, initialState)

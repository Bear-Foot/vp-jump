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
    let { xSpeed, ySpeed } = state

    // X management
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

    const dx = xSpeed * diff
    newPosition.x += dx


    // Y ySpeed
    ySpeed += level.gravityForce * diff
    const dy = ySpeed * diff
    newPosition.y += dy

    // blocks collisions
    level.blocks.forEach((block) => {
      const collision = detectCollision(block, {
        ...level.avatarSize, ...newPosition, vx: xSpeed, vy: ySpeed,
      }, dx, dy)
      if (collision) {
        newPosition.y = collision.y
        newPosition.x = collision.x
        xSpeed = collision.vx
        ySpeed = collision.vy
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

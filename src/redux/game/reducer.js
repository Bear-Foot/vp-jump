import { createReducer } from '../../utils/createReducer'

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
    ...state, goingLeft: true, lastUpdate: Date.now(),
  }),
  [GAME_KEY_UP_LEFT]: state => ({
    ...state, goingLeft: false, lastUpdate: Date.now(),
  }),
  [GAME_KEY_DOWN_RIGHT]: state => ({
    ...state, goingRight: true, lastUpdate: Date.now(),
  }),
  [GAME_KEY_UP_RIGHT]: state => ({
    ...state, goingRight: false, lastUpdate: Date.now(),
  }),
  // [GAME_KEY_DOWN_SPACE]: state => ({ ...state, goingRight: false, lastUpdate: Date.now() }),
  [GAME_TICK]: (state) => {
    const newPosition = { ...state.position }
    const now = Date.now()
    let newSpeed = state.horizontalSpeed
    const acceleration = state.level.horizontalAcceleration * ((now - state.lastUpdate) / 1000)
    if (state.goingLeft) {
      newSpeed -= acceleration
    }
    if (state.goingRight) {
      newSpeed += acceleration
    }

    if (!state.goingLeft && !state.goingRight) {
      if (newSpeed > 0) {
        newSpeed -= acceleration
        newSpeed = newSpeed < 0 ? 0 : newSpeed
      } else {
        newSpeed += acceleration
        newSpeed = newSpeed > 0 ? 0 : newSpeed
      }
    }

    newSpeed = Math.abs(newSpeed) >= state.level.maxHorizontalSpeed ?
      (newSpeed / Math.abs(newSpeed)) * state.level.maxHorizontalSpeed :
      newSpeed

    if (newSpeed) {
      newPosition.x += (state.horizontalSpeed * ((now - state.lastUpdate) / 1000))
    }

    return {
      ...state,
      position: newPosition,
      lastUpdate: now,
      horizontalSpeed: newSpeed,
    }
  },
}

const initialState = {
  position: null,
  horizontalSpeed: 0,
  lastUpdate: Date.now(),
  goingRight: false,
  goingLeft: false,
  level: null,
}

export const game = createReducer(actionHandlers, initialState)

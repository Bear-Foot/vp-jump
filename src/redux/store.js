import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { game } from './game/reducer'
import { gamePath } from './selectors'

import { gameStart } from './game/actions'

export const store = createStore(
  combineReducers({
    [gamePath]: game,
  }),
  applyMiddleware(thunk),
)

// x, y position for blocks start at the bottom left corner
const levelFormat = {
  startPosition: { x: 0, y: 0 },
  wrappingBox: { width: 800, height: 600 },
  blocks: [{
    width: 100, height: 100, x: 200, y: 300,
  }],
  finishPoint: {
    radius: 20,
    x: 900,
    y: 900,
  },
  avatarSize: { width: 80, height: 160 },
  fps: 40,
  jumpForce: 400,
  maxHorizontalSpeed: 200, // px/s
  horizontalAcceleration: 300, // px/s
  gravityForce: 10,
  gameSpeed: 20,
}

store.dispatch(gameStart(levelFormat))

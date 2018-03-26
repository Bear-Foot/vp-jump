import { createStore, combineReducers } from 'redux'

import { game } from './game/reducer'
import { gamePath } from './selectors'

import { gameInit } from './game/actions'

export const store = createStore(combineReducers({
  [gamePath]: game,
}))


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
  jumpForce: 20,
  horizontalSpeed: 200, // px/s
  gravityForce: 1,
  gameSpeed: 20,
}

store.dispatch(gameInit(levelFormat))

import { createReducer } from '../../utils/createReducer'

import {
  GAME_INIT,
} from './actions'

const actionHandlers = {
  [GAME_INIT]: (state, action) => ({
    position: action.level.startPosition,
    level: action.level,
  }),
}

const initialState = {
  position: null,
  level: null,
}

export const game = createReducer(actionHandlers, initialState)

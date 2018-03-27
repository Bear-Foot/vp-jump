export const GAME_INIT = 'GAME_INIT'
export const gameInit = level => ({
  type: GAME_INIT,
  level,
})

export const GAME_TICK = 'GAME_TICK'
export const gameTick = () => ({
  type: GAME_TICK,
})

export const GAME_KEY_DOWN_LEFT = 'GAME_KEY_DOWN_LEFT'
export const GAME_KEY_UP_LEFT = 'GAME_KEY_UP_LEFT'
export const GAME_KEY_DOWN_RIGHT = 'GAME_KEY_DOWN_RIGHT'
export const GAME_KEY_UP_RIGHT = 'GAME_KEY_UP_RIGHT'
export const GAME_KEY_DOWN_SPACE = 'GAME_KEYDOWN_SPACE'

export const gameKeyDownLeft = () => ({ type: GAME_KEY_DOWN_LEFT })
export const gameKeyUpLeft = () => ({ type: GAME_KEY_UP_LEFT })
export const gameKeyDownRight = () => ({ type: GAME_KEY_DOWN_RIGHT })
export const gameKeyUpRight = () => ({ type: GAME_KEY_UP_RIGHT })
export const gameKeyDownSpace = () => ({ type: GAME_KEY_DOWN_SPACE })

export const gameLoop = (dispatch) => {
  dispatch(gameTick())
  setTimeout(() => dispatch(gameLoop), 25)
}

export const gameStart = level => (dispatch) => {
  dispatch(gameInit(level))
  dispatch(gameLoop)
}

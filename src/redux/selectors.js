import * as game from './game/selectors'

export const gamePath = 'game'
export const gameSelector = state => state[gamePath]

export const positionSelector = state => game.position(gameSelector(state))
export const levelSelector = state => game.level(gameSelector(state))

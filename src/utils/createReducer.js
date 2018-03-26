export const createReducer = (actionHandlers, initialState) => (state = initialState, action) => {
  const handler = actionHandlers[action.type]

  return handler ? handler(state, action) : state
}

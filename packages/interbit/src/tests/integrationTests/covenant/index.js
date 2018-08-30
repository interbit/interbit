const { reducer: rootReducer } = require('interbit-root-covenant')
const Immutable = require('seamless-immutable')

const initialState = Immutable.from({
  shared: {},
  sharedWithMe: {},
  lastAction: {}
})

const actionTypes = {
  ADD_STATE: 'ADD_STATE'
}

const actionCreators = {
  addState: newState => ({
    type: actionTypes.ADD_STATE,
    payload: { newState }
  })
}

const reducer = (state = initialState, action) => {
  let nextState = rootReducer(state, action)
  if (action.type === actionTypes.ADD_STATE) {
    const { newState } = action.payload
    nextState = state.set('shared', newState)
    return setLastAction(nextState, action)
  }
  return setLastAction(nextState, action)
}

const setLastAction = (state, action) => {
  if (action.type === '*/STROBE') {
    return state
  }
  return state.set('lastAction', action)
}

module.exports = {
  initialState,
  actionCreators,
  reducer
}

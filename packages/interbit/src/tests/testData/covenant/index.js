const Immutable = require('seamless-immutable')

const initialState = Immutable.from({ number: 0 })
const actionTypes = {
  INC: 'INC'
}
const actionCreators = {
  inc: () => ({ type: actionTypes.INC, payload: {} })
}
const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.INC) {
    return state.set('number', state.number + 1)
  }
  return state
}

module.exports = {
  initialState,
  actionCreators,
  reducer
}

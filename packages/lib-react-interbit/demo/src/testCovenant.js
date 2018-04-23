const Immutable = require('seamless-immutable')

const initialState = Immutable.from({ values: [] })

export default {
  initialState,
  actionCreators: {
    add: text => ({ type: 'ADD', payload: { text } })
  },
  smartContract: (state = initialState, action) => {
    if (action.type === 'ADD') {
      return state.setIn(['values'], state.values.concat(action.payload.text))
    }
    return state
  }
}

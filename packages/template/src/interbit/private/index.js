// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

const initialState = Immutable.from({
  chainMetadata: { name: `Template application - User's private chain` },
  texts: []
})

const actionCreators = {
  act: text => ({ type: 'ACT', payload: { text } })
}

const reducer = (state = initialState, action) => {
  const nextState = state
  if (action.type === 'ACT') {
    return nextState.set('texts', nextState.texts.concat([action.payload.text]))
  }
  return nextState
}

module.exports = {
  initialState,
  actionCreators,
  reducer
}

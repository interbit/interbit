// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { fork } = require('redux-saga/effects')
const Immutable = require('seamless-immutable')

module.exports = covenants => {
  const actionCreators = covenants.reduce(
    (accumActionCreators, covenant) =>
      Object.assign({}, accumActionCreators, covenant.actionCreators),
    {}
  )

  const initialState = covenants.reduce(
    (initialStateAccum, covenant) =>
      initialStateAccum.merge(covenant.initialState || {}, { deep: true }),
    Immutable.from({})
  )

  const reducer = (state = initialState, action) =>
    covenants.reduce(
      (accumState, covenant) => covenant.reducer(accumState, action),
      state
    )

  const sagas = covenants
    .filter(covenant => covenant.rootSaga !== undefined)
    .map(covenant => fork(covenant.rootSaga))

  return {
    actionCreators,
    reducer,
    initialState,
    *rootSaga() {
      yield sagas
    }
  }
}

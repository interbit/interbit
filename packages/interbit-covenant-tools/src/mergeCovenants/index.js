// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { fork } = require('redux-saga/effects')
const Immutable = require('seamless-immutable')

const {
  validate,
  objectValidationRules: { object, func }
} = require('../validate')

module.exports = covenants => {
  if (!Array.isArray(covenants)) {
    throw new Error('Expected an array of covenants')
  }
  covenants.forEach(covenant =>
    validate(covenant, {
      actionTypes: object('Covenant must export actionTypes'),
      actionCreators: object('Covenant must export actionCreators'),
      initialState: object('Covenant must export initialState'),
      reducer: func('Covenant must export a reducer function')
    })
  )

  const actionCreators = covenants.reduce(
    (accumActionCreators, covenant) => ({
      ...accumActionCreators,
      ...covenant.actionCreators
    }),
    {}
  )

  const actionTypes = covenants.reduce(
    (accumActionTypes, covenant) => ({
      ...accumActionTypes,
      ...covenant.actionTypes
    }),
    {}
  )

  const initialState = covenants.reduce(
    (initialStateAccum, covenant) =>
      initialStateAccum.merge(covenant.initialState, { deep: true }),
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
    actionTypes,
    reducer,
    initialState,
    *rootSaga() {
      yield sagas
    }
  }
}

// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const { takeEvery, call, put } = require('redux-saga').effects

const {
  cAuthConsumerCovenant,
  mergeCovenants
} = require('interbit-covenant-tools')

const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: { name: `Template application - User's private chain` },
  memos: [],
  runningTotal: 0
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  switch (action.type) {
    case actionTypes.MEMO: {
      console.log('REDUCER: ', action)

      const { text } = action.payload
      const memos = state.getIn(['memos'], Immutable.from([]))

      return text ? state.set('memos', memos.concat(text)) : state
    }

    case actionTypes.ADD: {
      console.log('REDUCER: ', action)

      const { number: maybeNumber } = action.payload
      const number = Number(maybeNumber)
      const runningTotal = state.getIn(['runningTotal'], 0)

      return Number.isFinite(number)
        ? state.set('runningTotal', runningTotal + number)
        : state
    }

    case actionTypes.SET_TIMESTAMP: {
      console.log('REDUCER: ', action)

      const { timestamp } = action.payload
      return Number.isFinite(Number(timestamp))
        ? state.set('timestamp', timestamp)
        : state
    }

    default:
      return state
  }
}

function* rootSaga() {
  console.log(`ROOT SAGA: watching for ${actionTypes.CURRENT_TIMESTAMP_SAGA}`)
  yield takeEvery(actionTypes.CURRENT_TIMESTAMP_SAGA, currentTimestampSaga)
}

function* currentTimestampSaga(action) {
  // action is always the first argument when called from takeEvery
  console.log('SAGA: ', action)

  // Yield the result of a non-deterministic function
  const timestamp = yield call(Date.now)

  // Create an action containing the result
  const setTimestampAction = actionCreators.setTimestamp(timestamp)

  // Now the action is deterministic and can be handled by the reducer
  yield put(setTimestampAction)
}

const covenant = {
  actionTypes,
  actionCreators,
  initialState,
  reducer,
  rootSaga
}

module.exports = mergeCovenants([covenant, cAuthConsumerCovenant])

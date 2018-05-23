// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

const {
  cAuthConsumerCovenant,
  mergeCovenants
} = require('interbit-covenant-tools')

const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: { name: `Todo list application - User's private chain` },
  memos: [],
  items: [],
  runningTotal: 0
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  console.log('REDUCING: ', action)

  switch (action.type) {
    case actionTypes.MEMO: {
      const { text } = action.payload
      const memos = state.getIn(['memos'], Immutable.from([]))

      return text ? state.set('memos', memos.concat(text)) : state
    }

    case actionTypes.ADD: {
      const { number: maybeNumber } = action.payload
      const number = Number(maybeNumber)
      const runningTotal = state.getIn(['runningTotal'], 0)

      return Number.isFinite(number)
        ? state.set('runningTotal', runningTotal + number)
        : state
    }

    case actionTypes.ADD_TODO: {
      const { title, description } = action.payload
      const items = state.getIn(['items'], Immutable.from([]))
      const id = items.length

      return title
        ? state.set('items', items.concat({ id, title, description }))
        : state
    }

    default:
      return state
  }
}

const covenant = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}

module.exports = mergeCovenants([covenant, cAuthConsumerCovenant])

// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

const {
  cAuthConsumerCovenant,
  mergeCovenants
} = require('interbit-covenant-tools')

const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: { name: `Todo list application - User's private chain` },
  todos: []
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  console.log('REDUCING: ', action)

  switch (action.type) {
    case actionTypes.ADD_TODO: {
      const { title, description } = action.payload
      const todos = state.getIn(['todos'], Immutable.from([]))
      const id = todos.length
      const completed = false

      return title
        ? state.set(
            'todos',
            todos.concat({ id, title, description, completed })
          )
        : state
    }

    case actionTypes.EDIT_TODO: {
      const { id: maybeNumber } = action.payload
      const id = Number(maybeNumber)
      const todos = state.getIn(['todos'], Immutable.from([]))

      if (!Number.isFinite(id) || id >= todos.length || !action.payload.title) {
        return state
      }

      const nextState = state.setIn(['todos', id], action.payload)
      return nextState
    }

    case actionTypes.TOGGLE_TODO: {
      const { id: maybeNumber } = action.payload
      const id = Number(maybeNumber)
      const todos = state.getIn(['todos'], Immutable.from([]))

      if (!Number.isFinite(id) || id >= todos.length) {
        return state
      }

      const nextState = state.setIn(
        ['todos', id, 'completed'],
        !todos[id].completed
      )
      return nextState
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

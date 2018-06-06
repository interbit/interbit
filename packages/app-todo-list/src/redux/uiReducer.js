import Immutable from 'seamless-immutable'

const TOGGLE_TODO_ROW = 'UI/TOGGLE_TODO_ROW'

export const toggleTodoRow = id => ({
  type: TOGGLE_TODO_ROW,
  payload: {
    id
  }
})

const initialState = {
  editableTodos: {}
}

export const reducer = (state = Immutable.from(initialState), action) => {
  switch (action.type) {
    case TOGGLE_TODO_ROW: {
      const { id } = action.payload
      const isTodoEditable = state.getIn(['editableTodos', id], false)
      const nextState = state
        .setIn(['editableTodos'], {})
        .setIn(['editableTodos', id], !isTodoEditable)

      return nextState
    }

    default:
      return state
  }
}

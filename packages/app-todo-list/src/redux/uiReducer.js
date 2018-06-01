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
      const editableTodos = state.getIn(['editableTodos'])
      const oldId = Object.keys(editableTodos).find(key => editableTodos[key])
      const nextState =
        id !== oldId
          ? state
              .setIn(['editableTodos', oldId], false)
              .setIn(['editableTodos', id], !state.editableTodos[id])
          : state.setIn(['editableTodos', id], !state.setIn[id])

      return nextState
    }

    default:
      return state
  }
}

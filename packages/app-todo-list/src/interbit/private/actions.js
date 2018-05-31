const actionTypes = require('./actionTypes')

const actionCreators = {
  addTodo: (title, description) => ({
    type: actionTypes.ADD_TODO,
    payload: {
      title,
      description
    }
  }),

  editTodo: (id, title, description, completed) => ({
    type: actionTypes.EDIT_TODO,
    payload: {
      id,
      title,
      description,
      completed
    }
  }),

  toggleTodo: id => ({
    type: actionTypes.TOGGLE_TODO,
    payload: {
      id
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}

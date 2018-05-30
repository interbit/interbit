const actionTypes = require('./actionTypes')

const actionCreators = {
  addTodo: (title, description) => ({
    type: actionTypes.ADD_TODO,
    payload: {
      title,
      description
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

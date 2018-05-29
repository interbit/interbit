const actionTypes = require('./actionTypes')

const actionCreators = {
  addTodo: (title, description) => ({
    type: actionTypes.ADD_TODO,
    payload: {
      title,
      description
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}

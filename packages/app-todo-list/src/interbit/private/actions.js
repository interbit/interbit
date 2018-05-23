const actionTypes = require('./actionTypes')

const actionCreators = {
  memo: text => ({
    type: actionTypes.MEMO,
    payload: { text }
  }),

  add: number => ({
    type: actionTypes.ADD,
    payload: { number }
  }),

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

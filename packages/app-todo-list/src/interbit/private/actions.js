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

  addItem: (id, title, description) => ({
    type: actionTypes.ADD_ITEM,
    payload: {
      id,
      title,
      description
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}

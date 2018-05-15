const actionTypes = require('./actionTypes')

const actionCreators = {
  memo: text => ({
    type: actionTypes.MEMO,
    payload: { text }
  }),

  add: number => ({
    type: actionTypes.ADD,
    payload: { number }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}

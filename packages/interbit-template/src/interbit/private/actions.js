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

  setTimestamp: timestamp => ({
    type: actionTypes.SET_TIMESTAMP,
    payload: { timestamp }
  }),

  setCurrentTimestampInActionCreator: () => ({
    type: actionTypes.SET_TIMESTAMP,
    payload: { timestamp: Date.now() }
  }),

  currentTimestampSaga: () => ({
    type: actionTypes.CURRENT_TIMESTAMP_SAGA,
    payload: {}
  })
}

module.exports = {
  actionTypes,
  actionCreators
}

const covenantName = 'template-private'

const actionTypes = {
  MEMO: `${covenantName}/MEMO`,
  ADD: `${covenantName}/ADD`
}

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

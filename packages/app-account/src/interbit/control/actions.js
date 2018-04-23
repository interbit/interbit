const covenantName = 'app-account-control'

const actionTypes = {
  PRIVATE_CHAIN_COVENANT: `${covenantName}/PRIVATE_CHAIN_COVENANT`
}

const actionCreators = {
  privateChainCovenant: ({ chainAlias, covenantHash }) => ({
    type: actionTypes.PRIVATE_CHAIN_COVENANT,
    payload: { chainAlias, covenantHash }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}

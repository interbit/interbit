const { PATHS } = require('./constants')

const getConfig = state => state.getIn(PATHS.MANIFEST_CONFIG)

const getChainId = (state, chainAlias) =>
  state.getIn([...PATHS.MANIFEST_CHAINS, chainAlias])

const getCovenantHash = (state, covenantAlias) =>
  state.getIn([...PATHS.MANIFEST_COVENANTS, covenantAlias])

module.exports = {
  getConfig,
  getChainId,
  getCovenantHash
}

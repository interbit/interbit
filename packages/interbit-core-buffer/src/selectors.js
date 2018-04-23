const { KEY } = require('./constants')

const getConfig = state => state.getIn([KEY, 'config'])

const getChainId = (state, chainAlias) =>
  state.getIn([KEY, 'config', 'chains', chainAlias])

const getCovenantHash = (state, covenantAlias) =>
  state.getIn([KEY, 'config', 'covenants', covenantAlias])

module.exports = {
  getConfig,
  getChainId,
  getCovenantHash
}

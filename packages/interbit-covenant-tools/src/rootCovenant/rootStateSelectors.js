const {
  findAliasInSubtree,
  getApps,
  getBlockMasterByAlias,
  getChainAliases,
  getChainIdByAlias,
  getChainIds,
  getChains,
  getChildChainByAlias,
  getCovenantHashByAlias,
  getCovenants,
  getGenesisBlockByAlias,
  getGenesisBlocks,
  getJoinsByAlias,
  getManifest,
  getPeers,
  getRootChainId,
  getRootChildren
} = require('../manifest/manifestSelectors')
const { PATHS } = require('./constants')

const getConfig = state => state.getIn(PATHS.MANIFEST_CONFIG)

const getChainId = (state, chainAlias) =>
  state.getIn([...PATHS.MANIFEST_CHAINS, chainAlias])

const getCovenantHash = (state, covenantAlias) =>
  state.getIn([...PATHS.MANIFEST_COVENANTS, covenantAlias])

const findAliasInSubtreeFromManifest = (state, chainAlias) =>
  findAliasInSubtree(chainAlias, getManifest(state))

const getAppsFromManifest = state => getApps(getManifest(state))

const getBlockMasterByAliasFromManifest = (state, chainAlias) =>
  getBlockMasterByAlias(chainAlias, getManifest(state))

const getChainAliasesFromManifest = state => getChainAliases(getManifest(state))

const getChainIdByAliasFromManifest = (state, chainAlias) =>
  getChainIdByAlias(chainAlias, getManifest(state))

const getChainIdsFromManifest = state => getChainIds(getManifest(state))

const getChainsFromManifest = state => getChains(getManifest(state))

const getChildChainByAliasFromManifest = (state, chainAlias) =>
  getChildChainByAlias(chainAlias, getManifest(state))

const getCovenantHashByAliasFromManifest = (state, chainAlias) =>
  getCovenantHashByAlias(chainAlias, getManifest(state))

const getCovenantsFromManifest = state => getCovenants(getManifest(state))

const getGenesisBlockByAliasFromManifest = (state, chainAlias) =>
  getGenesisBlockByAlias(chainAlias, getManifest(state))

const getGenesisBlocksFromManifest = state =>
  getGenesisBlocks(getManifest(state))

const getJoinsByAliasFromManifest = (state, chainAlias) =>
  getJoinsByAlias(chainAlias, getManifest(state))

const getManifestFromManifest = state => getManifest(getManifest(state))

const getPeersFromManifest = state => getPeers(getManifest(state))

const getRootChainIdFromManifest = state => getRootChainId(getManifest(state))

const getRootChildrenFromManifest = state => getRootChildren(getManifest(state))

module.exports = {
  getConfig,
  getChainId,
  getCovenantHash,
  findAliasInSubtreeFromManifest,
  getAppsFromManifest,
  getBlockMasterByAliasFromManifest,
  getChainAliasesFromManifest,
  getChainIdByAliasFromManifest,
  getChainIdsFromManifest,
  getChainsFromManifest,
  getChildChainByAliasFromManifest,
  getCovenantHashByAliasFromManifest,
  getCovenantsFromManifest,
  getGenesisBlockByAliasFromManifest,
  getGenesisBlocksFromManifest,
  getJoinsByAliasFromManifest,
  getManifestFromManifest,
  getPeersFromManifest,
  getRootChainIdFromManifest,
  getRootChildrenFromManifest
}

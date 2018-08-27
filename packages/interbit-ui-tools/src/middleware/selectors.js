const {
  CHAINS,
  CHAIN_DATA,
  CHAIN_STATUS,
  INTERBIT_PATHS,
  INTERBIT_REDUCER_KEY,
  INTERBIT_STATUS,
  PEERS,
  PUBLIC_KEY,
  SPONSOR_CONFIG,
  STATUS
} = require('./constants')

const { emptyObject, immutable, entireTree } = require('../selectorScope')

const interbitSubtree = state =>
  immutable(state).getIn([INTERBIT_REDUCER_KEY], emptyObject)

const getChainAliases = (state, { subtree = interbitSubtree } = {}) =>
  Object.keys(subtree(state).getIn([CHAINS], emptyObject))

const getChainStatus = (
  state,
  { subtree = interbitSubtree, chainAlias } = {}
) =>
  subtree(state).getIn([CHAIN_DATA, chainAlias, STATUS], CHAIN_STATUS.UNKNOWN)

const isChainLoaded = (state, { subtree, chainAlias } = {}) => {
  const chainStatus = getChainStatus(state, { subtree, chainAlias })
  return chainStatus === CHAIN_STATUS.BLOCKING
}

const getChainId = (state, { subtree = interbitSubtree, chainAlias } = {}) =>
  subtree(state).getIn([CHAINS, chainAlias, ...INTERBIT_PATHS.CHAIN_ID])

const getChain = (
  state,
  { subtree = interbitSubtree, chainAlias, defaultValue = emptyObject } = {}
) => subtree(state).getIn([CHAINS, chainAlias], immutable(defaultValue))

const getBlockMaster = (
  state,
  { subtree = interbitSubtree, chainAlias } = {}
) => subtree(state).getIn([CHAINS, chainAlias, ...INTERBIT_PATHS.BLOCK_MASTER])

const getSponsorConfig = (
  state,
  { subtree = interbitSubtree, publicChainAlias, privateChainAlias } = {}
) =>
  subtree(state).getIn(
    [CHAINS, publicChainAlias, SPONSOR_CONFIG, privateChainAlias],
    emptyObject
  )

const getPublicKey = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([PUBLIC_KEY])

const getInterbitStatus = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([STATUS], INTERBIT_STATUS.UNKNOWN)

const getConfiguredChains = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([CHAIN_DATA], emptyObject)

const getConfiguredPeers = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([PEERS], [])

module.exports = {
  entireTree,
  interbitSubtree,
  getBlockMaster,
  getChain,
  getChainAliases,
  getChainId,
  getChainStatus,
  getConfiguredChains,
  getConfiguredPeers,
  getInterbitStatus,
  getPublicKey,
  getSponsorConfig,
  isChainLoaded
}

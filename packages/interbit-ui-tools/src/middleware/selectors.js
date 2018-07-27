const {
  BLOCK_MASTER,
  CHAINS,
  CHAIN_ID,
  CHAIN_DATA,
  CHAIN_STATUS,
  CONFIG,
  CONNECTION,
  COVENANTS,
  INTERBIT,
  INTERBIT_REDUCER_KEY,
  INTERBIT_STATUS,
  PEERS,
  PRIVATE_CHAIN_ALIAS,
  PUBLIC_CHAIN_ALIAS,
  PUBLIC_KEY,
  SPONSOR_CONFIG,
  STATUS
} = require('./constants')

const { emptyObject, immutable, entireTree } = require('../selectorScope')

const interbitSubtree = state =>
  immutable(state).getIn([INTERBIT_REDUCER_KEY], emptyObject)

const getChainAliases = (state, { subtree = interbitSubtree } = {}) =>
  Object.keys(subtree(state).getIn([CHAINS], emptyObject))

const isChainLoaded = (state, { subtree = interbitSubtree, chainAlias }) => {
  const chainStatus = subtree(state).getIn(
    [CHAIN_DATA, chainAlias, STATUS],
    CHAIN_STATUS.UNKNOWN
  )
  return chainStatus === CHAIN_STATUS.BLOCKING
}

const isPublicChainLoaded = (
  state,
  { subtree, publicChainAlias = PUBLIC_CHAIN_ALIAS } = {}
) => isChainLoaded(state, { subtree, chainAlias: publicChainAlias })

const getChainId = (state, { subtree = interbitSubtree, chainAlias } = {}) =>
  subtree(state).getIn([CHAINS, chainAlias, INTERBIT, CHAIN_ID])

const getPublicChainId = (
  state,
  { subtree, publicChainAlias = PUBLIC_CHAIN_ALIAS } = {}
) => getChainId(state, { subtree, chainAlias: publicChainAlias })

const getPrivateChainId = (
  state,
  { subtree, privateChainAlias = PRIVATE_CHAIN_ALIAS } = {}
) => getChainId(state, { subtree, chainAlias: privateChainAlias })

const getChain = (
  state,
  { subtree = interbitSubtree, chainAlias, defaultValue = emptyObject }
) => subtree(state).getIn([CHAINS, chainAlias], defaultValue)

const getPublicChain = (
  state,
  { subtree, publicChainAlias = PUBLIC_CHAIN_ALIAS, defaultValue } = {}
) => getChain(state, { subtree, chainAlias: publicChainAlias, defaultValue })

const getPrivateChain = (
  state,
  { subtree, privateChainAlias = PRIVATE_CHAIN_ALIAS, defaultValue } = {}
) => getChain(state, { subtree, chainAlias: privateChainAlias, defaultValue })

const getBlockMaster = (
  state,
  { subtree = interbitSubtree, chainAlias } = {}
) => subtree(state).getIn([CHAINS, chainAlias, INTERBIT, CONFIG, BLOCK_MASTER])

const getSponsorConfig = (
  state,
  {
    subtree = interbitSubtree,
    publicChainAlias = PUBLIC_CHAIN_ALIAS,
    privateChainAlias = PRIVATE_CHAIN_ALIAS
  } = {}
) =>
  subtree(state).getIn(
    [CHAINS, publicChainAlias, SPONSOR_CONFIG, privateChainAlias],
    emptyObject
  )

const getPublicKey = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([PUBLIC_KEY])

const getInterbitStatus = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([STATUS], INTERBIT_STATUS.UNKNOWN)

const getConnectionStatus = (state, { subtree = interbitSubtree } = {}) =>
  subtree(state).getIn([CONNECTION])

const getCovenantHash = (state, { subtree = interbitSubtree, covenantAlias }) =>
  subtree(state).getIn([COVENANTS, covenantAlias])

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
  getConfiguredChains,
  getConfiguredPeers,
  getConnectionStatus,
  getCovenantHash,
  getInterbitStatus,
  getPrivateChain,
  getPrivateChainId,
  getPublicChain,
  getPublicChainId,
  getPublicKey,
  getSponsorConfig,
  isChainLoaded,
  isPublicChainLoaded
}

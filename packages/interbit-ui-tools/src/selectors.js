const Immutable = require('seamless-immutable')
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

const emptyObject = Immutable.from({})

const immutable = state =>
  Immutable.isImmutable(state) ? state : Immutable.from(state || {})

const fromStoreRoot = state => immutable(state[INTERBIT_REDUCER_KEY])

const interbitAtRoot = state => immutable(state)

const isChainLoaded = (state, { root = fromStoreRoot, chainAlias }) => {
  const chainStatus = root(state).getIn(
    [CHAIN_DATA, chainAlias, STATUS],
    CHAIN_STATUS.UNKNOWN
  )
  return chainStatus === CHAIN_STATUS.BLOCKING
}

const isPublicChainLoaded = (
  state,
  { root, publicChainAlias = PUBLIC_CHAIN_ALIAS } = {}
) => isChainLoaded(state, { root, chainAlias: publicChainAlias })

const getChainId = (state, { root = fromStoreRoot, chainAlias } = {}) =>
  root(state).getIn([CHAINS, chainAlias, INTERBIT, CHAIN_ID])

const getPublicChainId = (
  state,
  { root, publicChainAlias = PUBLIC_CHAIN_ALIAS } = {}
) => getChainId(state, { root, chainAlias: publicChainAlias })

const getPrivateChainId = (
  state,
  { root, privateChainAlias = PRIVATE_CHAIN_ALIAS } = {}
) => getChainId(state, { root, chainAlias: privateChainAlias })

const getChain = (
  state,
  { root = fromStoreRoot, chainAlias, defaultValue = emptyObject }
) => root(state).getIn([CHAINS, chainAlias], defaultValue)

const getPublicChain = (
  state,
  { root, publicChainAlias = PUBLIC_CHAIN_ALIAS, defaultValue } = {}
) => getChain(state, { root, chainAlias: publicChainAlias, defaultValue })

const getPrivateChain = (
  state,
  { root, privateChainAlias = PRIVATE_CHAIN_ALIAS, defaultValue } = {}
) => getChain(state, { root, chainAlias: privateChainAlias, defaultValue })

const getBlockMaster = (state, { root = fromStoreRoot, chainAlias } = {}) =>
  root(state).getIn([CHAINS, chainAlias, INTERBIT, CONFIG, BLOCK_MASTER])

const getSponsorConfig = (
  state,
  {
    root = fromStoreRoot,
    publicChainAlias = PUBLIC_CHAIN_ALIAS,
    privateChainAlias = PRIVATE_CHAIN_ALIAS
  } = {}
) =>
  root(state).getIn(
    [CHAINS, publicChainAlias, SPONSOR_CONFIG, privateChainAlias],
    emptyObject
  )

const getPublicKey = (state, { root = fromStoreRoot } = {}) =>
  root(state).getIn([PUBLIC_KEY])

const getInterbitStatus = (state, { root = fromStoreRoot } = {}) =>
  root(state).getIn([STATUS], INTERBIT_STATUS.UNKNOWN)

const getConnectionStatus = (state, { root = fromStoreRoot } = {}) =>
  root(state).getIn([CONNECTION])

const getCovenantHash = (state, { root = fromStoreRoot, covenantAlias }) =>
  root(state).getIn([COVENANTS, covenantAlias])

const getConfiguredChains = (state, { root = fromStoreRoot } = {}) =>
  root(state).getIn([CHAIN_DATA], emptyObject)

const getConfiguredPeers = (state, { root = fromStoreRoot } = {}) =>
  root(state).getIn([PEERS], [])

module.exports = {
  getBlockMaster,
  getChain,
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
  isPublicChainLoaded,
  immutable,
  interbitAtRoot,
  fromStoreRoot
}

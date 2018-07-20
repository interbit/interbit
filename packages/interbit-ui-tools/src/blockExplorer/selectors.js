const {
  BLOCK_EXPLORER_REDUCER_KEY,
  CHAINS,
  SELECTED_BLOCK_HASH,
  SELECTED_CHAIN,
  SHOW_RAW_STATE,
  NO_CHAIN_SELECTED
} = require('./constants')

const { emptyObject, immutable, entireTree } = require('../selectorScope')

const blockExplorerSubtree = state =>
  immutable(state).getIn([BLOCK_EXPLORER_REDUCER_KEY], emptyObject)

const emptyChainState = chainAlias => ({
  chainAlias,
  state: {},
  interbit: {},
  blocks: []
})

const getChainAliases = (state, { subtree = blockExplorerSubtree } = {}) =>
  Object.keys(subtree(state).getIn([CHAINS], emptyObject))

const getChainState = (
  state,
  { subtree = blockExplorerSubtree, chainAlias = NO_CHAIN_SELECTED } = {}
) => subtree(state).getIn([CHAINS, chainAlias]) || emptyChainState(chainAlias)

const getSelectedChainAlias = (
  state,
  { subtree = blockExplorerSubtree } = {}
) => subtree(state).getIn([SELECTED_CHAIN])

const getSelectedBlockHash = (state, { subtree = blockExplorerSubtree } = {}) =>
  subtree(state).getIn([SELECTED_BLOCK_HASH])

const getShowRawState = (state, { subtree = blockExplorerSubtree } = {}) =>
  subtree(state).getIn([SHOW_RAW_STATE], false)

module.exports = {
  entireTree,
  blockExplorerSubtree,
  emptyChainState,
  getChainAliases,
  getChainState,
  getSelectedBlockHash,
  getSelectedChainAlias,
  getShowRawState
}

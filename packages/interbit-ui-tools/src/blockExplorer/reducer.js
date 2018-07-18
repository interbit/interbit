const Immutable = require('seamless-immutable')
const { actionTypes: middlewareActionTypes } = require('../middleware')
const { actionTypes: blockExplorerActionTypes } = require('./actions')
const { emptyChainState } = require('./selectors')

const {
  BLOCKS,
  CHAINS,
  INTERBIT,
  NO_CHAIN_SELECTED,
  SELECTED_BLOCK_HASH,
  SELECTED_CHAIN,
  SHOW_RAW_DATA,
  STATE
} = require('./constants')

const ensureChainStateExists = (state, chainAlias) =>
  state.chains && state.chains[chainAlias]
    ? state
    : state.setIn([CHAINS, chainAlias], emptyChainState(chainAlias))

const selectChain = (state, chainAlias) =>
  chainAlias
    ? ensureChainStateExists(state, chainAlias).setIn(
        [SELECTED_CHAIN],
        chainAlias
      )
    : state

const updateChainState = (state, { chainAlias, chainState }) => {
  let nextState = ensureChainStateExists(state, chainAlias)
  if (chainState) {
    const { interbit = {}, ...appState } = chainState
    nextState = nextState
      .setIn([CHAINS, chainAlias, STATE], appState)
      .setIn([CHAINS, chainAlias, INTERBIT], interbit)
  }
  return nextState
}

const updateBlocks = (state, { chainAlias, block }) => {
  let nextState = ensureChainStateExists(state, chainAlias)
  if (block) {
    const blocksPath = [CHAINS, chainAlias, BLOCKS]
    const blocks = nextState.getIn(blocksPath, [])
    const appendBlock =
      blocks.length === 0 ||
      block.content.previousHash === blocks[blocks.length - 1].blockHash

    nextState = appendBlock
      ? nextState.setIn(blocksPath, [...blocks, block])
      : nextState.setIn(blocksPath, [...blocks.slice(0, -1), block])
  }
  return nextState
}

const initialState = Immutable.from({
  chains: {
    [NO_CHAIN_SELECTED]: emptyChainState(NO_CHAIN_SELECTED)
  },
  selectedChain: NO_CHAIN_SELECTED,
  showRawData: false,
  selectedBlockHash: null
})

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case middlewareActionTypes.CHAIN_SUBSCRIBED: {
      const { chainAlias, chainState } = action.payload
      return updateChainState(state, { chainAlias, chainState })
    }

    case middlewareActionTypes.CHAIN_UPDATED: {
      const { chainAlias, chainState } = action.payload
      return updateChainState(state, { chainAlias, chainState })
    }

    case middlewareActionTypes.CHAIN_BLOCK_ADDED: {
      const { chainAlias, newBlock: block } = action.payload
      return updateBlocks(state, { chainAlias, block })
    }

    case blockExplorerActionTypes.SET_SELECTED_CHAIN:
      return selectChain(state, action.payload.chainAlias)

    case blockExplorerActionTypes.TOGGLE_RAW:
      return state.setIn([SHOW_RAW_DATA], !state.showRawData)

    case blockExplorerActionTypes.SET_SELECTED_BLOCK_HASH:
      return state.setIn([SELECTED_BLOCK_HASH], action.payload.hash)

    default:
      return state
  }
}

module.exports = reducer

import Immutable from 'seamless-immutable'
import { actionTypes as middlewareActionTypes } from 'interbit-ui-tools'

// BlockExplorer specific actions
const TOGGLE_RAW = 'Interbit/BlockExplorer/TOGGLE_RAW'

const SET_SELECTED_BLOCK_HASH = 'Interbit/BlockExplorer/SET_SELECTED_BLOCK_HASH'

const SET_SELECTED_CHAIN = 'Interbit/BlockExplorer/SET_CHAIN'

export const NO_CHAIN_SELECTED = 'None selected'

export const emptyChainState = chainAlias => ({
  chainAlias,
  state: {},
  interbit: {},
  blocks: []
})

const ensureChainStateExists = (state, chainAlias) =>
  state.chains && state.chains[chainAlias]
    ? state
    : state.setIn(['chains', chainAlias], emptyChainState(chainAlias))

const selectChain = (state, chainAlias) =>
  chainAlias
    ? ensureChainStateExists(state, chainAlias).setIn(
        ['selectedChain'],
        chainAlias
      )
    : state

const updateChainState = (state, { chainAlias, chainState }) => {
  let nextState = ensureChainStateExists(state, chainAlias)
  if (chainState) {
    const { interbit = {}, ...appState } = chainState
    nextState = nextState
      .setIn(['chains', chainAlias, 'state'], appState)
      .setIn(['chains', chainAlias, 'interbit'], interbit)
  }
  return nextState
}

const updateBlocks = (state, { chainAlias, block }) => {
  let nextState = ensureChainStateExists(state, chainAlias)
  if (block) {
    const blocksPath = ['chains', chainAlias, 'blocks']
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

export default function reducer(state = initialState, action = {}) {
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

    case SET_SELECTED_CHAIN:
      return selectChain(state, action.payload.chainAlias)

    case TOGGLE_RAW:
      return state.setIn(['showRawData'], !state.showRawData)

    case SET_SELECTED_BLOCK_HASH:
      return state.setIn(['selectedBlockHash'], action.payload.hash)

    default:
      return state
  }
}

export function toggleRawData() {
  return {
    type: TOGGLE_RAW,
    payload: null
  }
}

export function setSelectedBlockHash(hash) {
  return {
    type: SET_SELECTED_BLOCK_HASH,
    payload: {
      hash
    }
  }
}

export function setSelectedChain(chainAlias) {
  return {
    type: SET_SELECTED_CHAIN,
    payload: {
      chainAlias
    }
  }
}

export function getExploreChainState(state, chainAlias) {
  const {
    exploreChain,
    exploreChain: { selectedChain }
  } = state
  return (
    exploreChain.chains[chainAlias || selectedChain] ||
    exploreChain.chains[NO_CHAIN_SELECTED] ||
    emptyChainState(NO_CHAIN_SELECTED)
  )
}

export function getExploreChainAliases(state) {
  const { exploreChain } = state
  return Object.keys(exploreChain.chains)
}

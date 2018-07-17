import Immutable from 'seamless-immutable'
import { actionTypes as middlewareActionTypes } from 'interbit-ui-tools'

// BlockExplorer specific actions
const TOGGLE_RAW = 'Interbit/BlockExplorer/TOGGLE_RAW'

const SET_SELECTED_BLOCK_HASH = 'Interbit/BlockExplorer/SET_SELECTED_BLOCK_HASH'

const SET_SELECTED_CHAIN = 'Interbit/BlockExplorer/SET_CHAIN'

export const NO_CHAIN_SELECTED = 'No Chain Selected'

const dummyDispatch = () => {}

export const emptyChainState = chainAlias => ({
  chainId: chainAlias,
  name: chainAlias,
  state: {},
  interbit: {},
  blocks: [],
  covenantName: undefined,
  chainDispatch: dummyDispatch
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

const updateChainState = (state, { chainAlias, chainState, blocks }) => {
  let nextState = ensureChainStateExists(state, chainAlias)
  if (chainState && chainState.interbit) {
    const { interbit: interbitConfig, ...appState } = chainState
    nextState = nextState
      .setIn(['chains', chainAlias, 'state'], appState)
      .setIn(['chains', chainAlias, 'interbit'], interbitConfig)
  }
  if (blocks) {
    nextState = nextState.setIn(['chains', chainAlias, 'blocks'], blocks)
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
      const { chainAlias, initialState: chainState, blocks } = action.payload
      return updateChainState(state, {
        chainAlias,
        chainState,
        blocks
      })
    }

    case middlewareActionTypes.CHAIN_UPDATED: {
      const { chainAlias, state: chainState } = action.payload
      return updateChainState(state, { chainAlias, chainState })
    }

    case middlewareActionTypes.CHAIN_BLOCK_ADDED: {
      const { chainAlias, blocks } = action.payload
      return updateChainState(state, { chainAlias, blocks })
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

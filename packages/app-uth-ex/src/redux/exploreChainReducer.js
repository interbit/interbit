import Immutable from 'seamless-immutable'
import { actionTypes as middlewareActionTypes } from 'interbit-ui-tools'

// TODO: This is non-standard. Make it the same as the template.
const REGISTER_CHAIN = 'Interbit/Chains/REGISTER_CHAIN'

// BlockExplorer specific actions
const TOGGLE_RAW = 'Interbit/BlockExplorer/TOGGLE_RAW'

const SET_SELECTED_BLOCK_HASH = 'Interbit/BlockExplorer/SET_SELECTED_BLOCK_HASH'

const SET_SELECTED_CHAIN = 'Interbit/BlockExplorer/SET_CHAIN'

export const NO_CHAIN_SELECTED = 'No Chain Selected'

export const chainTypes = {
  hub: 'HUB',
  spoke: 'SPOKE'
}

const dummyDispatch = () => {}

export const emptyChainState = chainId => ({
  chainId,
  name: chainId,
  state: {},
  interbit: { chainId },
  blocks: [],
  chainType: undefined,
  chainDispatch: dummyDispatch
})

const ensureChainStateExists = (state, chainId) =>
  state.chains[chainId]
    ? state
    : state.setIn(['chains', chainId], emptyChainState(chainId))

const selectChain = (state, chainId) =>
  chainId
    ? ensureChainStateExists(state, chainId).setIn(['selectedChainId'], chainId)
    : state

const updateChain = (state, action) => {
  const {
    payload: { chainAlias: chainId, state: rawChainState }
  } = action
  if (
    rawChainState &&
    rawChainState.interbit &&
    rawChainState.interbit.blocks
  ) {
    const { interbit: interbitState, ...appState } = rawChainState
    const { blocks, ...interbit } = interbitState

    return ensureChainStateExists(state, chainId)
      .setIn(['chains', chainId, 'state'], appState)
      .setIn(['chains', chainId, 'interbit'], interbit)
      .setIn(['chains', chainId, 'blocks'], blocks)
  }
  return state
}

const registerChainDispatch = (state, action) => {
  const {
    payload: { chainId, chainType, chainDispatch }
  } = action
  return chainId && chainType && chainDispatch
    ? ensureChainStateExists(state, chainId)
        .setIn(['chains', chainId, 'chainType'], chainType)
        .setIn(['chains', chainId, 'chainDispatch'], chainDispatch)
    : state
}

const initialState = Immutable.from({
  chains: {
    [NO_CHAIN_SELECTED]: emptyChainState(NO_CHAIN_SELECTED)
  },
  selectedChainId: NO_CHAIN_SELECTED,
  showRawData: false,
  selectedBlockHash: null
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_CHAIN:
      return registerChainDispatch(state, action)

    case middlewareActionTypes.CHAIN_UPDATED:
      return updateChain(state, action)

    case SET_SELECTED_CHAIN:
      return selectChain(state, action.payload.chainId)

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

export function setSelectedChain(chainId) {
  return {
    type: SET_SELECTED_CHAIN,
    payload: {
      chainId
    }
  }
}

export function registerChain(
  chainId,
  chainType,
  chainDispatch = dummyDispatch
) {
  return {
    type: REGISTER_CHAIN,
    payload: {
      chainId,
      chainType,
      chainDispatch
    }
  }
}

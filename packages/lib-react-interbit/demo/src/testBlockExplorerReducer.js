import Immutable from 'seamless-immutable'
import uuid from 'uuid'

// BlockExplorer specific actions
const TOGGLE_RAW = 'Interbit/BlockExplorer/TOGGLE_RAW'

const SET_SELECTED_BLOCK_HASH = 'Interbit/BlockExplorer/SET_SELECTED_BLOCK_HASH'

const TEST_COVENANT_ADD = 'ADD'

const hash = value => uuid.v4()

const randomChainId = () => uuid.v4()

const selectedChainId = randomChainId()

const simulateBlocking = (state, action) => {
  const stateHash = hash(state.chains[selectedChainId].state)
  const blocks = state.chains[selectedChainId].blocks
  const index = blocks.length
  const previousBlockHash =
    blocks.length > 0 ? blocks[blocks.length - 1].blockHash : null
  const newBlock = {
    content: {
      actions: [
        {
          ...action,
          hash: hash(action)
        }
      ],
      index,
      height: index,
      timestamp: Date.now()
    },
    blockHash: stateHash,
    previousBlockHash
  }
  return state
    .setIn(['chains', selectedChainId, 'blocks'], blocks.concat(newBlock))
    .setIn(['selectedBlockHash'], stateHash)
}

const initialState = simulateBlocking(
  Immutable.from({
    chains: {
      [selectedChainId]: {
        name: selectedChainId,
        state: { values: [] },
        interbit: { chainId: selectedChainId },
        blocks: []
      }
    },
    selectedChainId,
    error: null,
    showRawData: false,
    selectedBlockHash: null
  }),
  {
    type: '@@SHOWTIME'
  }
)

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_RAW:
      return state.setIn(['showRawData'], !state.showRawData)

    case SET_SELECTED_BLOCK_HASH:
      return state.setIn(['selectedBlockHash'], action.payload.hash)

    // Listen to testCovenant to simulate blocking
    case TEST_COVENANT_ADD: {
      const valuesPath = ['chains', selectedChainId, 'state', 'values']
      const stateAfterAction = state.setIn(
        valuesPath,
        state.getIn(valuesPath).concat(action.payload.text)
      )
      return simulateBlocking(stateAfterAction, action)
    }

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

export function setSelectedBlockHash(selectedBlockHash) {
  return {
    type: SET_SELECTED_BLOCK_HASH,
    payload: {
      hash: selectedBlockHash
    }
  }
}

const Immutable = require('seamless-immutable')

const { actionTypes } = require('./actions')

const {
  ACTION_PREFIX,
  LOG_PREFIX,
  CHAINS,
  CHAIN_DATA,
  ERROR,
  PUBLIC_KEY,
  STATUS,
  CHAIN_STATUS,
  INTERBIT_STATUS
} = require('./constants')

const initialState = Immutable.from({ status: INTERBIT_STATUS.PENDING })

const reducer = (state = initialState, action = {}) => {
  if (
    action.type &&
    action.type.startsWith(ACTION_PREFIX) &&
    action.type !== actionTypes.CHAIN_UPDATED
  ) {
    console.log(`${LOG_PREFIX}: reducer()`, action)
  }

  switch (action.type) {
    case actionTypes.CHAIN_UPDATED: {
      const { chainAlias, state: chainState } = action.payload
      return state.setIn([CHAINS, chainAlias], chainState)
    }

    case actionTypes.CHAIN_LOADED: {
      const { chainAlias, chainId } = action.payload
      return mergeAtPath(state, [CHAIN_DATA, chainAlias], {
        chainId,
        status: CHAIN_STATUS.LOADED
      })
    }
    case actionTypes.CHAIN_SUBSCRIBED: {
      const { chainAlias, initialState: chainState } = action.payload
      return state
        .setIn([CHAINS, chainAlias], chainState)
        .setIn([CHAIN_DATA, chainAlias, STATUS], CHAIN_STATUS.SUBSCRIBED)
    }

    case actionTypes.CHAIN_BLOCKING: {
      const { chainAlias } = action.payload
      return state.setIn(
        [CHAIN_DATA, chainAlias, STATUS],
        CHAIN_STATUS.BLOCKING
      )
    }

    case actionTypes.INTERBIT_STATUS: {
      const { status } = action.payload
      return state.setIn([STATUS], status)
    }

    case actionTypes.INTERBIT_PUBLIC_KEY: {
      const { publicKey } = action.payload
      return state.setIn([PUBLIC_KEY], publicKey)
    }

    case actionTypes.INTERBIT_ERROR: {
      const { error } = action.payload
      return state.setIn([STATUS], INTERBIT_STATUS.ERROR).setIn([ERROR], error)
    }

    case actionTypes.INITIAL_CONFIG: {
      const config = action.payload
      return state.merge(config, { deep: true })
    }

    case actionTypes.CHAIN_SPONSORING: {
      const { chainAlias } = action.payload
      return state.setIn(
        [CHAIN_DATA, chainAlias, STATUS],
        CHAIN_STATUS.SPONSORING
      )
    }

    case actionTypes.CHAIN_LOADING: {
      const { chainAlias } = action.payload
      return state.setIn([CHAIN_DATA, chainAlias, STATUS], CHAIN_STATUS.LOADING)
    }

    case actionTypes.CHAIN_STATUS: {
      const { chainAlias, status } = action.payload
      return state.setIn([CHAIN_DATA, chainAlias, STATUS], status)
    }

    case actionTypes.CHAIN_ERROR: {
      const { chainAlias, error } = action.payload
      return mergeAtPath(state, [CHAIN_DATA, chainAlias], {
        status: CHAIN_STATUS.ERROR,
        error
      })
    }

    case actionTypes.CHAIN_GENESIS: {
      const { chainAlias, chainId, genesisBlock } = action.payload
      return mergeAtPath(state, [CHAIN_DATA, chainAlias], {
        chainId,
        genesisBlock,
        status: CHAIN_STATUS.GENESIS
      })
    }

    case actionTypes.CHAIN_DISPATCH:
    default:
      return state
  }
}

const mergeAtPath = (state, path, value) => {
  const currentValue = state.getIn(path, Immutable.from({}))
  const newValue = currentValue.merge(value, { deep: true })
  return state.setIn(path, newValue)
}

module.exports = reducer

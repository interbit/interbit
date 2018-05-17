import Immutable from 'seamless-immutable'

const initialState = {}

const CHAIN_UPDATED = 'FusionPistonDemo/chains/UPDATED'

export function chainUpdated(chainName, state, chainState) {
  return {
    type: CHAIN_UPDATED,
    payload: {
      chainName,
      state,
      chainState
    }
  }
}

export default function (state = Immutable.from(initialState), action = {}) {
  switch (action.type) {
    case CHAIN_UPDATED:
      return state.merge({
        [action.payload.chainName]: { // TODO With only one chain this can be simplified for clarity
          app: action.payload.state,
          chain: action.payload.chainState
        }
      })
    default:
      return state
  }
}

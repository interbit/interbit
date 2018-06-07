import assert from 'assert'
import Immutable from 'seamless-immutable'
import { actionCreators } from 'interbit-ui-tools'

import exploreChainReducer from '../../redux/exploreChainReducer'

const minimalChainState = { interbit: { blocks: [] } }

const chainUpdateAction = (chainName, state) =>
  actionCreators.chainUpdated(chainName, { ...minimalChainState, ...state })

describe('chainReducer', () => {
  it('adds more than one chain to state', () => {
    const initialState = Immutable.from({ chains: {} })

    const chainName1 = 'first'
    const chainState1 = { cat: 'meow' }
    const chainName2 = 'second'
    const chainState2 = { bun: 'bao' }

    const action1 = chainUpdateAction(chainName1, chainState1)
    const action2 = chainUpdateAction(chainName2, chainState2)

    const state = exploreChainReducer(initialState, action1)
    const result = exploreChainReducer(state, action2)

    assert.deepEqual(result.chains[chainName1].state, chainState1)
    assert.deepEqual(result.chains[chainName2].state, chainState2)
  })

  it('updates existing chain state', () => {
    const newState = Immutable.from({
      ramen: ['noodles', 'soup', 'love']
    })
    const chainName = 'chain'
    const action = chainUpdateAction(chainName, newState)

    const state = Immutable.from({ chains: { ramen: { state: 'meh' } } })

    const result = exploreChainReducer(state, action)

    assert.deepEqual(result.chains[chainName].state, newState)
  })
})

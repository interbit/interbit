const assert = require('assert')
const Immutable = require('seamless-immutable')
const { actionCreators } = require('../src/actions')
const reducer = require('../src/reducer')

describe('chainReducer', () => {
  it('adds more than one chain to state', () => {
    const initialState = Immutable.from({})

    const chainName1 = 'first'
    const chainState1 = { cat: 'meow' }
    const chainName2 = 'second'
    const chainState2 = { bun: 'bao' }

    const action1 = actionCreators.chainUpdated(chainName1, chainState1)
    const action2 = actionCreators.chainUpdated(chainName2, chainState2)

    const state = reducer(initialState, action1)
    const result = reducer(state, action2)

    assert.deepEqual(result.chains[chainName1], chainState1)
    assert.deepEqual(result.chains[chainName2], chainState2)
  })

  it('updates existing chain state', () => {
    const newState = Immutable.from({
      ramen: ['noodles', 'soup', 'love']
    })
    const chainName = 'chain'
    const action = actionCreators.chainUpdated(chainName, newState)

    const state = Immutable.from({
      ramen: 'meh'
    })

    const result = reducer(state, action)

    assert.deepEqual(result.chains[chainName], newState)
  })
})

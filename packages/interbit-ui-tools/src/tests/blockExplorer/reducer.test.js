const assert = require('assert')
const Immutable = require('seamless-immutable')
const middleware = require('../../middleware')
const { reducer, actionCreators } = require('../../blockExplorer')

describe('blockExplorer.reducer', () => {
  const initialState = Immutable.from({ chains: {} })
  const chainAlias = 'myChain'
  const chainId = '123456'

  const assertExpectedState = (
    state,
    {
      startState = initialState,
      expectedEndState,
      expectedStateChange = {},
      assertion = assert.deepEqual
    }
  ) => {
    const expectedState =
      expectedEndState ||
      startState.merge(expectedStateChange, {
        deep: true
      })

    assertion(state, expectedState)
  }

  const assertUnchangedState = (state, expectedState = initialState) => {
    assert.equal(state, expectedState)
  }

  it('unknown action has no effect', () => {
    const action = { type: 'UNKNOWN', payload: 42 }
    const result = reducer(initialState, action)
    assertUnchangedState(result, initialState)
  })

  it('CHAIN_SUBSCRIBED adds chain to state', () => {
    const chainState = { ramen: 'meh' }
    const action = middleware.actionCreators.chainSubscribed(
      chainAlias,
      chainState
    )
    const result = reducer(initialState, action)

    assertExpectedState(result, {
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            chainAlias,
            interbit: {},
            blocks: [],
            state: chainState
          }
        }
      }
    })
  })

  it('CHAIN_UPDATED adds chain to state if not present', () => {
    const chainState = { ramen: ['noodles', 'soup', 'love'] }
    const action = middleware.actionCreators.chainUpdated(
      chainAlias,
      chainState
    )
    const result = reducer(initialState, action)

    assertExpectedState(result, {
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            chainAlias,
            interbit: {},
            blocks: [],
            state: chainState
          }
        }
      }
    })
  })

  it('CHAIN_UPDATED updates existing chain state', () => {
    const chainState1 = { ramen: 'meh' }
    const action1 = middleware.actionCreators.chainSubscribed(
      chainAlias,
      chainState1
    )
    const intermediateState = reducer(initialState, action1)

    const chainState2 = { ramen: ['noodles', 'soup', 'love'] }
    const action2 = middleware.actionCreators.chainUpdated(
      chainAlias,
      chainState2
    )
    const result = reducer(intermediateState, action2)

    assertExpectedState(result, {
      startState: intermediateState,
      expectedStateChange: { chains: { [chainAlias]: { state: chainState2 } } }
    })
  })

  it('CHAIN_UPDATED adds more than one chain to state', () => {
    const chainAlias1 = 'first'
    const chainState1 = { cat: 'meow' }
    const action1 = middleware.actionCreators.chainUpdated(
      chainAlias1,
      chainState1
    )
    const intermediateState = reducer(initialState, action1)

    const chainAlias2 = 'second'
    const chainState2 = { bun: 'bao' }
    const action2 = middleware.actionCreators.chainUpdated(
      chainAlias2,
      chainState2
    )
    const result = reducer(intermediateState, action2)

    assert.deepEqual(result.chains[chainAlias1].state, chainState1)
    assert.deepEqual(result.chains[chainAlias2].state, chainState2)
  })

  it('CHAIN_BLOCK_ADDED adds chain to state if not present', () => {
    const block = { actions: [{ type: 'DO_STUFF', payload: 42 }] }
    const action = middleware.actionCreators.chainBlockAdded(chainAlias, block)
    const result = reducer(initialState, action)

    assertExpectedState(result, {
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            chainAlias,
            interbit: {},
            blocks: [block],
            state: {}
          }
        }
      }
    })
  })

  it('CHAIN_BLOCK_ADDED adds first block to an existing chain', () => {
    const startState = Immutable.from({
      chains: {
        [chainAlias]: {
          chainAlias,
          interbit: { chainId },
          blocks: [],
          state: { ramen: ['noodles', 'soup', 'love'] }
        }
      }
    })

    const block = {
      actions: [{ type: 'DO_STUFF', payload: 42 }],
      blockHash: '1234'
    }
    const action = middleware.actionCreators.chainBlockAdded(chainAlias, block)
    const result = reducer(startState, action)

    assertExpectedState(result, {
      startState,
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            blocks: [block]
          }
        }
      }
    })
  })

  it('CHAIN_BLOCK_ADDED adds properly linked blocks to existing chain', () => {
    const startState = Immutable.from({
      chains: {
        [chainAlias]: {
          chainAlias,
          interbit: { chainId },
          blocks: [],
          state: { ramen: ['noodles', 'soup', 'love'] }
        }
      }
    })

    const block1 = {
      actions: [{ type: 'DO_STUFF', payload: 42 }],
      blockHash: '1234'
    }
    const action1 = middleware.actionCreators.chainBlockAdded(
      chainAlias,
      block1
    )
    const block1State = reducer(startState, action1)

    const block2 = {
      actions: [{ type: 'DO_OTHER_STUFF', payload: 'meow' }],
      content: { previousHash: '1234' },
      blockHash: '5678'
    }
    const action2 = middleware.actionCreators.chainBlockAdded(
      chainAlias,
      block2
    )
    const block2State = reducer(block1State, action2)

    const block3 = {
      actions: [{ type: 'DO_STUFF', payload: 49 }],
      content: { previousHash: '5678' },
      blockHash: '9012'
    }
    const action3 = middleware.actionCreators.chainBlockAdded(
      chainAlias,
      block3
    )
    const result = reducer(block2State, action3)

    assertExpectedState(result, {
      startState,
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            blocks: [block1, block2, block3]
          }
        }
      }
    })
  })

  it('CHAIN_BLOCK_ADDED replaces the last block if blocks are not linked', () => {
    const block1 = {
      actions: [{ type: 'DO_STUFF', payload: 42 }],
      blockHash: '1234'
    }
    const block2 = {
      actions: [{ type: 'DO_OTHER_STUFF', payload: 'meow' }],
      content: { previousHash: '1234' },
      blockHash: '5678'
    }
    const block3 = {
      actions: [{ type: 'STROBE_LIKE' }],
      content: { previousHash: '5678' },
      blockHash: '9012'
    }
    const startState = Immutable.from({
      chains: {
        [chainAlias]: {
          chainAlias,
          interbit: { chainId },
          blocks: [block1, block2, block3],
          state: { ramen: ['noodles', 'soup', 'love'] }
        }
      }
    })

    const block4 = {
      actions: [{ type: 'DO_STUFF', payload: 49 }],
      content: { previousHash: '5678' },
      blockHash: '3456'
    }
    const action = middleware.actionCreators.chainBlockAdded(chainAlias, block4)
    const result = reducer(startState, action)

    assertExpectedState(result, {
      startState,
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            blocks: [block1, block2, block4]
          }
        }
      }
    })
  })

  it('CHAIN_UPDATED adds chain to state if not present', () => {
    const action = actionCreators.selectChain(chainAlias)
    const result = reducer(initialState, action)

    assertExpectedState(result, {
      expectedStateChange: {
        chains: {
          [chainAlias]: {
            chainAlias,
            interbit: {},
            blocks: [],
            state: {}
          }
        },
        selectedChain: chainAlias
      }
    })
  })

  it('SELECT_CHAIN updates selectedChain', () => {
    const startState = Immutable.from({
      chains: {
        [chainAlias]: {
          chainAlias,
          interbit: { chainId },
          blocks: [],
          state: { ramen: ['noodles', 'soup', 'love'] }
        }
      }
    })
    const action = actionCreators.selectChain(chainAlias)
    const result = reducer(startState, action)

    assertExpectedState(result, {
      startState,
      expectedStateChange: { selectedChain: chainAlias }
    })
  })

  it('SELECT_BLOCK updates selectedBlockHash', () => {
    const value = '1234'
    const action = actionCreators.selectBlock(value)
    const result = reducer(initialState, action)

    assertExpectedState(result, {
      expectedStateChange: { selectedBlockHash: value }
    })
  })

  it('SHOW_RAW_STATE updates showRawState', () => {
    const value = true
    const action = actionCreators.showRawState(value)
    const result = reducer(initialState, action)

    assertExpectedState(result, {
      expectedStateChange: { showRawState: value }
    })
  })
})

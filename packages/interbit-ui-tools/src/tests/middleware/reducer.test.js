const assert = require('assert')

const { actionCreators, initialState, reducer } = require('../../middleware')

describe('middleware.reducer', () => {
  const chainAlias = 'myChain'
  const chainId = '123456'

  const assertExpectedState = (
    state,
    {
      startState = initialState,
      expectedEndState,
      expectedStateChange = {},
      assertion = assert.deepStrictEqual
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
    assert.strictEqual(state, expectedState)
  }

  it('no args call returns initial state', () => {
    const result = reducer()
    assertUnchangedState(result, initialState)
  })

  it('undefined action has no effect', () => {
    const action = undefined
    const result = reducer(initialState, action)
    assertUnchangedState(result, initialState)
  })

  it('unknown action has no effect', () => {
    const action = { type: 'UNKNOWN', payload: 42 }
    const result = reducer(initialState, action)
    assertUnchangedState(result, initialState)
  })

  it('adds more than one chain to state', () => {
    const chainAlias1 = 'first'
    const chainState1 = { cat: 'meow' }
    const action1 = actionCreators.chainUpdated(chainAlias1, chainState1)
    const intermediateState = reducer(initialState, action1)

    const chainAlias2 = 'second'
    const chainState2 = { bun: 'bao' }
    const action2 = actionCreators.chainUpdated(chainAlias2, chainState2)
    const result = reducer(intermediateState, action2)

    assert.deepStrictEqual(result.chains[chainAlias1], chainState1)
    assert.deepStrictEqual(result.chains[chainAlias2], chainState2)
  })

  it('updates existing chain state', () => {
    const chainState1 = { ramen: 'meh' }
    const action1 = actionCreators.chainUpdated(chainAlias, chainState1)
    const intermediateState = reducer(initialState, action1)

    assertExpectedState(intermediateState, {
      expectedStateChange: { chains: { [chainAlias]: chainState1 } }
    })

    const chainState2 = { ramen: ['noodles', 'soup', 'love'] }
    const action2 = actionCreators.chainUpdated(chainAlias, chainState2)
    const result = reducer(intermediateState, action2)

    assertExpectedState(result, {
      startState: intermediateState,
      expectedStateChange: { chains: { [chainAlias]: chainState2 } }
    })
  })

  it('interbitStatus updates status', () => {
    const action = actionCreators.interbitStatus('REALLY_BAD')
    const expectedStateChange = {
      status: 'REALLY_BAD'
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('interbitLoading updates status', () => {
    const action = actionCreators.interbitLoading()
    const expectedStateChange = {
      status: 'LOADING'
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('interbitLoaded updates status and version', () => {
    const action = actionCreators.interbitLoaded('0.14.0')
    const expectedStateChange = {
      status: 'LOADED',
      version: '0.14.0'
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('interbitReady updates status', () => {
    const action = actionCreators.interbitReady()
    const expectedStateChange = {
      status: 'READY'
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('interbitError updates status and error', () => {
    const error = { message: 'Something went wrong' }
    const action = actionCreators.interbitError(error)
    const expectedStateChange = {
      status: 'ERROR',
      error
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('interbitPublicKey updates the public key', () => {
    const publicKey = '1234567890'
    const action = actionCreators.interbitPublicKey(publicKey)
    const expectedStateChange = {
      publicKey
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('initialConfig updates configuration properties', () => {
    const config = {
      peers: ['localhost:8080', 'remote.com'],
      chainData: { [chainAlias]: { chainId, status: 'PENDING' } }
    }
    const action = actionCreators.initialConfig(config)
    const expectedStateChange = config
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainStatus updates chain status', () => {
    const action = actionCreators.chainStatus({
      chainAlias,
      status: 'REALLY_BAD'
    })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'REALLY_BAD' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainLoading updates chain status', () => {
    const action = actionCreators.chainLoading({
      chainAlias
    })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'LOADING' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainSponsoring updates chain status', () => {
    const action = actionCreators.chainSponsoring({
      chainAlias
    })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'SPONSORING' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainGenesis updates chain status and error', () => {
    const genesisBlock = { blockHash: chainId }
    const action = actionCreators.chainGenesis({
      chainAlias,
      chainId,
      genesisBlock
    })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'GENESIS', chainId, genesisBlock } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainLoaded updates chain ID and chain status', () => {
    const action = actionCreators.chainLoaded({
      chainAlias,
      chainId
    })
    const expectedStateChange = {
      chainData: { [chainAlias]: { chainId, status: 'LOADED' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainSubscribed updates chain state and chain status', () => {
    const chainState = { thingy: 'wotsit' }
    const action = actionCreators.chainSubscribed(chainAlias, chainState)
    const expectedStateChange = {
      chains: { [chainAlias]: chainState },
      chainData: { [chainAlias]: { status: 'SUBSCRIBED' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainBlocking updates chain status', () => {
    const startState = initialState.merge({
      chains: { [chainAlias]: { thingy: 'wotsit' } },
      chainData: { [chainAlias]: { chainId, status: 'SUBSCRIBED' } }
    })
    const action = actionCreators.chainBlocking({ chainAlias })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'BLOCKING' } }
    }
    const result = reducer(startState, action)
    assertExpectedState(result, { startState, expectedStateChange })
  })

  it('chainUnloading updates chain status', () => {
    const action = actionCreators.chainUnloading({
      chainAlias
    })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'UNLOADING' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainUnsubscribed updates chain status', () => {
    const action = actionCreators.chainUnsubscribed(chainAlias)
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'UNSUBSCRIBED' } }
    }
    const result = reducer(initialState, action)
    assertExpectedState(result, { expectedStateChange })
  })

  it('chainUnloaded updates chain status and removes chain state', () => {
    const startState = initialState.merge({
      chains: { [chainAlias]: { thingy: 'wotsit' } },
      chainData: { [chainAlias]: { chainId, status: 'UNLOADING' } }
    })
    const expectedEndState = initialState.merge({
      chains: {},
      chainData: { [chainAlias]: { chainId, status: 'UNLOADED' } }
    })
    const action = actionCreators.chainUnloaded({ chainAlias })
    const result = reducer(startState, action)
    assertExpectedState(result, {
      startState,
      expectedEndState
    })
  })

  it('chainError updates chain status and error', () => {
    const error = { message: 'Something went wrong' }
    const startState = initialState.merge({
      chains: { [chainAlias]: { thingy: 'wotsit' } },
      chainData: { [chainAlias]: { chainId, status: 'SUBSCRIBED' } }
    })
    const action = actionCreators.chainError({ chainAlias, error })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'ERROR', error } }
    }
    const result = reducer(startState, action)
    assertExpectedState(result, { startState, expectedStateChange })
  })

  it('chainDeleting updates chain status', () => {
    const startState = initialState.merge({
      chains: { [chainAlias]: { thingy: 'wotsit' } },
      chainData: { [chainAlias]: { chainId, status: 'BLOCKING' } }
    })
    const action = actionCreators.chainDeleting({ chainAlias, chainId })
    const expectedStateChange = {
      chainData: { [chainAlias]: { status: 'DELETING' } }
    }
    const result = reducer(startState, action)
    assertExpectedState(result, { startState, expectedStateChange })
  })

  it('chainDeleted removes all chain data', () => {
    const initialStateWithChains = initialState.merge({
      chains: {},
      chainData: {}
    })
    const startState = initialState.merge({
      chains: { [chainAlias]: { thingy: 'wotsit' } },
      chainData: { [chainAlias]: { chainId, status: 'DELETING' } }
    })
    const action = actionCreators.chainDeleted({ chainAlias, chainId })
    const result = reducer(startState, action)
    assertExpectedState(result, {
      startState,
      expectedEndState: initialStateWithChains
    })
  })

  it('chainDispatch is not processed by the reducer', () => {
    const chainAction = {
      type: 'CHAIN_ACTION',
      payload: { ramen: 'meh' }
    }
    const action = actionCreators.chainDispatch(chainAlias, chainAction)
    const result = reducer(initialState, action)
    assertUnchangedState(result, initialState)
  })
})

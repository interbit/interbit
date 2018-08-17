const assert = require('assert')
const Immutable = require('seamless-immutable')
const { createStore, combineReducers, applyMiddleware } = require('redux')

const {
  createMiddleware,
  reducer,
  actionCreators
} = require('../../middleware')

const PUBLIC = 'mockPublicChain'
const PRIVATE = 'mockPrivateChain'
const SOME_OTHER = 'someOtherChain'

const CHAIN_IDS = {
  PUBLIC: '345678...',
  PRIVATE: '123456...',
  OTHER_DEVICE: '876543...',
  SOME_OTHER: '567890...'
}

const MIDDLEWARE_PARAMS = {
  NONE: {},
  PUBLIC_ONLY: {
    publicChainAlias: PUBLIC
  },
  PUBLIC_AND_PRIVATE: {
    publicChainAlias: PUBLIC,
    privateChainAlias: PRIVATE
  }
}
const chainAlias = PRIVATE

const chainId = CHAIN_IDS.PRIVATE
const chainState = { thingy: 'wotsit', interbit: { chainId } }
const genesisBlock = { blockHash: chainId }
const block = {
  actions: [{ type: 'DO_STUFF', payload: 42 }],
  blockHash: '1234'
}
const publicKey = '1234567890...'
const version = '0.14.0'
const error = { message: 'Something went wrong' }
const config = {
  peers: ['localhost:8080', 'remote.com'],
  chainData: { [chainAlias]: { chainId, status: 'PENDING' } }
}

const instrumentedStore = (params = MIDDLEWARE_PARAMS.PUBLIC_ONLY) => {
  const actions = []
  const stateAfterActions = []
  const chainActions = []

  const resetSpy = () => {
    actions.length = 0
    stateAfterActions.length = 0
    chainActions.length = 0
  }

  const chains = {}
  const subscribers = []
  const blockSubscribers = []

  const mockChain = {
    getState: () => chainState,
    getCurrentBlock: () => block,
    subscribe: callback => {
      subscribers.push(callback)
    },
    blockSubscribe: callback => {
      blockSubscribers.push(callback)
    },
    dispatch: action => {
      chainActions.push(action)
    }
  }
  const mockCli = {
    getChain: () => mockChain
  }
  const mockContext = {
    getInterbit: () => ({ cli: mockCli, chains })
  }

  const reducers = combineReducers({
    interbit: reducer
  })

  const interbitMiddleware = createMiddleware(params, mockContext)

  const spyMiddleware = store => next => action => {
    actions.push(action)
    const result = next(action)
    stateAfterActions.push(Immutable.from(store.getState()))
    return result
  }

  const store = createStore(
    reducers,
    applyMiddleware(interbitMiddleware, spyMiddleware)
  )

  const notifySubscribers = () =>
    subscribers.forEach(callback => {
      callback()
    })

  const notifyBlockSubscribers = () =>
    blockSubscribers.forEach(callback => {
      callback()
    })

  return {
    initialState: Immutable.from(store.getState()),
    actions,
    stateAfterActions,
    chainActions,
    dispatch: store.dispatch,
    resetSpy,
    simulateChainStateChange: notifySubscribers,
    simulateNewBlock: notifyBlockSubscribers
  }
}

describe('middleware', () => {
  const nonMiddlewareActions = [
    {
      action: { type: 'UNKNOWN', payload: 42 },
      stateChange: {}
    },
    {
      action: actionCreators.initialConfig(config),
      stateChange: config
    },
    {
      action: actionCreators.interbitStatus('REALLY_BAD'),
      stateChange: { status: 'REALLY_BAD' }
    },
    {
      action: actionCreators.interbitLoading(),
      stateChange: { status: 'LOADING' }
    },
    {
      action: actionCreators.interbitLoaded(version),
      stateChange: { status: 'LOADED', version }
    },
    {
      action: actionCreators.interbitReady(),
      stateChange: { status: 'READY' }
    },
    {
      action: actionCreators.interbitError(error),
      stateChange: { status: 'ERROR', error }
    },
    {
      action: actionCreators.interbitPublicKey(publicKey),
      stateChange: { publicKey }
    },
    {
      action: actionCreators.loadInterbitSaga(),
      stateChange: {}
    },
    {
      action: actionCreators.staticChainsSaga(),
      stateChange: {}
    },
    {
      action: actionCreators.sponsorChainSaga({
        chainAlias: PRIVATE,
        publicChainAlias: PUBLIC
      }),
      stateChange: {}
    },
    {
      action: actionCreators.chainStatus({ chainAlias, status: 'REALLY_BAD' }),
      stateChange: { chainData: { [chainAlias]: { status: 'REALLY_BAD' } } }
    },
    {
      action: actionCreators.chainLoading({ chainAlias }),
      stateChange: { chainData: { [chainAlias]: { status: 'LOADING' } } }
    },
    {
      action: actionCreators.chainSponsoring({ chainAlias }),
      stateChange: { chainData: { [chainAlias]: { status: 'SPONSORING' } } }
    },
    {
      action: actionCreators.chainGenesis({
        chainAlias,
        chainId,
        genesisBlock
      }),
      stateChange: {
        chainData: {
          [chainAlias]: { status: 'GENESIS', chainId, genesisBlock }
        }
      }
    },
    {
      action: actionCreators.chainSubscribed(chainAlias, chainState),
      stateChange: {
        chains: { [chainAlias]: chainState },
        chainData: { [chainAlias]: { status: 'SUBSCRIBED' } }
      }
    },
    {
      action: actionCreators.chainUpdated(chainAlias, chainState),
      stateChange: {
        chains: { [chainAlias]: chainState }
      }
    },
    {
      action: actionCreators.chainBlockAdded(chainAlias, block),
      stateChange: {}
    },
    {
      action: actionCreators.chainBlocking({ chainAlias }),
      stateChange: {
        chainData: { [chainAlias]: { status: 'BLOCKING' } }
      }
    },
    {
      action: actionCreators.chainDeleting({ chainAlias, chainId }),
      stateChange: {
        chainData: { [chainAlias]: { chainId, status: 'DELETING' } }
      }
    },
    {
      action: actionCreators.chainError({ chainAlias, error }),
      stateChange: { chainData: { [chainAlias]: { status: 'ERROR', error } } }
    }
  ]

  nonMiddlewareActions.forEach(testCase => {
    const { action, stateChange } = testCase
    it(`action is passed on to the reducer: ${action.type})`, () => {
      const store = instrumentedStore()
      store.dispatch(action)
      assert.deepStrictEqual(store.actions, [action])

      const expectedState = store.initialState.merge(
        { interbit: stateChange },
        { deep: true }
      )

      assert.deepStrictEqual(expectedState, store.stateAfterActions[0])
    })
  })

  it('PRIVATE_CHAIN_SAGA is dispatched when public chain blocks', () => {
    const store = instrumentedStore(MIDDLEWARE_PARAMS.PUBLIC_AND_PRIVATE)

    const chainBlockingAction = actionCreators.chainBlocking({
      chainAlias: PUBLIC
    })
    store.dispatch(chainBlockingAction)

    assert.deepStrictEqual(store.actions, [
      chainBlockingAction,
      {
        type: 'interbit-middleware/PRIVATE_CHAIN_SAGA',
        payload: {
          publicChainAlias: PUBLIC,
          privateChainAlias: PRIVATE,
          sponsoredChainId: undefined,
          privateChainId: undefined
        }
      }
    ])
  })

  it('PRIVATE_CHAIN_SAGA for other device chain is dispatched when public chain blocks', () => {
    const sponsoredChainId = CHAIN_IDS.PRIVATE
    const privateChainId = CHAIN_IDS.OTHER_DEVICE
    const store = instrumentedStore({
      ...MIDDLEWARE_PARAMS.PUBLIC_AND_PRIVATE,
      sponsoredChainId,
      privateChainId
    })

    const chainBlockingAction = actionCreators.chainBlocking({
      chainAlias: PUBLIC
    })
    store.dispatch(chainBlockingAction)

    assert.deepStrictEqual(store.actions, [
      chainBlockingAction,
      {
        type: 'interbit-middleware/PRIVATE_CHAIN_SAGA',
        payload: {
          publicChainAlias: PUBLIC,
          privateChainAlias: PRIVATE,
          sponsoredChainId,
          privateChainId
        }
      }
    ])
  })

  it('PRIVATE_CHAIN_SAGA is not dispatched if private chain alias is not provided', () => {
    const store = instrumentedStore(MIDDLEWARE_PARAMS.PUBLIC_ONLY)

    const chainBlockingAction = actionCreators.chainBlocking({
      chainAlias: PUBLIC
    })
    store.dispatch(chainBlockingAction)

    assert.deepStrictEqual(store.actions, [chainBlockingAction])
  })

  it('CHAIN_LOADED causes CHAIN_SUBSCRIBE action', () => {
    const store = instrumentedStore()

    const chainLoadedAction = actionCreators.chainLoaded({
      chainAlias,
      chainId
    })
    store.dispatch(chainLoadedAction)

    assert.deepStrictEqual(store.actions, [
      {
        type: 'interbit-middleware/CHAIN_SUBSCRIBE',
        payload: { chainAlias, chainState }
      },
      chainLoadedAction
    ])
  })

  it('CHAIN_LOADED sets up callback to dispatch CHAIN_UPDATED actions', () => {
    const store = instrumentedStore()

    store.dispatch(
      actionCreators.chainLoaded({
        chainAlias,
        chainId
      })
    )

    store.resetSpy()

    store.simulateChainStateChange()

    assert.deepStrictEqual(store.actions, [
      {
        type: 'interbit-middleware/CHAIN_UPDATED',
        payload: { chainAlias, chainState }
      }
    ])
  })

  it('CHAIN_LOADED sets up callback to dispatch CHAIN_BLOCK_ADDED actions', () => {
    const store = instrumentedStore()

    store.dispatch(
      actionCreators.chainLoaded({
        chainAlias,
        chainId
      })
    )

    store.resetSpy()

    store.simulateNewBlock()

    assert.deepStrictEqual(store.actions, [
      {
        type: 'interbit-middleware/CHAIN_BLOCK_ADDED',
        payload: { chainAlias, newBlock: block }
      }
    ])
  })

  it('CHAIN_DISPATCH buffers chain actions until chain blocks', () => {
    const store = instrumentedStore()

    store.dispatch(
      actionCreators.chainLoaded({
        chainAlias,
        chainId
      })
    )

    store.dispatch(
      actionCreators.chainLoaded({
        chainAlias: SOME_OTHER,
        chainId: CHAIN_IDS.SOME_OTHER
      })
    )

    store.resetSpy()

    const chainAction1 = {
      type: 'CHAIN_ACTION',
      payload: { ramen: 'meh' }
    }
    const chainDispatchAction1 = actionCreators.chainDispatch(
      chainAlias,
      chainAction1
    )
    store.dispatch(chainDispatchAction1)

    const otherChainAction = {
      type: 'CHAIN_ACTION',
      payload: { tofu: 'blah' }
    }
    const otherChainDispatchAction = actionCreators.chainDispatch(
      SOME_OTHER,
      otherChainAction
    )
    store.dispatch(otherChainDispatchAction)

    const chainAction2 = {
      type: 'CHAIN_ACTION',
      payload: { ramen: ['noodles', 'soup', 'love'] }
    }
    const chainDispatchAction2 = actionCreators.chainDispatch(
      chainAlias,
      chainAction2
    )
    store.dispatch(chainDispatchAction2)

    assert.deepStrictEqual(store.actions, [])
    assert.deepStrictEqual(store.chainActions, [])

    const chainBlockingAction = actionCreators.chainBlocking({
      chainAlias
    })
    store.dispatch(chainBlockingAction)

    assert.deepStrictEqual(store.actions, [chainBlockingAction])
    assert.deepStrictEqual(store.chainActions, [chainAction1, chainAction2])
  })

  it('CHAIN_DISPATCH dispatches chain actions to blocking chain', () => {
    const store = instrumentedStore()

    store.dispatch(
      actionCreators.chainLoaded({
        chainAlias,
        chainId
      })
    )

    store.dispatch(
      actionCreators.chainBlocking({
        chainAlias
      })
    )

    store.resetSpy()

    const chainAction1 = {
      type: 'CHAIN_ACTION',
      payload: { ramen: 'meh' }
    }
    store.dispatch(actionCreators.chainDispatch(chainAlias, chainAction1))

    const chainAction2 = {
      type: 'CHAIN_ACTION',
      payload: { ramen: ['noodles', 'soup', 'love'] }
    }
    store.dispatch(actionCreators.chainDispatch(chainAlias, chainAction2))

    assert.deepStrictEqual(store.actions, [])
    assert.deepStrictEqual(store.chainActions, [chainAction1, chainAction2])
  })
})

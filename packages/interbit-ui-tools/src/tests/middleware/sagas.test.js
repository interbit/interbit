const { combineReducers } = require('redux')
const { expectSaga } = require('redux-saga-test-plan')
const Immutable = require('seamless-immutable')

const { middlewareSagas } = require('../../middleware/sagas')
const { actionTypes, reducer } = require('../../middleware')
const { CHAIN_STATUS, INTERBIT_STATUS } = require('../../middleware/constants')

const CHAIN_ALIAS_1 = 'public'
const CHAIN_ID_1 = '323423h23g4234e2329e3592040f87a60...'
const CHAIN_ALIAS_2 = 'githubOauth'
const CHAIN_ID_2 = '044625fa3898cc55fc22243b329e35920...'
const PEER1 = 'myapp.com:443'
const PEER2 = 'buffer.myapp.com:5050'
const PEER3 = 'us-west.iws.interbit.io'

describe('middleware sagas', () => {
  describe('rootSaga', () => {
    const chains = {}
    const configNoChains = {
      chainData: {},
      peers: [PEER1, PEER2, PEER3]
    }
    const configWithChains = {
      ...configNoChains,
      chainData: {
        [CHAIN_ALIAS_1]: {
          chainId: CHAIN_ID_1,
          status: CHAIN_STATUS.PENDING
        },
        [CHAIN_ALIAS_2]: {
          chainId: CHAIN_ID_2,
          status: CHAIN_STATUS.PENDING
        }
      }
    }
    const publicKey = 'UsersPublicKey...'
    const VERSION = '0.14.0'
    const mockChain = {
      blockSubscribe: callback => {
        setTimeout(callback, 50)
        return () => {}
      }
    }
    const mockCli = {
      loadChain: () => mockChain,
      connect: () => {}
    }
    const mockInterbit = {
      VERSION
    }
    const interbitContext = {
      interbit: mockInterbit,
      publicKey,
      cli: mockCli,
      chains
    }
    const mockContext = {
      getConfig: () => configWithChains,
      getDefaultPort: () => 5000,
      isInterbitLoaded: () => true,
      getInterbit: () => interbitContext,
      waitForInterbit: async () => interbitContext
    }

    const reducers = combineReducers({
      interbit: reducer
    })

    it('If interbit is loaded, dispatch STATIC_CHAINS_SAGA action', async () => {
      const { rootSaga } = middlewareSagas(mockContext)
      await expectSaga(rootSaga)
        .withReducer(reducers)
        .put.like({
          action: { type: actionTypes.INTERBIT_READY }
        })
        .put.like({
          action: { type: actionTypes.STATIC_CHAINS_SAGA }
        })
        .not.put.like({
          action: {
            type: actionTypes.INTERBIT_ERROR
          }
        })
        .not.put.like({
          action: {
            type: actionTypes.CHAIN_ERROR
          }
        })
        .run()
    })

    it('If interbit is not loaded, connect to interbit and dispatch STATIC_CHAINS_SAGA action', async () => {
      const unconnectedContext = {
        ...mockContext,
        isInterbitLoaded: () => false
      }
      const { rootSaga } = middlewareSagas(unconnectedContext)
      await expectSaga(rootSaga)
        .withReducer(reducers)
        .put.like({
          action: {
            type: actionTypes.INITIAL_CONFIG,
            payload: configWithChains
          }
        })
        .put.like({
          action: { type: actionTypes.INTERBIT_LOADING }
        })
        .put.like({
          action: {
            type: actionTypes.INTERBIT_PUBLIC_KEY,
            payload: { publicKey }
          }
        })
        .put.like({
          action: {
            type: actionTypes.INTERBIT_LOADED,
            payload: { version: VERSION }
          }
        })
        .put.like({
          action: { type: actionTypes.INTERBIT_READY }
        })
        .put.like({
          action: { type: actionTypes.STATIC_CHAINS_SAGA }
        })
        .not.put.like({
          action: {
            type: actionTypes.INTERBIT_ERROR
          }
        })
        .not.put.like({
          action: {
            type: actionTypes.CHAIN_ERROR
          }
        })
        .run()
    })

    it('If loading interbit throws, dispatch INTERBIT_ERROR action', async () => {
      const errorMessage = 'interbit is unavailable today'
      const failingContext = {
        ...mockContext,
        isInterbitLoaded: () => false,
        waitForInterbit: async () => {
          throw new Error(errorMessage)
        }
      }
      const { rootSaga } = middlewareSagas(failingContext)
      await expectSaga(rootSaga)
        .withReducer(reducers)
        .put.like({
          action: {
            type: actionTypes.INITIAL_CONFIG,
            payload: configWithChains
          }
        })
        .put.like({
          action: { type: actionTypes.INTERBIT_LOADING }
        })
        .put.like({
          action: {
            type: actionTypes.INTERBIT_ERROR,
            payload: { error: errorMessage }
          }
        })
        .not.put.like({
          action: { type: actionTypes.STATIC_CHAINS_SAGA }
        })
        .run()
    })

    it('If no static chains are configured, no problem', async () => {
      const stateAfterConfig = Immutable.from({
        ...configNoChains,
        status: INTERBIT_STATUS.INTERBIT_READY
      })
      const { staticChainsSaga } = middlewareSagas(mockContext)
      await expectSaga(staticChainsSaga)
        .withReducer(reducers, {
          interbit: stateAfterConfig
        })
        .not.put.like({
          action: {
            type: actionTypes.INTERBIT_ERROR
          }
        })
        .not.put.like({
          action: {
            type: actionTypes.CHAIN_ERROR
          }
        })
        .run()
    })

    it('If static chains are configured, load them', async () => {
      const stateAfterConfig = Immutable.from({
        ...configWithChains,
        status: INTERBIT_STATUS.INTERBIT_READY
      })
      const { staticChainsSaga } = middlewareSagas(mockContext)
      await expectSaga(staticChainsSaga)
        .withReducer(reducers, {
          interbit: stateAfterConfig
        })
        .put.like({
          action: {
            type: actionTypes.CHAIN_LOADING,
            payload: { chainAlias: CHAIN_ALIAS_1 }
          }
        })
        .put.like({
          action: {
            type: actionTypes.CHAIN_LOADED,
            payload: { chainAlias: CHAIN_ALIAS_1, chainId: CHAIN_ID_1 }
          }
        })
        .put.like({
          action: {
            type: actionTypes.CHAIN_BLOCKING,
            payload: { chainAlias: CHAIN_ALIAS_1 }
          }
        })
        .put.like({
          action: {
            type: actionTypes.CHAIN_LOADING,
            payload: { chainAlias: CHAIN_ALIAS_2 }
          }
        })
        .put.like({
          action: {
            type: actionTypes.CHAIN_LOADED,
            payload: { chainAlias: CHAIN_ALIAS_2, chainId: CHAIN_ID_2 }
          }
        })
        .put.like({
          action: {
            type: actionTypes.CHAIN_BLOCKING,
            payload: { chainAlias: CHAIN_ALIAS_2 }
          }
        })
        .not.put.like({
          action: {
            type: actionTypes.CHAIN_ERROR
          }
        })
        .run()
    })
  })
})

const { combineReducers } = require('redux')
const { expectSaga } = require('redux-saga-test-plan')
const Immutable = require('seamless-immutable')

const { middlewareSagas } = require('../../middleware/sagas')
const { actionTypes, actionCreators, reducer } = require('../../middleware')
const { CHAIN_STATUS, SPONSOR_CONFIG } = require('../../middleware/constants')

const PUBLIC_CHAIN_ALIAS = 'public'
const PUBLIC_CHAIN_ID = '323423h23g4234e2329e3592040f87a60...'

const PRIVATE_CHAIN_ALIAS = 'private'
const PRIVATE_CHAIN_ID = '22243b329e35920044625fa3898cc55fc...'
const PRIVATE_CHAIN_COVENANT_HASH = '0044625fa22243b329e35923898cc55fc...'

const STATIC_CHAIN_ALIAS = 'githubOauth'
const STATIC_CHAIN_ID = '044625fa3898cc55fc22243b329e35920...'

const PEER1 = 'myapp.com:443'
const PEER2 = 'buffer.myapp.com:5050'
const PEER3 = 'us-west.iws.interbit.io'

const PUBLIC_KEY = 'UsersPublicKey...'
const BLOCK_MASTER = 'BlockMasterKey...'

const VERSION = '0.14.0'

const configWithoutStaticChains = {
  chainData: {},
  peers: [PEER1, PEER2, PEER3]
}

const configWithPublicChain = {
  ...configWithoutStaticChains,
  chainData: {
    [PUBLIC_CHAIN_ALIAS]: {
      chainId: PUBLIC_CHAIN_ID,
      status: CHAIN_STATUS.PENDING
    }
  }
}

const configWithStaticChains = {
  ...configWithoutStaticChains,
  chainData: {
    [PUBLIC_CHAIN_ALIAS]: {
      chainId: PUBLIC_CHAIN_ID,
      status: CHAIN_STATUS.PENDING
    },
    [STATIC_CHAIN_ALIAS]: {
      chainId: STATIC_CHAIN_ID,
      status: CHAIN_STATUS.PENDING
    }
  }
}

const privateChainIdInLocalStorage = {
  [`chainId-${PRIVATE_CHAIN_ALIAS}-${PUBLIC_CHAIN_ID}`]: PRIVATE_CHAIN_ID
}

const mockDataStore = (content = {}) => {
  const datastore = { ...content }
  return {
    getItem: key => datastore[key],
    setItem: (key, value) => {
      datastore[key] = value
    },
    removeItem: key => {
      delete datastore[key]
    },
    keys: () => Object.keys(datastore)
  }
}

const mockContext = ({
  config = configWithPublicChain,
  defaultPort = 5000,
  isInterbitLoaded = false,
  dataStoreContent = {},
  genesisBlockHash = PRIVATE_CHAIN_ID
} = {}) => {
  const mockInterbit = {
    VERSION,
    createDefaultSponsoredChainConfig: params => ({ ...params }),
    createGenesisBlock: params => ({ ...params, blockHash: genesisBlockHash })
  }

  const simulateFirstBlock = callback => {
    setTimeout(callback, 50)
    return () => {}
  }

  const mockChain = chainId => ({
    getState: () =>
      Immutable.from({
        interbit: {
          chainId,
          config: { acl: { roles: { root: [PUBLIC_KEY] } } }
        }
      }),
    blockSubscribe: simulateFirstBlock
  })

  const mockCli = {
    loadChain: chainId => mockChain(chainId),
    destroyChain: () => {},
    removeChain: () => {},
    connect: () => {},
    sendChainToSponsor: () => {}
  }

  const interbitContext = {
    interbit: mockInterbit,
    publicKey: PUBLIC_KEY,
    cli: mockCli,
    chains: {},
    localDataStore: mockDataStore(dataStoreContent)
  }

  return {
    getConfig: () => config,
    getDefaultPort: () => defaultPort,
    isInterbitLoaded: () => isInterbitLoaded,
    getInterbit: () => {
      if (!isInterbitLoaded) {
        throw new Error('interbit is not available')
      }
      return interbitContext
    },
    waitForInterbit: async () => interbitContext
  }
}

const reducers = combineReducers({
  interbit: reducer
})

describe('middleware sagas', () => {
  it('If interbit is loaded, dispatch STATIC_CHAINS_SAGA action', async () => {
    const connectedContext = mockContext({
      isInterbitLoaded: true
    })
    const { rootSaga } = middlewareSagas(connectedContext)
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .put.like({
        action: { type: actionTypes.INTERBIT_READY }
      })
      .put.like({
        action: { type: actionTypes.STATIC_CHAINS_SAGA }
      })
      .not.put.like({
        action: { type: actionTypes.INTERBIT_LOADING }
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
    const unconnectedContext = mockContext({
      isInterbitLoaded: false
    })
    const { rootSaga } = middlewareSagas(unconnectedContext)
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .put.like({
        action: {
          type: actionTypes.INITIAL_CONFIG,
          payload: configWithPublicChain
        }
      })
      .put.like({
        action: { type: actionTypes.INTERBIT_LOADING }
      })
      .put.like({
        action: {
          type: actionTypes.INTERBIT_PUBLIC_KEY,
          payload: { publicKey: PUBLIC_KEY }
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
      ...mockContext({ isInterbitLoaded: false }),
      waitForInterbit: async () => {
        throw new Error(errorMessage)
      }
    }
    const { rootSaga } = middlewareSagas(failingContext)
    await expectSaga(rootSaga)
      .withReducer(reducers)
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
    const contextWithoutStaticChains = mockContext({
      config: configWithoutStaticChains
    })
    const { rootSaga } = middlewareSagas(contextWithoutStaticChains)
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .put.like({
        action: {
          type: actionTypes.INITIAL_CONFIG,
          payload: configWithoutStaticChains
        }
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
          type: actionTypes.CHAIN_LOADING
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
    const contextWithStaticChains = mockContext({
      config: configWithStaticChains
    })
    const { rootSaga } = middlewareSagas(contextWithStaticChains)
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .put.like({
        action: {
          type: actionTypes.INITIAL_CONFIG,
          payload: configWithStaticChains
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: PUBLIC_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: PUBLIC_CHAIN_ALIAS,
            chainId: PUBLIC_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: PUBLIC_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: STATIC_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: STATIC_CHAIN_ALIAS,
            chainId: STATIC_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: STATIC_CHAIN_ALIAS }
        }
      })
      .not.put.like({
        action: {
          type: actionTypes.CHAIN_ERROR
        }
      })
      .run()
  })

  it('If public chain is blocking and private chain ID in local storage, load the chain', async () => {
    const contextWithChainIdInLocalStorage = mockContext({
      dataStoreContent: privateChainIdInLocalStorage
    })
    const { rootSaga } = middlewareSagas(contextWithChainIdInLocalStorage)
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .dispatch(
        actionCreators.chainUpdated(PUBLIC_CHAIN_ALIAS, {
          interbit: { chainId: PUBLIC_CHAIN_ID }
        })
      )
      .dispatch(
        actionCreators.privateChainSaga({
          publicChainAlias: PUBLIC_CHAIN_ALIAS,
          privateChainAlias: PRIVATE_CHAIN_ALIAS
        })
      )
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: PRIVATE_CHAIN_ALIAS,
            chainId: PRIVATE_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .not.put.like({
        action: {
          type: actionTypes.CHAIN_ERROR
        }
      })
      .run()
  })

  it('If public chain has sponsorship config and private chain ID not in local storage, sponsor a new private chain', async () => {
    const { rootSaga } = middlewareSagas(mockContext())
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .dispatch(
        actionCreators.chainUpdated(PUBLIC_CHAIN_ALIAS, {
          interbit: { chainId: PUBLIC_CHAIN_ID },
          [SPONSOR_CONFIG]: {
            [PRIVATE_CHAIN_ALIAS]: {
              blockMaster: BLOCK_MASTER,
              sponsorChainId: STATIC_CHAIN_ID,
              covenantHash: PRIVATE_CHAIN_COVENANT_HASH
            }
          }
        })
      )
      .dispatch(
        actionCreators.privateChainSaga({
          publicChainAlias: PUBLIC_CHAIN_ALIAS,
          privateChainAlias: PRIVATE_CHAIN_ALIAS
        })
      )
      .put.like({
        action: {
          type: actionTypes.CHAIN_SPONSORING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_GENESIS,
          payload: {
            chainAlias: PRIVATE_CHAIN_ALIAS,
            chainId: PRIVATE_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: PRIVATE_CHAIN_ALIAS,
            chainId: PRIVATE_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .not.put.like({
        action: {
          type: actionTypes.CHAIN_ERROR
        }
      })
      .run()
  })

  it('Switch private chains for second device support', async () => {
    const OAUTH_PRIVATE_CHAIN_ID = 'e2329e3592040f87a60323423h23g4234...'
    const contextWithChainIdInLocalStorage = mockContext({
      dataStoreContent: privateChainIdInLocalStorage
    })
    const { rootSaga } = middlewareSagas(contextWithChainIdInLocalStorage)
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .dispatch(
        actionCreators.chainUpdated(PUBLIC_CHAIN_ALIAS, {
          interbit: { chainId: PUBLIC_CHAIN_ID }
        })
      )
      .dispatch(
        actionCreators.privateChainSaga({
          publicChainAlias: PUBLIC_CHAIN_ALIAS,
          privateChainAlias: PRIVATE_CHAIN_ALIAS,
          sponsoredChainId: PRIVATE_CHAIN_ID,
          privateChainId: OAUTH_PRIVATE_CHAIN_ID
        })
      )
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: PRIVATE_CHAIN_ALIAS,
            chainId: OAUTH_PRIVATE_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: PRIVATE_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_DELETING,
          payload: {
            chainAlias: `${PRIVATE_CHAIN_ALIAS}-sponsor`,
            chainId: PRIVATE_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_DELETED,
          payload: {
            chainAlias: `${PRIVATE_CHAIN_ALIAS}-sponsor`,
            chainId: PRIVATE_CHAIN_ID
          }
        }
      })
      .not.put.like({
        action: {
          type: actionTypes.CHAIN_ERROR
        }
      })
      .run()
  })

  it('If public chain has sponsorship config, dispatch SPONSOR_CHAIN_SAGA to sponsor a new chain', async () => {
    const SPONSORED_CHAIN_ALIAS = 'application'
    const SPONSORED_CHAIN_ID = '920044625fa22243b329e353898cc55fc...'
    const SPONSORED_CHAIN_COVENANT_HASH = 'fa22243b3290044625e35923898cc55fc...'
    const { rootSaga } = middlewareSagas(
      mockContext({ genesisBlockHash: SPONSORED_CHAIN_ID })
    )
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .dispatch(
        actionCreators.chainUpdated(PUBLIC_CHAIN_ALIAS, {
          interbit: { chainId: PUBLIC_CHAIN_ID },
          [SPONSOR_CONFIG]: {
            [SPONSORED_CHAIN_ALIAS]: {
              blockMaster: BLOCK_MASTER,
              sponsorChainId: STATIC_CHAIN_ID,
              covenantHash: SPONSORED_CHAIN_COVENANT_HASH
            }
          }
        })
      )
      .dispatch(
        actionCreators.sponsorChainSaga({
          publicChainAlias: PUBLIC_CHAIN_ALIAS,
          chainAlias: SPONSORED_CHAIN_ALIAS
        })
      )
      .put.like({
        action: {
          type: actionTypes.CHAIN_SPONSORING,
          payload: { chainAlias: SPONSORED_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_GENESIS,
          payload: {
            chainAlias: SPONSORED_CHAIN_ALIAS,
            chainId: SPONSORED_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: SPONSORED_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: SPONSORED_CHAIN_ALIAS,
            chainId: SPONSORED_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: SPONSORED_CHAIN_ALIAS }
        }
      })
      .not.put.like({
        action: {
          type: actionTypes.CHAIN_ERROR
        }
      })
      .run()
  })

  it('Load another chain on demand', async () => {
    const SOME_OTHER_CHAIN_ALIAS = 'someOther'
    const SOME_OTHER_CHAIN_ID = 'a3898cc55fc22243b329e35920044625f...'
    const { rootSaga } = middlewareSagas(mockContext())
    await expectSaga(rootSaga)
      .withReducer(reducers)
      .dispatch(
        actionCreators.loadChainSaga({
          chainAlias: SOME_OTHER_CHAIN_ALIAS,
          chainId: SOME_OTHER_CHAIN_ID
        })
      )
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADING,
          payload: { chainAlias: SOME_OTHER_CHAIN_ALIAS }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_LOADED,
          payload: {
            chainAlias: SOME_OTHER_CHAIN_ALIAS,
            chainId: SOME_OTHER_CHAIN_ID
          }
        }
      })
      .put.like({
        action: {
          type: actionTypes.CHAIN_BLOCKING,
          payload: { chainAlias: SOME_OTHER_CHAIN_ALIAS }
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

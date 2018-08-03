const { LOG_PREFIX } = require('./constants')
const { actionTypes, actionCreators } = require('./actions')
const runtimeContext = require('./browser')

const createMiddleware = ({
  publicChainAlias,
  privateChainAlias,
  sponsoredChainId,
  privateChainId
} = {}) => store => {
  const blockingChains = []
  const dispatchBuffer = {}

  const isBlocking = chainAlias => blockingChains.includes(chainAlias)

  const getBufferedActions = chainAlias => dispatchBuffer[chainAlias] || []

  const clearBufferedActions = chainAlias => {
    dispatchBuffer[chainAlias] = []
  }

  const bufferAction = (chainAlias, action) => {
    if (dispatchBuffer[chainAlias]) {
      dispatchBuffer[chainAlias].push(action)
    } else {
      dispatchBuffer[chainAlias] = [action]
    }
  }

  if (publicChainAlias && privateChainAlias) {
    bufferAction(
      publicChainAlias,
      actionCreators.privateChainSaga({
        publicChainAlias,
        privateChainAlias,
        sponsoredChainId,
        privateChainId
      })
    )
  }

  return next => action => {
    switch (action.type) {
      case actionTypes.CHAIN_DISPATCH: {
        const { chainAlias, action: chainAction } = action.payload
        if (isBlocking(chainAlias)) {
          return dispatchToChain(chainAlias, chainAction)
        }

        bufferAction(chainAlias, action)
        console.warn(
          `${LOG_PREFIX}: Chain '${chainAlias}' is unavailable; action was buffered.`
        )
        return undefined
      }

      case actionTypes.CHAIN_LOADED: {
        const { chainAlias, chainId } = action.payload

        const { cli, chains } = runtimeContext.getInterbit()
        const chain = cli.getChain(chainId)

        chains[chainAlias] = chain
        subscribeToChain(store, { chainAlias, chain })

        return next(action)
      }

      case actionTypes.CHAIN_BLOCKING: {
        const result = next(action)

        const { chainAlias } = action.payload
        blockingChains.push(chainAlias)

        dispatchBufferedActions(store, getBufferedActions(chainAlias))
        clearBufferedActions(chainAlias)

        return result
      }

      default:
        return next(action)
    }
  }
}

const dispatchBufferedActions = (store, actions) =>
  actions.forEach(action => {
    if (action.type === actionTypes.CHAIN_DISPATCH) {
      const { chainAlias, action: chainAction } = action.payload
      dispatchToChain(chainAlias, chainAction)
    } else {
      store.dispatch(action)
    }
  })

const dispatchToChain = (chainAlias, action) => {
  const { chains } = runtimeContext.getInterbit()
  const chain = chains[chainAlias]

  if (typeof chain === 'undefined') {
    throw new Error(
      `${LOG_PREFIX}: Chain '${chainAlias}' is not loaded. Check your interbit.config.js file.`
    )
  }

  console.log(`${LOG_PREFIX}: dispatchToChain(): `, { chainAlias, action })
  return chain.dispatch(action)
}

const subscribeToChain = (store, { chainAlias, chain }) => {
  console.log(`${LOG_PREFIX}: Connecting chain '${chainAlias}' to store`)

  const currentState = chain.getState()

  chain.subscribe(() => {
    const appState = chain.getState()
    store.dispatch(actionCreators.chainUpdated(chainAlias, appState))
  })

  chain.blockSubscribe(() => {
    const newBlock = chain.getCurrentBlock()
    store.dispatch(actionCreators.chainBlockAdded(chainAlias, newBlock))
  })

  store.dispatch(actionCreators.chainSubscribed(chainAlias, currentState))
}

module.exports = createMiddleware

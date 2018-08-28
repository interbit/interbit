const { LOG_PREFIX } = require('./constants')
const { actionTypes, actionCreators } = require('./actions')
const browserContext = require('./browserContext')

const createMiddleware = (
  {
    publicChainAlias,
    privateChainAlias,
    sponsoredChainId,
    privateChainId
  } = {},
  runtimeContext = browserContext
) => store => {
  const blockingChains = []
  const dispatchBuffer = {}

  const isBlocking = chainAlias =>
    chainAlias && blockingChains.includes(chainAlias)

  const chainIsBlocking = chainAlias => {
    blockingChains.push(chainAlias)
  }

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

  const dispatchBufferedActions = chainAlias => {
    const actions = getBufferedActions(chainAlias)
    actions.forEach(action => {
      if (action.type === actionTypes.CHAIN_DISPATCH) {
        dispatchToChain(action)
      } else {
        store.dispatch(action)
      }
    })
    clearBufferedActions(chainAlias)
  }

  const dispatchToChain = action => {
    const { chainAlias, action: chainAction } = action.payload

    const { chains } = runtimeContext.getInterbit()
    const chain = chains[chainAlias]
    if (typeof chain === 'undefined') {
      throw new Error(
        `${LOG_PREFIX}: Chain '${chainAlias}' is not loaded. Check your interbit.config.js file.`
      )
    }
    console.log(`${LOG_PREFIX}: dispatchToChain(): `, action.payload)
    return chain.dispatch(chainAction)
  }

  const subscribeToChain = ({ chainAlias, chainId }) => {
    console.log(`${LOG_PREFIX}: Connecting chain '${chainAlias}' to store`)
    const { cli, chains } = runtimeContext.getInterbit()
    const chain = cli.getChain(chainId)
    const currentState = chain.getState()

    const unsubscribe = chain.subscribe(() => {
      const appState = chain.getState()
      store.dispatch(actionCreators.chainUpdated(chainAlias, appState))
    })

    const blockUnsubscribe = chain.blockSubscribe(() => {
      const newBlock = chain.getCurrentBlock()
      store.dispatch(actionCreators.chainBlockAdded(chainAlias, newBlock))
    })

    chains[chainAlias] = {
      ...chain,
      unsubscribe: () => {
        unsubscribe()
        blockUnsubscribe()
      }
    }

    store.dispatch(actionCreators.chainSubscribed(chainAlias, currentState))
  }

  const unsubscribeFromChain = ({ chainAlias }) => {
    console.log(`${LOG_PREFIX}: Disconnecting chain '${chainAlias}' from store`)
    const { chains } = runtimeContext.getInterbit()

    const chain = chains[chainAlias]

    if (chain && chain.unsubscribe) {
      chain.unsubscribe()
      delete chains[chainAlias]
      store.dispatch(actionCreators.chainUnsubscribed(chainAlias))
    }
  }

  const bufferActionIfChainNotBlocking = (
    chainAlias,
    action,
    actionHandler
  ) => {
    if (!chainAlias || isBlocking(chainAlias)) {
      return actionHandler(action)
    }

    bufferAction(chainAlias, action)
    console.warn(
      `${LOG_PREFIX}: Chain '${chainAlias}' is not blocking; action was buffered.`
    )
    return action
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
        const { chainAlias } = action.payload

        return bufferActionIfChainNotBlocking(
          chainAlias,
          action,
          dispatchToChain
        )
      }

      case actionTypes.CHAIN_LOADED: {
        const { chainAlias, chainId } = action.payload

        subscribeToChain({ chainAlias, chainId })

        return next(action)
      }

      case actionTypes.CHAIN_UNLOADING:
      case actionTypes.CHAIN_DELETING: {
        const result = next(action)

        const { chainAlias } = action.payload

        unsubscribeFromChain({ chainAlias })

        return result
      }

      case actionTypes.CHAIN_BLOCKING: {
        const result = next(action)

        const { chainAlias } = action.payload

        chainIsBlocking(chainAlias)
        dispatchBufferedActions(chainAlias)

        return result
      }

      case actionTypes.LOAD_CHAIN_SAGA: {
        const { dependsOnBlockingChain } = action.payload

        return bufferActionIfChainNotBlocking(
          dependsOnBlockingChain,
          action,
          next
        )
      }

      case actionTypes.PRIVATE_CHAIN_SAGA:
      case actionTypes.SPONSOR_CHAIN_SAGA: {
        const { publicChainAlias: dependsOnBlockingChain } = action.payload

        return bufferActionIfChainNotBlocking(
          dependsOnBlockingChain,
          action,
          next
        )
      }

      default:
        return next(action)
    }
  }
}

module.exports = createMiddleware

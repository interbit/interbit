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

  const isBlocking = chainAlias => blockingChains.includes(chainAlias)

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
        const { action: chainAction } = action.payload
        dispatchToChain(chainAlias, chainAction)
      } else {
        store.dispatch(action)
      }
    })
    clearBufferedActions(chainAlias)
  }

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

  const subscribeToChain = ({ chainAlias, chainId }) => {
    console.log(`${LOG_PREFIX}: Connecting chain '${chainAlias}' to store`)
    const { cli, chains } = runtimeContext.getInterbit()
    const chain = cli.getChain(chainId)
    const currentState = chain.getState()

    chains[chainAlias] = chain

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
          `${LOG_PREFIX}: Chain '${chainAlias}' is not blocking; action was buffered.`
        )
        return action
      }

      case actionTypes.CHAIN_LOADED: {
        const { chainAlias, chainId } = action.payload

        subscribeToChain({ chainAlias, chainId })

        return next(action)
      }

      case actionTypes.CHAIN_BLOCKING: {
        const result = next(action)

        const { chainAlias } = action.payload

        chainIsBlocking(chainAlias)
        dispatchBufferedActions(chainAlias)

        return result
      }

      case actionTypes.LOAD_CHAIN_SAGA:
      case actionTypes.PRIVATE_CHAIN_SAGA:
      case actionTypes.SPONSOR_CHAIN_SAGA: {
        const { dependsOnChainAlias } = action.payload
        if (!dependsOnChainAlias || isBlocking(dependsOnChainAlias)) {
          return next(action)
        }

        bufferAction(dependsOnChainAlias, action)
        console.warn(
          `${LOG_PREFIX}: Chain '${dependsOnChainAlias}' is not blocking; action was buffered.`
        )
        return action
      }

      default:
        return next(action)
    }
  }
}

module.exports = createMiddleware

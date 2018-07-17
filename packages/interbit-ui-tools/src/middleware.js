const { LOG_PREFIX } = require('./constants')
const { actionTypes, actionCreators } = require('./actions')
const { getInterbit } = require('./interbitGlobal')

const createMiddleware = ({
  publicChainAlias,
  privateChainAlias,
  sponsoredChainId,
  privateChainId
} = {}) => store => {
  const blockingChains = []
  let chainDispatchBuffer = []

  return next => action => {
    switch (action.type) {
      case actionTypes.CHAIN_BLOCKING: {
        const { chainAlias } = action.payload
        blockingChains.push(chainAlias)

        chainDispatchBuffer = dispatchBufferedActions(
          blockingChains,
          chainDispatchBuffer
        )

        if (privateChainAlias && publicChainAlias === chainAlias) {
          store.dispatch(
            actionCreators.privateChainSaga({
              publicChainAlias,
              privateChainAlias,
              sponsoredChainId,
              privateChainId
            })
          )
        }

        return next(action)
      }

      case actionTypes.CHAIN_DISPATCH: {
        const { chainAlias, action: chainAction } = action.payload
        if (blockingChains.includes(chainAlias)) {
          return dispatchToChain(chainAlias, chainAction)
        }

        console.warn(
          `${LOG_PREFIX}: Chain '${chainAlias}' is unavailable; action was buffered.`
        )
        chainDispatchBuffer.push(action.payload)
        return undefined
      }

      case actionTypes.CHAIN_LOADED: {
        const { chainAlias, chainId } = action.payload

        const { cli, chains } = getInterbit()
        const chain = cli.getChain(chainId)

        chains[chainAlias] = chain
        subscribeToChain(store, chainAlias, chain)

        return next(action)
      }

      default:
        return next(action)
    }
  }
}

const dispatchBufferedActions = (blockingChains, buffer = []) =>
  buffer.filter(payload => {
    const { chainAlias, action } = payload
    const canDispatch = blockingChains.includes(chainAlias)
    if (canDispatch) {
      dispatchToChain(chainAlias, action)
    }
    return !canDispatch
  })

const dispatchToChain = (chainAlias, action) => {
  const { chains } = getInterbit()
  const chain = chains[chainAlias]

  if (typeof chain === 'undefined') {
    throw new Error(
      `${LOG_PREFIX}: Chain '${chainAlias}' is not loaded. Check your interbit.config.js file.`
    )
  }

  console.log(`${LOG_PREFIX}: dispatchToChain(): `, { chainAlias, action })
  return chain.dispatch(action)
}

const subscribeToChain = (store, chainAlias, chain) => {
  console.log(`${LOG_PREFIX}: Connecting chain '${chainAlias}' to store`)

  const currentState = chain.getState()
  const cachedBlocks = chain.getCachedBlocks()
  let firstBlock = true

  chain.subscribe(() => {
    const appState = chain.getState()
    store.dispatch(actionCreators.chainUpdated(chainAlias, appState))
  })

  chain.blockSubscribe(() => {
    const blocks = chain.getCachedBlocks()
    store.dispatch(actionCreators.chainBlockAdded(chainAlias, blocks))

    if (firstBlock) {
      store.dispatch(actionCreators.chainBlocking(chainAlias))
      firstBlock = false
    }
  })

  store.dispatch(
    actionCreators.chainSubscribed(chainAlias, currentState, cachedBlocks)
  )
  return chain
}

module.exports = createMiddleware

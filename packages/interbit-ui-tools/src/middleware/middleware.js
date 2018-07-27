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

        const { hypervisor, cli, chains } = getInterbit()
        const chain = cli.getChain(chainId)

        chains[chainAlias] = chain
        subscribeToChain(store, { chainAlias, chain })
        detectBlocking(store, { chainAlias, chainId, hypervisor, chain })

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

const detectBlocking = (store, { chainAlias, chainId, hypervisor, chain }) => {
  console.log(`${LOG_PREFIX}: Detecting blocking on chain '${chainAlias}'`)

  const currentBlock = chain.getCurrentBlock()
  const currentBlockHeight = getBlockHeight(currentBlock)

  // Use selector to get this from the store
  const blockingTimeout = 5000
  hypervisor
    .waitForState(state => {
      const newBlockHeight = getMostRecentBlockHeight(state, chainId)
      return newBlockHeight > currentBlockHeight
    }, blockingTimeout)
    .then(
      () => store.dispatch(actionCreators.chainBlocking(chainAlias)),
      error => {
        console.error(
          `${LOG_PREFIX}: Chain '${chainAlias}' is not blocking: ${error}`
        )
        store.dispatch(
          actionCreators.chainError({
            chainAlias,
            error: error.message || error
          })
        )
      }
    )
}

const getBlockHeight = block =>
  block ? block.getIn(['content', 'height'], 0) : 0

const getChainBlocks = (state, chainId) =>
  state.getIn(['chainContainers', `chain-${chainId}`, 'blocks'], [])

const getMostRecentBlockHeight = (state, chainId) => {
  const blocks = getChainBlocks(state, chainId)
  const lastBlock = blocks.slice(-1)[0]
  return getBlockHeight(lastBlock)
}

module.exports = createMiddleware

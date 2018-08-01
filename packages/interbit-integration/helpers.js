const log = require('./log')

const waitForState = (chainInterface, predicate = () => {}, timeout = 2000) =>
  new Promise((resolve, reject) => {
    let unsubscribe = () => {}
    unsubscribe = chainInterface.subscribe(() => {
      const state = chainInterface.getState()
      if (predicate(state)) {
        unsubscribe()
        resolve()
      }
    })

    setTimeout(() => {
      unsubscribe()
      reject(new Error(`Waiting for block timed out after ${timeout}ms`))
    }, timeout)
  })

const dispatchAction = async (chainInterface, action) => {
  log.action(action)
  await chainInterface.dispatch(action)
}

const getChainId = (alias, chains) => chains[alias].chainId || chains[alias]

const logStateUpdates = (alias, chainInterface) => {
  const logChainState = log.any(alias)
  chainInterface.subscribe(() => {
    const state = chainInterface.getState()
    logChainState(state)
    log.info('Done.')
  })
}

module.exports = {
  waitForState,
  dispatchAction,
  getChainId,
  logStateUpdates
}

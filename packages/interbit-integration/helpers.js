const log = require('./log')

const waitForBlock = (chainInterface, timeout = 2000) =>
  new Promise((resolve, reject) => {
    let unsubscribe = () => {}
    let count = 0
    unsubscribe = chainInterface.subscribe(() => {
      if (count === 0) {
        unsubscribe()
        resolve()
        count += 1
      }
    })

    setTimeout(() => {
      unsubscribe()
      reject()
    }, timeout)
  })

const dispatchAction = async (chainInterface, action) => {
  log.action(action)
  await chainInterface.dispatch(action)
}

const getChainId = (alias, chains) => chains[alias].chainId

const logStateUpdates = (alias, chainInterface) => {
  const logChainState = log.any(alias)
  chainInterface.subscribe(() => {
    const state = chainInterface.getState()
    logChainState(state)
    log.info('Done.')
  })
}

module.exports = {
  waitForBlock,
  dispatchAction,
  getChainId,
  logStateUpdates
}

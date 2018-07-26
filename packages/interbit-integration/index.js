const debug = require('debug')
const interbit = require('interbit')
const {
  coreCovenant: {
    actionCreators: { removeJoinConfig }
  }
} = require('interbit-covenant-tools')

const covenant = require('./covenant')
const { FIRST_CHAIN_ALIAS, SECOND_CHAIN_ALIAS } = require('./constants')

const logInfo = debug('info')
const logError = debug('error')
const logAction = debug('action')

const doTheThing = async () => {
  try {
    const options = {
      // eslint-disable-next-line
      config: require('./interbit.config'),
      noWatch: true
    }

    const { cli, chainManifest } = await interbit.start(options)

    logInfo('BOOTED THE INTERBITS WEOOOO')
    logInfo(chainManifest)

    const firstChainId = getChainId(FIRST_CHAIN_ALIAS, chainManifest)
    const secondChainId = getChainId(SECOND_CHAIN_ALIAS, chainManifest)

    const firstChainInterface = cli.getChain(firstChainId)
    const secondChainInterface = cli.getChain(secondChainId)

    logState(FIRST_CHAIN_ALIAS, firstChainInterface)
    logState(SECOND_CHAIN_ALIAS, secondChainInterface)

    const testAction = covenant.actionCreators.addState('meowmeowmeow')
    await dispatchAction(firstChainInterface, testAction)

    const removeJoinConfigAction = removeJoinConfig({ chainId: secondChainId })
    await dispatchAction(firstChainInterface, removeJoinConfigAction)
  } catch (e) {
    logError(e)
  }
}

const dispatchAction = async (chainInterface, action) => {
  logAction(action)
  await chainInterface.dispatch(action)
}

const getChainId = (alias, chains) => chains[alias].chainId

const logState = (alias, chainInterface) => {
  const logChainState = debug(alias)
  chainInterface.subscribe(() => {
    const state = chainInterface.getState()
    logChainState(state)
    logInfo('Done.')
  })
}

doTheThing()

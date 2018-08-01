const assert = require('assert')
const interbit = require('interbit')
const {
  getChainId,
  logStateUpdates,
  dispatchAction,
  waitForBlock
} = require('../helpers')
const log = require('../log')

const covenant = require('../covenant')
const { FIRST_CHAIN_ALIAS, SECOND_CHAIN_ALIAS } = require('../constants')

const testStart = async () => {
  const options = {
    // eslint-disable-next-line
    config: require('../interbit.config'),
    noWatch: true
  }

  const { cli, hypervisor, chainManifest } = await interbit.start(options)

  log.info('BOOTED THE INTERBITS WEOOOO')
  log.info(chainManifest)

  const firstChainId = getChainId(FIRST_CHAIN_ALIAS, chainManifest)
  const secondChainId = getChainId(SECOND_CHAIN_ALIAS, chainManifest)

  const firstChainInterface = cli.getChain(firstChainId)
  const secondChainInterface = cli.getChain(secondChainId)

  logStateUpdates(FIRST_CHAIN_ALIAS, firstChainInterface)
  logStateUpdates(SECOND_CHAIN_ALIAS, secondChainInterface)

  const testValue = 'meowmeowmeow'
  const testAction = covenant.actionCreators.addState(testValue)
  await dispatchAction(firstChainInterface, testAction)

  const firstState = firstChainInterface.getState()
  assert.equal(
    firstState.shared,
    testValue,
    'First chain did not block ADD_STATE'
  )

  await waitForBlock(secondChainInterface, 2500)

  const secondState = secondChainInterface.getState()
  assert.equal(
    secondState.sharedWithMe,
    testValue,
    'Read join from first to second not functioning'
  )

  log.success(
    'interbit.start(options): First joined to second and shared state'
  )

  await cli.shutdown()
  hypervisor.stopHyperBlocker()
}

module.exports = testStart

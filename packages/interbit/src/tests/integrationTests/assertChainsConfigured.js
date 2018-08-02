const assert = require('assert')

const {
  getChainId,
  logStateUpdates,
  dispatchAction,
  waitForState
} = require('./helpers')
const log = require('../../log')

const covenant = require('./covenant')
const { FIRST_CHAIN_ALIAS, SECOND_CHAIN_ALIAS } = require('./constants')

const assertChainsConfigured = async (cli, chainManifest) => {
  const firstChainId = getChainId(FIRST_CHAIN_ALIAS, chainManifest)
  const secondChainId = getChainId(SECOND_CHAIN_ALIAS, chainManifest)

  log.info(chainManifest)
  log.info(firstChainId)

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

  await waitForState(
    secondChainInterface,
    state => state.sharedWithMe === testValue,
    2500
  )

  const secondState = secondChainInterface.getState()
  assert.equal(
    secondState.sharedWithMe,
    testValue,
    'Read join from first to second not functioning'
  )
}

module.exports = assertChainsConfigured

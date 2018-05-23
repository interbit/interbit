// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const waitForState = (store, predicate, timeoutFunction, maxTime) =>
  new Promise((resolve, reject) => {
    const tester = () => {
      const state = store.getState()
      const block = store.getCurrentBlock()
      return predicate(state, block)
    }
    if (tester()) {
      resolve()
      return
    }
    let unsubscribe = () => {}
    const timeout = timeoutFunction
      ? setTimeout(() => {
          reject(timeoutFunction())
          unsubscribe()
        }, maxTime)
      : undefined
    unsubscribe = store.subscribe(() => {
      if (tester()) {
        unsubscribe()
        timeout && clearTimeout(timeout)
        resolve()
      }
    })
  })

const assertResponseIncluded = (responseType, maxTime, host) =>
  new Promise((resolve, reject) => {
    let unsubscribe = () => {}
    const timeout = setTimeout(() => {
      reject(new Error('timed out'))
      unsubscribe()
    }, maxTime)
    unsubscribe = host.subscribe(() => {
      const { content } = host.getCurrentBlock()
      if (content.actions.some(({ type }) => type === responseType)) {
        resolve(content)
        unsubscribe()
        clearTimeout(timeout)
      }
    })
  })

const assertLaterState = (
  store,
  predicate,
  errorMessage = '',
  maxTime = 2500
) => waitForState(store, predicate, () => new Error(errorMessage), maxTime)

const delay = milliseconds =>
  new Promise(resolve => setTimeout(resolve, milliseconds))

const assertApplyCovenant = async (cli, chainCli, chainId, covenantString) => {
  const covenantHash = await cli.deployCovenant(covenantString)
  cli.applyCovenant(chainId, covenantHash)
  await assertLaterState(
    chainCli,
    state =>
      covenantHash ===
      state.getIn(['interbit', 'configChanges', 'covenantHash']),
    "didn't get counter covenant hash"
  )
}

const serverStarted = (port, address = '0.0.0.0') => state => {
  const listening = state.getIn(
    ['containers', 'network', 'servers', address, port, 'listening'],
    false
  )
  return listening
}

const serverStopped = state => {
  const servers = state.getIn(['containers', 'network', 'servers'], {})
  return Object.keys(servers).length === 0
}

const receivedPublicKey = (state, block) =>
  block.content.actions.some(({ type, payload }) => {
    const receivedMessage = type === 'network/MESSAGE_RECEIVED_FROM_SOCKET'
    const declaresPublicKey =
      payload &&
      payload.message &&
      payload.message.type === 'MESSAGE_IDENTITY_RECEIVED' &&
      payload.message.payload.accepted
    return receivedMessage && declaresPublicKey
  })

module.exports = {
  assertResponseIncluded,
  assertLaterState,
  delay,
  assertApplyCovenant,
  serverStarted,
  serverStopped,
  receivedPublicKey,
  waitForState
}

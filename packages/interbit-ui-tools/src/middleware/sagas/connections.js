const { call, select } = require('redux-saga/effects')

const selectors = require('../selectors')
const { LOG_PREFIX } = require('../constants')

function* connectToPeers({
  cli,
  defaultPort = 443,
  maxRetries = 25,
  timeout = 20000
}) {
  const peers = yield select(selectors.getConfiguredPeers)

  console.log(`${LOG_PREFIX}: Connecting to interbit nodes`, peers)
  for (const peer of peers) {
    const [toAddress, port] = peer.split(':')
    const toPort = port || defaultPort
    yield call(tryConnect, { cli, toAddress, toPort, maxRetries, timeout })
  }
}

function* tryConnect({
  cli,
  toAddress = 'localhost',
  toPort,
  maxRetries = 25,
  timeout = 20000
}) {
  if (toAddress && toPort) {
    try {
      console.log(`${LOG_PREFIX}: Connecting to: ${toAddress}:${toPort}`)
      yield call(
        cli.connect,
        Number(toPort),
        toAddress,
        Number(maxRetries),
        Number(timeout)
      )
      console.log(`${LOG_PREFIX}: Connected to: ${toAddress}:${toPort}`)
    } catch (error) {
      console.error(`${LOG_PREFIX}: Connection failed: ${toAddress}:${toPort}`)
    }
  }
}

module.exports = {
  connectToPeers
}

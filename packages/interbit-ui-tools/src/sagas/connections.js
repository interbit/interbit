const { call } = require('redux-saga/effects')

const { LOG_PREFIX } = require('../constants')

function* connectToPeers({ cli, peers = [] }) {
  if (peers.length === 0) {
    const toPort =
      process.env.INTERBIT_PORT || process.env.REACT_APP_INTERBIT_PORT || 5000
    yield call(tryConnect, { cli, toPort })
    return
  }

  console.log(`${LOG_PREFIX}: Connecting to Interbit nodes`, peers)
  for (const peer of peers) {
    const [toAddress, port] = peer.split(':')
    const toPort = port || getDefaultPort(window.location.protocol)
    yield call(tryConnect, { cli, toAddress, toPort })
  }
}

const getDefaultPort = protocol => (protocol === 'https:' ? 443 : 80)

function* tryConnect({ cli, toAddress = 'localhost', toPort }) {
  if (toAddress && toPort) {
    try {
      console.log(`${LOG_PREFIX}: Connecting to: ${toAddress}:${toPort}`)
      yield call(cli.connect, Number(toPort), toAddress)
      console.log(`${LOG_PREFIX}: Connected to: ${toAddress}:${toPort}`)
    } catch (error) {
      console.error(
        `${LOG_PREFIX}: Connection failed: ${toAddress}:${toPort}: `,
        error
      )
    }
  }
}

module.exports = {
  connectToPeers
}

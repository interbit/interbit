const log = require('../log')

// Port 443 appropriate for https deployment
const DEFAULT_PORT = 443

/**
 * Attempts to connect node to peers.
 * @param {Object} cli - the cli for the node to connect
 * @param {Array} manifestPeers - the list of peers to connect to
 * @param {number} maxRetries - the maximum number of times to attempt each connection
 * @param {number} timeout - the maximum time to wait for each connection attempt
 */
const connectToPeers = async (
  cli,
  manifestPeers = [],
  maxRetries = 25,
  timeout = 20000
) => {
  const peerOverride = process.env.CONNECT_TO_PEERS
  const peers = peerOverride ? peerOverride.split(',') : manifestPeers

  log.info('CONNECTING TO PEERS', peers)
  for (const peer of peers) {
    const [toAddress, toPort] = peer.split(':')
    await tryConnect({ cli, toAddress, toPort, maxRetries, timeout })
  }
  log.success('Connected to peers')
}

const tryConnect = async ({
  cli,
  toAddress,
  toPort = DEFAULT_PORT,
  maxRetries = 25,
  timeout = 20000
}) => {
  if (toAddress && toPort) {
    try {
      log.info(`Connecting: ${toAddress}:${toPort}`)
      await cli.connect(
        Number(toPort),
        toAddress,
        Number(maxRetries),
        Number(timeout)
      )
      log.info(`Connected to: ${toAddress}:${toPort}`)
    } catch (error) {
      log.warn(`Connection failed: ${toAddress}:${toPort}`)
    }
  }
}

module.exports = connectToPeers

const log = require('../log')

// Port 443 appropriate for https deployment
const DEFAULT_PORT = 443

/**
 * Attempts to connect a node to peers.
 * @param {Object} cli - The cli that is connecting to peers.
 * @param {Array} manifestPeers - The list of peers to connect to.
 * @param {number} maxRetries - The maximum number of times to attempt each connection.
 * @param {number} timeout - The maximum time to wait for each connection attempt.
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

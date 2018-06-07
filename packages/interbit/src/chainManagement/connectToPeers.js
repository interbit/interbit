// Port 443 appropriate for https deployment
const DEFAULT_PORT = 443

const connectToPeers = async (
  cli,
  manifestPeers = [],
  maxRetries = 25,
  timeout = 20000
) => {
  const peerOverride = process.env.CONNECT_TO_PEERS
  const peers = peerOverride ? peerOverride.split(',') : manifestPeers

  console.log('CONNECTING TO PEERS', peers)
  for (const peer of peers) {
    const [toAddress, toPort] = peer.split(':')
    await tryConnect({ cli, toAddress, toPort, maxRetries, timeout })
  }
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
      console.log(`Connecting: ${toAddress}:${toPort}`)
      await cli.connect(
        Number(toPort),
        toAddress,
        Number(maxRetries),
        Number(timeout)
      )
      console.log(`Connected to: ${toAddress}:${toPort}`)
    } catch (error) {
      console.warn(`Connection failed: ${toAddress}:${toPort}`)
    }
  }
}

module.exports = connectToPeers

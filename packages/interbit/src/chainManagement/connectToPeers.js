const connectToPeers = async (
  cli,
  peers = [],
  maxRetries = 25,
  timeout = 20000
) => {
  console.log('CONNECTING TO PEERS', peers)
  for (const peer of peers) {
    const [toAddress, toPort] = peer.split(':')
    await tryConnect({ cli, toAddress, toPort, maxRetries, timeout })
  }
}

const tryConnect = async ({
  cli,
  toAddress = 'localhost',
  toPort,
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
      console.warn(`Connection failed: ${toAddress}:${toPort}: `, error)
    }
  }
}

module.exports = connectToPeers

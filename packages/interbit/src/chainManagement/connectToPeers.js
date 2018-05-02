const connectToPeers = async (cli, peers = []) => {
  console.log('CONNECTING TO PEERS', peers)
  for (const peer of peers) {
    const [toAddress, toPort] = peer.split(':')
    await tryConnect({ cli, toAddress, toPort })
  }
}

const tryConnect = async ({ cli, toAddress = 'localhost', toPort }) => {
  if (toAddress && toPort) {
    try {
      console.log(`Connecting: ${toAddress}:${toPort}`)
      await cli.connect(Number(toPort), toAddress)
      console.log(`Connected to: ${toAddress}:${toPort}`)
    } catch (error) {
      console.warn(`Connection failed: ${toAddress}:${toPort}: `, error)
    }
  }
}

module.exports = connectToPeers

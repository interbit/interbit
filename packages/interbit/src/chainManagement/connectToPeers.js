// Port 443 appropriate for heroku deployment
const DEFAULT_PORT = 443

const connectToPeers = async (cli, manifestPeers = []) => {
  const peerOverride = process.env.CONNECT_TO_PEERS
  const peers = peerOverride ? peerOverride.split(',') : manifestPeers

  console.log('CONNECTING TO PEERS', peers)
  for (const peer of peers) {
    const [toAddress, toPort] = peer.split(':')
    await tryConnect({ cli, toAddress, toPort })
  }
}

const tryConnect = async ({ cli, toAddress, toPort = DEFAULT_PORT }) => {
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

const { LOG_PREFIX } = require('./constants')

const isAvailable = () => !!(window && window.interbit)

const isConnected = () =>
  !!(
    isAvailable() &&
    window.interbit.middleware &&
    window.interbit.middleware.cli
  )

const kvPrivateKey = 'interbit-keyPair-privateKey'
const kvPublicKey = 'interbit-keyPair-publicKey'

const createContext = async () => {
  // TODO: Store keys securely for production
  // Interbit will generate new keys automatically for us
  // However, we need to use the same keys to access
  // our existing chains
  const interbit = window.interbit
  const localStorage = window.localStorage

  let keyPair
  const publicKey = localStorage[kvPublicKey]
  const privateKey = localStorage[kvPrivateKey]
  if (publicKey && privateKey) {
    keyPair = { publicKey, privateKey }
  } else {
    console.log(`${LOG_PREFIX}: Generating key pair`)
    keyPair = await interbit.generateKeyPair()
    localStorage[kvPublicKey] = keyPair.publicKey
    localStorage[kvPrivateKey] = keyPair.privateKey
  }

  console.log(`${LOG_PREFIX}: Starting interbit hypervisor`)
  const hypervisor = await interbit.createHypervisor({ keyPair })

  console.log(`${LOG_PREFIX}: Creating interbit client`)
  const cli = await interbit.createCli(hypervisor)

  interbit.middleware = {
    hypervisor,
    cli,
    publicKey: keyPair.publicKey,
    chains: {}
  }
}

const waitForGlobal = async (timeout = 10000) => {
  const waitUntil = Date.now() + timeout
  const interval = setInterval(() => {
    if (isAvailable() || Date.now() >= waitUntil) {
      clearInterval(interval)
    }
  }, 50)

  if (!isAvailable()) {
    throw new Error('interbit is not available')
  }
}

const waitForInterbit = async () => {
  if (!isAvailable()) {
    await waitForGlobal()
  }
  if (!isConnected()) {
    await createContext()
  }
  return { interbit: window.interbit, ...window.interbit.middleware }
}

const getInterbit = () => {
  if (!isConnected()) {
    throw new Error('interbit is not available')
  }
  return { interbit: window.interbit, ...window.interbit.middleware }
}

module.exports = {
  getInterbit,
  waitForInterbit,
  isAvailable,
  isConnected
}

const { LOG_PREFIX, DATASTORE_KEYS } = require('./constants')
const createDataStore = require('./dataStore')

const isAvailable = () => !!(window && window.interbit)

const isInterbitLoaded = () =>
  !!(
    isAvailable() &&
    window.interbit.middleware &&
    window.interbit.middleware.cli
  )

const createContext = async () => {
  const interbit = window.interbit

  console.log(`${LOG_PREFIX}: Initializing interbit API`)

  const localDataStore = await createDataStore()

  // TODO: Store keys securely for production
  let keyPair = await localDataStore.getItem(DATASTORE_KEYS.KEY_PAIR)
  if (!keyPair) {
    console.log(`${LOG_PREFIX}: Generating key pair`)
    keyPair = await interbit.generateKeyPair()
    await localDataStore.setItem(DATASTORE_KEYS.KEY_PAIR, keyPair)
  }

  console.log(`${LOG_PREFIX}: Starting interbit hypervisor`)
  const hypervisor = await interbit.createHypervisor({ keyPair })

  console.log(`${LOG_PREFIX}: Creating interbit client`)
  const cli = await interbit.createCli(hypervisor)

  interbit.middleware = {
    hypervisor,
    cli,
    publicKey: keyPair.publicKey,
    chains: {},
    localDataStore
  }
}

const getContext = () => ({
  interbit: window.interbit,
  ...window.interbit.middleware
})

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
  if (!isInterbitLoaded()) {
    await createContext()
  }
  return getContext()
}

const getInterbit = () => {
  if (!isInterbitLoaded()) {
    throw new Error('interbit is not available')
  }
  return getContext()
}

module.exports = {
  getInterbit,
  waitForInterbit,
  isInterbitLoaded
}

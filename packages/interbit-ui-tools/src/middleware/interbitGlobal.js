const { LOG_PREFIX } = require('./constants')
const { getDataStore, DATASTORE_KEYS } = require('./localDataStorage')

const isAvailable = () => !!(window && window.interbit)

const isConnected = () =>
  !!(
    isAvailable() &&
    window.interbit.middleware &&
    window.interbit.middleware.cli
  )

const createContext = async () => {
  // TODO: Store keys securely for production
  // Interbit will generate new keys automatically for us
  // However, we need to use the same keys to access
  // our existing chains
  const interbit = window.interbit

  const localDataStore = await getDataStore()

  let keyPair = await localDataStore.getItem(DATASTORE_KEYS.KEY_PAIR)
  if (!keyPair) {
    console.log(`${LOG_PREFIX}: Generating key pair`)
    keyPair = await interbit.generateKeyPair()
    await localDataStore.setItem(DATASTORE_KEYS.KEY_PAIR, keyPair)
  }

  console.log(`${LOG_PREFIX}: Starting interbit hypervisor`)
  const hypervisorChainId = await localDataStore.getItem(
    DATASTORE_KEYS.HYPERVISOR_CHAIN_ID
  )
  const hypervisor = await interbit.createHypervisor({
    keyPair,
    existingId: hypervisorChainId
  })

  console.log(`${LOG_PREFIX}: Hypervisor running:`, {
    version: interbit.VERSION,
    chainId: hypervisor.chainId
  })

  if (!hypervisorChainId) {
    await localDataStore.setItem(
      DATASTORE_KEYS.HYPERVISOR_CHAIN_ID,
      hypervisor.chainId
    )
  }

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

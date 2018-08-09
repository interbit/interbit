const interbit = require('interbit-core')

const { LOG_PREFIX, DATASTORE_KEYS } = require('../../middleware/constants')

const createMockDataStore = () => {
  const datastore = {}
  return {
    getItem: key => datastore[key],
    setItem: (key, value) => {
      datastore[key] = value
    },
    hasItem: key => key in datastore
  }
}

const createInterbitContext = async localDataStore => {
  console.log(`${LOG_PREFIX}: Initializing interbit API`)

  let keyPair = localDataStore.getItem(DATASTORE_KEYS.KEY_PAIR)
  if (!keyPair) {
    console.log(`${LOG_PREFIX}: Generating key pair`)
    keyPair = await interbit.generateKeyPair()
    localDataStore.setItem(DATASTORE_KEYS.KEY_PAIR, keyPair)
  }

  console.log(`${LOG_PREFIX}: Starting interbit hypervisor`)
  const hypervisor = await interbit.createHypervisor({ keyPair })

  console.log(`${LOG_PREFIX}: Creating interbit client`)
  const cli = await interbit.createCli(hypervisor)

  return {
    interbit,
    hypervisor,
    cli,
    publicKey: keyPair.publicKey,
    chains: {},
    localDataStore
  }
}

const createTestContext = (config, localDataStore = createMockDataStore()) => {
  let interbitContext
  const isInterbitLoaded = () => !!interbitContext
  const getContext = () => interbitContext
  const createContext = async () => {
    interbitContext = await createInterbitContext(localDataStore)
  }
  return {
    getConfig: () => config,
    getInterbit: () => {
      if (!isInterbitLoaded()) {
        throw new Error('interbit is not available')
      }
      return getContext()
    },
    waitForInterbit: async () => {
      if (!isInterbitLoaded()) {
        await createContext()
      }
      return getContext()
    },
    isInterbitLoaded,
    unloadInterbit: () => {
      if (interbitContext) {
        if (interbitContext.hypervisor) {
          console.log(`${LOG_PREFIX}: Stopping interbit hypervisor`)
          interbitContext.hypervisor.stopHyperBlocker()
        }
        interbitContext = undefined
      }
    }
  }
}

module.exports = { createMockDataStore, createTestContext }

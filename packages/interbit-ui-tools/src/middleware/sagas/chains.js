const { put, select, call, all } = require('redux-saga/effects')

const { userHasRole } = require('./privileges')
const { actionCreators } = require('../actions')
const selectors = require('../selectors')
const { LOG_PREFIX } = require('../constants')

function* loadStaticChains({ cli }) {
  const chainsToLoad = yield select(selectors.getConfiguredChains)

  console.log(`${LOG_PREFIX}: *loadStaticChains()`, chainsToLoad)

  const loadChainCalls = Object.entries(chainsToLoad).reduce(
    (acc, [chainAlias, { chainId }]) =>
      acc.concat(call(tryLoadChain, { cli, chainAlias, chainId })),
    []
  )
  yield all(loadChainCalls)
}

function* loadPrivateChain({
  interbit,
  cli,
  localDataStore,
  publicKey,
  publicChainAlias,
  chainAlias,
  sponsoredChainId,
  privateChainId
}) {
  console.log(`${LOG_PREFIX}: *loadPrivateChain()`, chainAlias)

  let privateChain

  const publicChainId = yield select(selectors.getChainId, {
    chainAlias: publicChainAlias
  })

  const dataStoreKey = getDataStoreKey(publicChainId, chainAlias)
  const dataStoreChainId = yield call(
    getChainIdFromLocalDataStore,
    localDataStore,
    dataStoreKey
  )

  if (
    shouldLoadPrivateChainFromOtherDevice({
      dataStoreChainId,
      sponsoredChainId,
      privateChainId
    })
  ) {
    privateChain = yield call(tryLoadChain, {
      cli,
      chainAlias,
      chainId: privateChainId
    })

    if (privateChain) {
      yield call(tryDeleteChain, {
        cli,
        chainAlias: `${chainAlias}-sponsor`,
        chainId: sponsoredChainId
      })

      yield call(
        saveChainIdToLocalDataStore,
        localDataStore,
        dataStoreKey,
        privateChain.chainId
      )
    }
  }

  if (
    !privateChain &&
    shouldLoadPrivateChainFromLocalDataStore({ dataStoreChainId })
  ) {
    privateChain = yield call(tryLoadChain, {
      cli,
      chainAlias,
      chainId: dataStoreChainId
    })

    if (!privateChain) {
      yield call(removeChainIdFromLocalDataStore, localDataStore, dataStoreKey)
    }
  }

  if (!privateChain) {
    // Create a new private chain
    privateChain = yield call(sponsorChain, {
      interbit,
      cli,
      publicKey,
      publicChainAlias,
      chainAlias
    })

    yield call(
      saveChainIdToLocalDataStore,
      localDataStore,
      dataStoreKey,
      privateChain.chainId
    )
  }

  const userOwnsChain = call(userHasRole, {
    chain: privateChain,
    publicKey,
    role: 'root'
  })

  if (!userOwnsChain) {
    throw new Error('User does not own private chain')
  }

  return privateChain
}

const shouldLoadPrivateChainFromOtherDevice = ({
  dataStoreChainId,
  sponsoredChainId,
  privateChainId
}) =>
  dataStoreChainId &&
  dataStoreChainId === sponsoredChainId &&
  privateChainId &&
  dataStoreChainId !== privateChainId

const shouldLoadPrivateChainFromLocalDataStore = ({ dataStoreChainId }) =>
  !!dataStoreChainId

const getDataStoreKey = (parentChainId, chainAlias) =>
  `chainId-${chainAlias}-${parentChainId}`

const getChainIdFromLocalDataStore = async (localDataStore, chainKey) =>
  localDataStore.getItem(chainKey)

const saveChainIdToLocalDataStore = async (
  localDataStore,
  chainKey,
  chainId
) => {
  localDataStore.setItem(chainKey, chainId)
}

const removeChainIdFromLocalDataStore = async (localDataStore, chainKey) =>
  localDataStore.removeItem(chainKey)

function* sponsorChain({
  interbit,
  cli,
  publicKey,
  publicChainAlias,
  chainAlias
}) {
  console.log(`${LOG_PREFIX}: *sponsorChain()`)

  yield put(actionCreators.chainSponsoring({ chainAlias }))

  const { blockMaster, sponsorChainId, covenantHash } = yield select(
    selectors.getSponsorConfig,
    { publicChainAlias, privateChainAlias: chainAlias }
  )
  if (!blockMaster || !sponsorChainId || !covenantHash) {
    throw new Error(
      'public chain does not contain expected chain sponsorship configuration'
    )
  }
  if (blockMaster === publicKey) {
    throw new Error('public key cannot be the block master')
  }

  const genesisConfig = interbit.createDefaultSponsoredChainConfig({
    blockMaster,
    myPublicKey: publicKey,
    sponsorChainId
  })

  const genesisBlock = interbit.createGenesisBlock({
    config: genesisConfig,
    configChanges: { covenantHash }
  })

  const chainId = genesisBlock.blockHash

  yield put(
    actionCreators.chainGenesis({
      chainAlias,
      chainId,
      genesisBlock
    })
  )

  yield call(cli.sendChainToSponsor, {
    parentChainId: sponsorChainId,
    publicKeys: [publicKey, blockMaster],
    genesisBlock
  })

  const chain = yield call(loadChain, {
    cli,
    chainAlias,
    chainId
  })

  return { chainAlias, chainId, ...chain }
}

function* loadChain({ cli, chainAlias, chainId }) {
  console.log(`${LOG_PREFIX}: *loadChain()`, { chainAlias, chainId })

  yield put(actionCreators.chainLoading({ chainAlias }))

  const chain = yield call(cli.loadChain, chainId)

  yield put.resolve(actionCreators.chainLoaded({ chainAlias, chainId }))

  yield call(detectBlocking, chain)

  yield put.resolve(actionCreators.chainBlocking({ chainAlias }))

  return { chainAlias, chainId, ...chain }
}

function* tryLoadChain({ cli, chainAlias, chainId }) {
  try {
    return yield call(loadChain, { cli, chainAlias, chainId })
  } catch (error) {
    console.warn(`${LOG_PREFIX}:`, { chainAlias, error })
    yield put(actionCreators.chainError({ chainAlias, error: error.message }))
    return undefined
  }
}

function* tryDeleteChain({ cli, chainAlias, chainId }) {
  console.log(`${LOG_PREFIX}: *tryDeleteChain()`, { chainAlias, chainId })
  try {
    yield put(actionCreators.chainDeleting({ chainAlias, chainId }))

    // Broadcast chain removal from the network
    yield call(cli.destroyChain, chainId)

    // Remove the chain locally from browser local storage
    yield call(cli.removeChain, chainId)

    yield put(actionCreators.chainDeleted({ chainAlias, chainId }))
  } catch (error) {
    console.warn(`${LOG_PREFIX}:`, { chainId, error })
    yield put(actionCreators.chainError({ chainAlias, error: error.message }))
  }
}

const detectBlocking = (chain, maxTime = 5000) =>
  new Promise((resolve, reject) => {
    let unsubscribe = () => {}
    const timeout = setTimeout(() => {
      reject(new Error('Chain is not blocking'))
      unsubscribe()
    }, maxTime)
    unsubscribe = chain.blockSubscribe(() => {
      unsubscribe()
      timeout && clearTimeout(timeout)
      resolve(true)
    })
  })

module.exports = {
  loadStaticChains,
  loadChain,
  loadPrivateChain,
  sponsorChain,
  tryLoadChain
}

const { put, select, call } = require('redux-saga/effects')

const { userHasRole } = require('./privileges')
const { actionCreators } = require('../actions')
const selectors = require('../selectors')
const { LOG_PREFIX } = require('../constants')

function* loadPrivateChain({
  interbit,
  cli,
  publicKey,
  publicChainAlias,
  chainAlias,
  sponsoredChainId,
  privateChainId
}) {
  console.log(`${LOG_PREFIX}: *privateChain()`)

  let privateChain
  let chainId

  try {
    const publicChainId = yield select(selectors.getPublicChainId, {
      publicChainAlias
    })

    const privateChainKey = kvPrivateChainKey(publicChainId, chainAlias)
    const savedChainId = yield call(cli.kvGet, privateChainKey)

    if (
      shouldLoadPrivateChainFromOtherDevice({
        savedChainId,
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
        yield call(cli.kvPut, privateChainKey, privateChainId)
        chainId = privateChainId
      }
    }

    if (
      !privateChain &&
      shouldLoadPrivateChainFromLocalStorage({ savedChainId })
    ) {
      privateChain = yield call(tryLoadChain, {
        cli,
        chainAlias,
        chainId: savedChainId
      })

      if (privateChain) {
        chainId = savedChainId
      }
    }

    if (!privateChain) {
      // Create a new private chain
      const newChainId = yield call(sponsorChain, {
        interbit,
        cli,
        publicKey,
        publicChainAlias,
        chainAlias
      })

      privateChain = yield call(loadChain, {
        cli,
        chainAlias,
        chainId: newChainId
      })

      yield call(cli.kvPut, privateChainKey, newChainId)
      chainId = newChainId
    }

    const userOwnsChain = call(userHasRole, {
      chain: privateChain,
      publicKey,
      role: 'root'
    })

    if (!userOwnsChain) {
      throw new Error('User does not own private chain')
    }
  } catch (error) {
    console.error(`${LOG_PREFIX}: `, { chainAlias, error })
    yield put(actionCreators.chainError({ chainAlias, error: error.message }))
    chainId = undefined
  }
  return chainId
}

const shouldLoadPrivateChainFromOtherDevice = ({
  savedChainId,
  sponsoredChainId,
  privateChainId
}) =>
  savedChainId &&
  savedChainId === sponsoredChainId &&
  privateChainId &&
  savedChainId !== privateChainId

const shouldLoadPrivateChainFromLocalStorage = ({ savedChainId }) =>
  !!savedChainId

const kvPrivateChainKey = (parentChainId, chainAlias) =>
  `chainId-${chainAlias}-${parentChainId}`

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
  return chainId
}

function* loadChain({ cli, chainAlias, chainId }) {
  console.log(`${LOG_PREFIX}: *loadChain()`, { chainAlias, chainId })

  yield put(actionCreators.chainLoading({ chainAlias }))

  const chain = yield call(cli.loadChain, chainId)

  yield put.resolve(actionCreators.chainLoaded({ chainAlias, chainId }))

  return chain
}

function* tryLoadChain({ cli, chainAlias, chainId }) {
  console.log(`${LOG_PREFIX}: *tryLoadChain()`, { chainAlias, chainId })

  let chain
  try {
    yield put(actionCreators.chainLoading({ chainAlias }))

    chain = yield call(cli.loadChain, chainId)

    yield put.resolve(actionCreators.chainLoaded({ chainAlias, chainId }))
  } catch (error) {
    console.warn(`${LOG_PREFIX}:`, { chainAlias, error })
    yield put(actionCreators.chainError({ chainAlias, error: error.message }))
    chain = undefined
  }
  return chain
}

module.exports = {
  loadChain,
  loadPrivateChain,
  sponsorChain,
  tryLoadChain
}

const { put, takeEvery, call } = require('redux-saga/effects')

const { actionTypes, actionCreators } = require('../actions')
const getHtmlConfig = require('../getConfigFromStaticHtml')
const {
  getConfiguredChains,
  getConfiguredPeers,
  entireTree
} = require('../selectors')
const { LOG_PREFIX } = require('../constants')
const { connectToPeers } = require('./connections')
const { interbitContext } = require('./interbit')
const { loadPrivateChain, loadChain, sponsorChain } = require('./chains')

function* rootSaga() {
  console.log(`${LOG_PREFIX}: *rootSaga(): loading interbit`)
  yield call(loadInterbitSaga)

  console.log(
    `${LOG_PREFIX}: *rootSaga(): watching for ${actionTypes.PRIVATE_CHAIN_SAGA}`
  )
  yield takeEvery(actionTypes.PRIVATE_CHAIN_SAGA, privateChainSaga)
}

function* loadInterbitSaga() {
  console.log(`${LOG_PREFIX}: *loadInterbitSaga()`)

  try {
    const { cli } = yield call(interbitContext)

    const config = yield call(getHtmlConfig, document)
    yield put(actionCreators.initialConfig(config))

    const peers = getConfiguredPeers(config, { subtree: entireTree })
    yield call(connectToPeers, { cli, peers })

    const chainsToLoad = getConfiguredChains(config, {
      subtree: entireTree
    })
    for (const [chainAlias, { chainId }] of Object.entries(chainsToLoad)) {
      yield call(loadChain, { cli, chainAlias, chainId })
    }

    yield put(actionCreators.interbitReady())
  } catch (error) {
    console.error(`${LOG_PREFIX}: `, error)
    yield put(actionCreators.interbitError(error.message))
  }
}

function* privateChainSaga(action) {
  console.log(`${LOG_PREFIX}: *privateChainSaga()`, action)

  const {
    privateChainAlias,
    publicChainAlias,
    sponsoredChainId,
    privateChainId
  } =
    action.payload || {}

  try {
    const { interbit, cli, localDataStore, publicKey } = yield call(
      interbitContext
    )

    yield call(loadPrivateChain, {
      interbit,
      cli,
      localDataStore,
      publicKey,
      publicChainAlias,
      chainAlias: privateChainAlias,
      sponsoredChainId,
      privateChainId
    })
  } catch (error) {
    console.error(`${LOG_PREFIX}: `, error)
    yield put(
      actionCreators.chainError({
        chainAlias: privateChainAlias,
        error: error.message
      })
    )
  }
}

function* sponsorChainSaga(action) {
  console.log(`${LOG_PREFIX}: *sponsorChainSaga()`, action)

  const { chainAlias, publicChainAlias } = action.payload

  try {
    const { interbit, cli, publicKey } = yield call(interbitContext)

    yield put(actionCreators.sponsorChainStart({ chainAlias }))
    if (!chainAlias) {
      throw new Error('chainAlias is required')
    }

    const chainId = yield call(sponsorChain, {
      interbit,
      cli,
      publicKey,
      publicChainAlias,
      chainAlias
    })

    yield call(loadChain, { cli, chainAlias, chainId })
  } catch (error) {
    console.error(`${LOG_PREFIX}: `, error)
    yield put(actionCreators.chainError({ chainAlias, error: error.message }))
  }
}

module.exports = {
  rootSaga,
  loadInterbitSaga,
  privateChainSaga,
  sponsorChainSaga
}

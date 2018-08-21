const { put, takeEvery, call, select } = require('redux-saga/effects')

const browserContext = require('../browserContext')
const { actionTypes, actionCreators } = require('../actions')
const selectors = require('../selectors')
const { LOG_PREFIX, INTERBIT_STATUS } = require('../constants')
const { connectToPeers } = require('./connections')
const { getInterbitContext } = require('./interbit')
const { loadStaticChains, loadPrivateChain, sponsorChain } = require('./chains')

const middlewareSagas = (runtimeContext = browserContext) => {
  function* rootSaga() {
    console.log(`${LOG_PREFIX}: *rootSaga(): loading interbit`)
    yield call(loadInterbitSaga)

    const status = yield select(selectors.getInterbitStatus)
    if (status === INTERBIT_STATUS.READY) {
      console.log(`${LOG_PREFIX}: *rootSaga(): listening for: `, [
        actionTypes.STATIC_CHAINS_SAGA,
        actionTypes.PRIVATE_CHAIN_SAGA,
        actionTypes.SPONSOR_CHAIN_SAGA
      ])
      yield takeEvery(actionTypes.STATIC_CHAINS_SAGA, staticChainsSaga)
      yield takeEvery(actionTypes.PRIVATE_CHAIN_SAGA, privateChainSaga)
      yield takeEvery(actionTypes.SPONSOR_CHAIN_SAGA, sponsorChainSaga)

      yield put(actionCreators.staticChainsSaga())
    }
  }

  function* loadInterbitSaga() {
    console.log(`${LOG_PREFIX}: *loadInterbitSaga()`)

    try {
      const { cli } = yield call(getInterbitContext, runtimeContext)

      yield call(connectToPeers, {
        cli,
        defaultPort: runtimeContext.getDefaultPort()
      })

      yield put(actionCreators.interbitReady())
    } catch (error) {
      console.error(`${LOG_PREFIX}: `, error)
      yield put(actionCreators.interbitError(error.message))
    }
  }

  function* staticChainsSaga() {
    console.log(`${LOG_PREFIX}: *staticChainsSaga()`)

    try {
      const { cli } = yield call(getInterbitContext, runtimeContext)

      yield call(loadStaticChains, { cli })
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
        getInterbitContext,
        runtimeContext
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

    const { chainAlias, publicChainAlias } = action.payload || {}

    try {
      if (!chainAlias) {
        throw new Error('chainAlias is required')
      }

      const { interbit, cli, publicKey } = yield call(
        getInterbitContext,
        runtimeContext
      )

      yield call(sponsorChain, {
        interbit,
        cli,
        publicKey,
        publicChainAlias,
        chainAlias
      })
    } catch (error) {
      console.error(`${LOG_PREFIX}: `, error)
      yield put(actionCreators.chainError({ chainAlias, error: error.message }))
    }
  }

  return {
    rootSaga,
    staticChainsSaga,
    privateChainSaga,
    sponsorChainSaga
  }
}

module.exports = {
  middlewareSagas,
  ...middlewareSagas()
}

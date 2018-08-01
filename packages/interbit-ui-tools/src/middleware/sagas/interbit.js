const { call, put } = require('redux-saga/effects')

const {
  isConnected,
  getInterbit,
  waitForInterbit
} = require('../interbitGlobal')

const { actionCreators } = require('../actions')

function* interbitContext() {
  if (isConnected()) {
    return getInterbit()
  }

  yield put(actionCreators.interbitLoading())

  const { interbit, hypervisor, cli, publicKey, chains } = yield call(
    waitForInterbit
  )

  yield put(actionCreators.interbitPublicKey(publicKey))
  yield put(actionCreators.interbitLoaded(interbit.VERSION))

  return { interbit, hypervisor, cli, publicKey, chains }
}

module.exports = {
  interbitContext
}

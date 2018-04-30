const { call, put } = require('redux-saga/effects')

const {
  isConnected,
  getInterbit,
  waitForInterbit
} = require('../interbitGlobal')

const { actionCreators } = require('../actions')
const { LOG_PREFIX, INTERBIT_STATUS } = require('../constants')

function* interbitContext() {
  if (isConnected()) {
    return getInterbit()
  }

  console.log(`${LOG_PREFIX}: Connecting to interbit API`)

  yield put(actionCreators.interbitStatus(INTERBIT_STATUS.LOADING))

  const { interbit, hypervisor, cli, publicKey, chains } = yield call(
    waitForInterbit
  )

  yield put(actionCreators.interbitPublicKey(publicKey))
  yield put(actionCreators.interbitStatus(INTERBIT_STATUS.LOADED))

  return { interbit, hypervisor, cli, publicKey, chains }
}

module.exports = {
  interbitContext
}

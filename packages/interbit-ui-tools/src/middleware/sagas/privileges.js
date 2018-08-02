const { call } = require('redux-saga/effects')
const { INTERBIT_PATHS } = require('../constants')

function* userHasRole({ chain, publicKey, role }) {
  if (!publicKey) {
    return false
  }

  const chainState = yield call(chain.getState)
  const roles = chainState.getIn([...INTERBIT_PATHS.ROLES, role], [])
  return roles.includes(publicKey)
}

function* userCanDispatch({ chain, publicKey }) {
  if (!publicKey) {
    return false
  }

  const chainState = yield call(chain.getState)
  const roles = chainState.getIn([INTERBIT_PATHS.ROLES], {})
  return Object.values(roles).some(role => role.includes(publicKey))
}

module.exports = {
  userCanDispatch,
  userHasRole
}

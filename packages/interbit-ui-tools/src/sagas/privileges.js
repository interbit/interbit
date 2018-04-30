const { call } = require('redux-saga/effects')

function* userHasRole({ chain, publicKey, role }) {
  if (!publicKey) {
    return false
  }

  const chainState = yield call(chain.getState)
  const roles = chainState.getIn(
    ['interbit', 'config', 'acl', 'roles', role],
    []
  )
  return roles.includes(publicKey)
}

function* userCanDispatch({ chain, publicKey }) {
  if (!publicKey) {
    return false
  }

  const chainState = yield call(chain.getState)
  const roles = chainState.getIn(['interbit', 'config', 'acl', 'roles'], {})
  return Object.values(roles).some(role => role.includes(publicKey))
}

module.exports = {
  userCanDispatch,
  userHasRole
}

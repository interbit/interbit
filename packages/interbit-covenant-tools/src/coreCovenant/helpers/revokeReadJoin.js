const {
  providing: getProviding,
  consuming: getConsuming,
  acl: getAcl,
  actionPermissions: getActionPermissions
} = require('../selectors')
const { PATHS } = require('../constants')
const { hasJoinsForChainId } = require('./revokeWriteJoin')

const REMOVE_JOIN_CONFIG = '@@interbit/REMOVE_JOIN_CONFIG'

const revokeReadJoin = (state, joinName) => {
  let nextState = state

  const chainId = getChainIdForJoinName(state, joinName)
  if (!chainId) {
    return nextState
  }

  nextState = removeJoinByName(nextState, joinName)

  // If this is the last join for this chainID, remove permission
  // to remotely revoke join
  if (!hasJoinsForChainId(nextState, chainId)) {
    const nextAcl = getAclWithoutPermissionsForChainId(nextState, chainId)
    nextState = nextState.setIn(PATHS.ACL, nextAcl)
  }

  return nextState
}

const getChainIdForJoinName = (state, joinName) => {
  const providing = getProviding(state)

  const providingJoin = providing.find(join => join.joinName === joinName)
  if (providingJoin) {
    return providingJoin.consumer
  }

  const consuming = getConsuming(state)
  const consumingJoin = consuming.find(join => join.joinName === joinName)
  if (consumingJoin) {
    return consumingJoin.provider
  }

  return undefined
}

const removeJoinByName = (state, joinName) => {
  const providing = getProviding(state)
  const consuming = getConsuming(state)

  return state
    .setIn(
      PATHS.PROVIDING,
      providing.filter(join => join.joinName !== joinName)
    )
    .setIn(
      PATHS.CONSUMING,
      consuming.filter(join => join.joinName !== joinName)
    )
}

const getAclWithoutPermissionsForChainId = (state, chainId) => {
  const aclAlias = `chain-${chainId}`
  const acl = getAcl(state)
  const actionPermissions = getActionPermissions(state)

  let nextActionPermissions

  const joinConfigActPerm = actionPermissions[REMOVE_JOIN_CONFIG]
  if (joinConfigActPerm.length > 1) {
    nextActionPermissions = actionPermissions.set(
      REMOVE_JOIN_CONFIG,
      joinConfigActPerm.filter(value => value !== aclAlias)
    )
  } else {
    nextActionPermissions = actionPermissions.without(REMOVE_JOIN_CONFIG)
  }

  const nextAcl = acl
    .set('roles', acl.roles.without(aclAlias))
    .set('actionPermissions', nextActionPermissions)

  return nextAcl
}

module.exports = revokeReadJoin

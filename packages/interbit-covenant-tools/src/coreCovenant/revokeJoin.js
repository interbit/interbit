const {
  providing: getProviding,
  consuming: getConsuming,
  acl: getAcl,
  actionPermissions: getActionPermissions,
  paths
} = require('./selectors')

const REMOVE_JOIN_CONFIG = '@@interbit/REMOVE_JOIN_CONFIG'

const revokeJoin = (state, joinName) => {
  let nextState = state

  const chainId = getChainIdForJoinName(state, joinName)
  if (!chainId) {
    return nextState
  }

  nextState = removeJoinByName(nextState, joinName)

  // If this is the last join for this chainID, remove permission
  // to remotely revoke join
  const remainingJoins = getJoinsForChainId(nextState, chainId)
  if (!remainingJoins.length) {
    const nextAcl = getAclWithoutPermissionsForChainId(nextState, chainId)
    nextState = nextState.setIn(paths.ACL, nextAcl)
  }

  // TODO: if this is a write join, carefully figure out acl
  // remove this specific join's actions

  return nextState
}

const getChainIdForJoinName = (state, joinName) => {
  const providing = getProviding(state)
  const consuming = getConsuming(state)

  const providingJoin = providing.find(join => join.joinName === joinName)
  const consumingJoin = consuming.find(join => join.joinName === joinName)

  let chainId
  if (providingJoin) {
    chainId = providingJoin.consumer
  }
  if (consumingJoin) {
    chainId = consumingJoin.provider
  }

  return chainId
}

const getJoinsForChainId = (state, chainId) => {
  const providing = getProviding(state)
  const consuming = getConsuming(state)

  const remainingProviding = providing.filter(join => join.consumer === chainId)
  const remainingConsuming = consuming.filter(join => join.consumer === chainId)

  return remainingProviding.concat(remainingConsuming)
}

const removeJoinByName = (state, joinName) => {
  const providing = getProviding(state)
  const consuming = getConsuming(state)

  return state
    .setIn(
      paths.PROVIDING,
      providing.filter(join => join.joinName !== joinName)
    )
    .setIn(
      paths.CONSUMING,
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

module.exports = {
  revokeJoin
}

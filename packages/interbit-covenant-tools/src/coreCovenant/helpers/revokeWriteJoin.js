const {
  providing: getProviding,
  consuming: getConsuming,
  roles: getRoles,
  actionPermissions: getActionPermissions,
  paths
} = require('../selectors')

const REMOVE_JOIN_CONFIG = '@@interbit/REMOVE_JOIN_CONFIG'
const WRITE_JOIN_PENDING_ACTIONS = 'WRITE-JOIN-PENDING-ACTIONS'
const WRITE_JOIN_ACTION_STATUS = 'WRITE-JOIN-ACTION-STATUS'

const revokeSendActions = (state, chainId) => {
  let nextState = state

  const nextProviding = getProviding(nextState).filter(
    join =>
      join.consumer !== chainId || join.joinName !== WRITE_JOIN_PENDING_ACTIONS
  )
  const nextConsuming = getConsuming(nextState).filter(
    join =>
      join.provider !== chainId || join.joinName !== WRITE_JOIN_ACTION_STATUS
  )

  nextState = nextState.setIn(paths.PROVIDING, nextProviding)
  nextState = nextState.setIn(paths.CONSUMING, nextConsuming)

  nextState = cleanupAcl(nextState, chainId)

  // TODO: Dare I also remove the queue of actions? Shared/sharing state?

  return nextState
}

const revokeReceiveActions = (state, chainId, actionType) => {
  let nextState = state

  const nextProviding = getProviding(nextState).filter(
    join =>
      join.consumer !== chainId || join.joinName !== WRITE_JOIN_ACTION_STATUS
  )
  const nextConsuming = getConsuming(nextState).filter(
    join =>
      join.provider !== chainId || join.joinName !== WRITE_JOIN_PENDING_ACTIONS
  )

  nextState = nextState.setIn(paths.PROVIDING, nextProviding)
  nextState = nextState.setIn(paths.CONSUMING, nextConsuming)

  nextState = cleanupAcl(nextState, chainId)

  const nextActionPermissions = getActionPermissions(nextState).without(
    actionType
  )
  nextState = nextState.setIn(paths.ACTION_PERMISSIONS, nextActionPermissions)

  return nextState
}

const cleanupAcl = (state, chainId) => {
  let nextState = state
  if (!hasJoinsForChainId(nextState, chainId)) {
    nextState = removeChainIdRemoveJoinConfigFromAcl(nextState, chainId)
  }
  return nextState
}

const hasJoinsForChainId = (state, chainId) => {
  const remainingProvidingForChainId = getProviding(state).filter(
    join => join.consumer === chainId
  )
  const remainingConsumingForChainId = getConsuming(state).filter(
    join => join.provider === chainId
  )

  return (
    remainingProvidingForChainId.length || remainingConsumingForChainId.length
  )
}

const removeChainIdRemoveJoinConfigFromAcl = (state, chainId) => {
  const nextRoles = getRoles(state).without(`chain-${chainId}`)
  const nextActionPermissions = getActionPermissions(state).without(
    REMOVE_JOIN_CONFIG
  )

  return state
    .setIn(paths.ROLES, nextRoles)
    .setIn(paths.ACTION_PERMISSIONS, nextActionPermissions)
}

module.exports = {
  revokeReceiveActions,
  revokeSendActions
}

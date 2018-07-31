const {
  providing: getProviding,
  consuming: getConsuming,
  roles: getRoles,
  actionPermissions: getActionPermissions
} = require('../selectors')
const { PATHS } = require('../constants')

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

  nextState = nextState.setIn(PATHS.PROVIDING, nextProviding)
  nextState = nextState.setIn(PATHS.CONSUMING, nextConsuming)

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

  nextState = nextState.setIn(PATHS.PROVIDING, nextProviding)
  nextState = nextState.setIn(PATHS.CONSUMING, nextConsuming)

  nextState = cleanupAcl(nextState, chainId)

  const nextActionPermissions = getActionPermissions(nextState).without(
    actionType
  )
  nextState = nextState.setIn(PATHS.ACTION_PERMISSIONS, nextActionPermissions)

  return nextState
}

const cleanupAcl = (state, chainId) => {
  let nextState = state
  if (!hasJoinsForChainId(nextState, chainId)) {
    nextState = aclWithoutChainIdActionPermissions(nextState, chainId)
  }
  return nextState
}

const hasJoinsForChainId = (state, chainId) => {
  const providing = getProviding(state)
  const consuming = getConsuming(state)

  return (
    providing.some(join => join.consumer === chainId) ||
    consuming.some(join => join.provider === chainId)
  )
}

const aclWithoutChainIdActionPermissions = (state, chainId) => {
  const nextRoles = getRoles(state).without(`chain-${chainId}`)
  const nextActionPermissions = getActionPermissions(state).without(
    REMOVE_JOIN_CONFIG
  )

  return state
    .setIn(PATHS.ROLES, nextRoles)
    .setIn(PATHS.ACTION_PERMISSIONS, nextActionPermissions)
}

module.exports = {
  revokeReceiveActions,
  revokeSendActions,
  hasJoinsForChainId
}

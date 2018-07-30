const INTERBIT = 'interbit'
const CONFIG = 'config'
const ACL = 'acl'

const paths = {
  CHAIN_ID: [INTERBIT, 'chainId'],
  CONFIG: [INTERBIT, CONFIG],
  CONSUMING: [INTERBIT, CONFIG, 'consuming'],
  PROVIDING: [INTERBIT, CONFIG, 'providing'],
  ACL: [INTERBIT, CONFIG, ACL],
  ACTION_PERMISSIONS: [INTERBIT, CONFIG, ACL, 'actionPermissions'],
  ROLES: [INTERBIT, CONFIG, ACL, 'roles'],
  BLOCKS: [INTERBIT, 'blocks'],
  SENT_ACTIONS: [INTERBIT, 'sent-actions'],
  PENDING_ACTIONS: ['pending-actions']
}

module.exports = {
  paths,
  acl: state => state.getIn(paths.ACL),
  actionPermissions: state => state.getIn(paths.ACTION_PERMISSIONS),
  chainId: state => state.getIn(paths.CHAIN_ID),
  config: state => state.getIn(paths.CONFIG),
  blocks: state => state.getIn(paths.BLOCKS),
  sentActions: state => state.getIn(paths.SENT_ACTIONS),
  pendingActionsForChain: (state, chainId) =>
    state.getIn([...paths.SENT_ACTIONS, chainId, ...paths.PENDING_ACTIONS]),
  providing: state => state.getIn(paths.PROVIDING),
  consuming: state => state.getIn(paths.CONSUMING),
  roles: state => state.getIn(paths.ROLES)
}

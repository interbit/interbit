const { PATHS } = require('./constants')

module.exports = {
  acl: state => state.getIn(PATHS.ACL),
  actionPermissions: state => state.getIn(PATHS.ACTION_PERMISSIONS),
  chainId: state => state.getIn(PATHS.CHAIN_ID),
  config: state => state.getIn(PATHS.CONFIG),
  sentActions: state => state.getIn(PATHS.SENT_ACTIONS),
  pendingActionsForChain: (state, chainId) =>
    state.getIn([...PATHS.SENT_ACTIONS, chainId, ...PATHS.PENDING_ACTIONS]),
  providing: state => state.getIn(PATHS.PROVIDING),
  consuming: state => state.getIn(PATHS.CONSUMING),
  roles: state => state.getIn(PATHS.ROLES),
  blockMaster: state => state.getIn(PATHS.BLOCK_MASTER)
}

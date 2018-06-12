const paths = {
  CHAIN_ID: ['interbit', 'chainId'],
  CONFIG: ['interbit', 'config'],
  BLOCKS: ['interbit', 'blocks'],
  SENT_ACTIONS: ['interbit', 'sent-actions'],
  PENDING_ACTIONS: ['pending-actions']
}

module.exports = {
  chainId: state => state.getIn(paths.CHAIN_ID),
  config: state => state.getIn(paths.CONFIG),
  blocks: state => state.getIn(paths.BLOCKS),
  sentActions: state => state.getIn(paths.SENT_ACTIONS),
  pendingActionsForChain: (state, chainId) =>
    state.getIn([...paths.SENT_ACTIONS, chainId, ...paths.PENDING_ACTIONS])
}

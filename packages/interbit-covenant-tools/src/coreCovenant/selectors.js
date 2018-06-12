const paths = {
  CHAIN_ID: ['interbit', 'chainId'],
  CONFIG: ['interbit', 'config'],
  BLOCKS: ['interbit', 'blocks']
}

module.exports = {
  chainId: state => state.getIn(paths.CHAIN_ID),
  config: state => state.getIn(paths.CONFIG),
  blocks: state => state.getIn(paths.BLOCKS)
}

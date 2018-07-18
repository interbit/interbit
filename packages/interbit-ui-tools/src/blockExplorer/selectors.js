const { NO_CHAIN_SELECTED } = require('./constants')

const emptyChainState = chainAlias => ({
  chainAlias,
  state: {},
  interbit: {},
  blocks: []
})

const getExploreChainState = (state, chainAlias) => {
  const {
    exploreChain,
    exploreChain: { selectedChain }
  } = state
  return (
    exploreChain.chains[chainAlias || selectedChain] ||
    exploreChain.chains[NO_CHAIN_SELECTED] ||
    emptyChainState(NO_CHAIN_SELECTED)
  )
}

const getExploreChainAliases = state => {
  const { exploreChain } = state
  return Object.keys(exploreChain.chains)
}

module.exports = {
  emptyChainState,
  getExploreChainState,
  getExploreChainAliases
}

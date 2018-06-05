const genesisBlockSelectors = require('./genesisBlockSelectors')
const {
  resolveGenesisBlocks,
  resolveChainIds
} = require('./resolveGenesisBlocks')

module.exports = {
  genesisBlockSelectors,
  resolveGenesisBlocks,
  resolveChainIdsFromGenesis: resolveChainIds
}

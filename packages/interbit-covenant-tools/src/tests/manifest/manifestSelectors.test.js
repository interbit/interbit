const assert = require('assert')
const manifestSelectors = require('../../manifest/manifestSelectors')
const defaultManifest = require('../testManifest')

const ROOT_CHAIN_ALIAS = 'interbitRoot'
const chainAlias = 'control'

describe('Manifest Selectors', () => {
  it('gets a chain ID by alias', () => {
    const expectedChainId = defaultManifest.chains[chainAlias]
    const actualChainId = manifestSelectors.getChainIdByAlias(
      chainAlias,
      defaultManifest
    )

    assert.equal(actualChainId, expectedChainId)
  })

  it('gets a genesis block by alias', () => {
    const expectedGenesisBlock = defaultManifest.genesisBlocks[chainAlias]
    const actualGenesisBlock = manifestSelectors.getGenesisBlockByAlias(
      chainAlias,
      defaultManifest
    )

    assert.deepStrictEqual(actualGenesisBlock, expectedGenesisBlock)
  })

  it('gets the block master by alias', () => {
    const expectedBlockMaster =
      defaultManifest.genesisBlocks[chainAlias].content.state.interbit.config
        .blockMaster
    const actualBlockMaster = manifestSelectors.getBlockMasterByAlias(
      chainAlias,
      defaultManifest
    )

    assert.equal(actualBlockMaster, expectedBlockMaster)
  })

  it('gets the covenant hash by chain alias', () => {
    const expectedCovenantHash = defaultManifest.covenants[chainAlias].hash
    const actualCovenantHash = manifestSelectors.getCovenantHashByAlias(
      chainAlias,
      defaultManifest
    )

    assert.equal(actualCovenantHash, expectedCovenantHash)
  })

  it('gets a child chain from the manifestTree by chain alias', () => {
    const expectedChildChain =
      defaultManifest.manifest[ROOT_CHAIN_ALIAS].chains.public
    const actualChildChain = manifestSelectors.getChildChainByAlias(
      'public',
      defaultManifest
    )

    assert.equal(actualChildChain, expectedChildChain)
  })
})

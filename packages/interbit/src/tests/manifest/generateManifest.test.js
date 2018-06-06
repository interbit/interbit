const assert = require('assert')
const { resolveGenesisBlocks } = require('../../manifest/generateManifest')
const { ROOT_CHAIN_ALIAS } = require('../../chainManagement/constants')
const {
  defaultConfig,
  defaultManifest,
  defaultCovenants
} = require('./testData')

describe('generateManifest(location, interbitConfig, covenants, originalManifest)', () => {
  it('replaces apps config')
  it('replaces peers list')
  it('replaces covenants')

  describe('resolveGenesisBlocks(config, originalManifest, covenants)', () => {
    it('makes all new genesis blocks when there is no existing manifest', () => {
      const config = { ...defaultConfig }
      const originalManifest = undefined
      const covenants = { ...defaultCovenants }

      const result = resolveGenesisBlocks(config, originalManifest, covenants)

      const actualGenesisKeys = Object.keys(result)
      const expectedGenesisKeys = Object.keys(config.staticChains).concat(
        ROOT_CHAIN_ALIAS
      )

      assert.ok(result)
      assert.deepEqual(actualGenesisKeys, expectedGenesisKeys)
    })

    it('makes new genesis blocks when some are present in existing manifest', () => {
      const expectedRootGenesisBlock =
        defaultManifest.genesisBlocks[ROOT_CHAIN_ALIAS]

      const config = { ...defaultConfig }
      const originalManifest = {
        ...defaultManifest,
        chains: {
          [ROOT_CHAIN_ALIAS]: defaultManifest.chains[ROOT_CHAIN_ALIAS]
        },
        genesisBlocks: {
          [ROOT_CHAIN_ALIAS]: expectedRootGenesisBlock
        }
      }
      const covenants = { ...defaultCovenants }

      const result = resolveGenesisBlocks(config, originalManifest, covenants)

      const actualGenesisKeys = Object.keys(result)
      const expectedGenesisKeys = Object.keys(config.staticChains).concat(
        ROOT_CHAIN_ALIAS
      )

      assert.ok(result)
      assert.deepEqual(actualGenesisKeys, expectedGenesisKeys)
      assert.deepEqual(result[ROOT_CHAIN_ALIAS], expectedRootGenesisBlock)
    })

    it('does not include chains in existing manifest that are not in config', () => {
      const config = {
        ...defaultConfig,
        staticChains: {
          public: {
            ...defaultConfig.staticChains.public
          }
        }
      }
      const originalManifest = { ...defaultManifest }
      const covenants = { ...defaultCovenants }

      const result = resolveGenesisBlocks(config, originalManifest, covenants)

      const actualGenesisKeys = Object.keys(result)
      const expectedGenesisKeys = [ROOT_CHAIN_ALIAS, 'public']

      assert.ok(result)
      assert.equal(actualGenesisKeys.length, expectedGenesisKeys.length)
      for (const key of actualGenesisKeys) {
        const isExpectedKey = expectedGenesisKeys.indexOf(key) > -1
        assert.equal(isExpectedKey, true)
      }
    })
  })
})

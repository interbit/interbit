const should = require('should')
const { generateManifest } = require('../../manifest/generateManifest')
const { ROOT_CHAIN_ALIAS } = require('../../chainManagement/constants')
const {
  defaultConfig,
  defaultManifest,
  defaultCovenants
} = require('../testData')

const location = '/tmp'

describe('generateManifest(location, interbitConfig, covenants, originalManifest)', () => {
  it('replaces apps config but not genesis blocks if apps config changes', () => {
    const apps = {
      ...defaultConfig.apps,
      newApp: {
        peers: ['meowmeowmeow.com'],
        chains: ['control'],
        appChain: 'control',
        indexLocation: 'public/index.html',
        buildLocation: 'build/'
      }
    }
    const config = {
      ...defaultConfig,
      apps
    }
    const manifest = generateManifest(
      location,
      config,
      defaultCovenants,
      defaultManifest
    )

    should.ok(manifest.apps.newApp)
    should.ok(manifest.apps.newApp.buildLocation)
    should.equal(manifest.apps.newApp.appChain, apps.newApp.appChain)
    should.deepEqual(manifest.apps.newApp.browserChains, apps.newApp.chains)
    should.deepEqual(manifest.genesisBlocks, defaultManifest.genesisBlocks)
  })

  it('replaces peers list but not genesis blocks if just the peers list has changed', () => {
    const peers = ['meowmeowmeow.com', 'baobaobao.com']
    const config = {
      ...defaultConfig,
      peers
    }
    const manifest = generateManifest(
      location,
      config,
      defaultCovenants,
      defaultManifest
    )

    should.deepEqual(peers, manifest.peers)
    should.deepEqual(manifest.genesisBlocks, defaultManifest.genesisBlocks)
  })

  it('replaces covenants but not genesis blocks if only covenants have changed', () => {
    const covenants = {
      ...defaultCovenants,
      public: {
        hash: 'meowmeowmeowmeowmeowmeow',
        filename: 'newCovenantFilename/meowmeowmeowmeowmeowmeow.tgz'
      }
    }
    const manifest = generateManifest(
      location,
      defaultConfig,
      covenants,
      defaultManifest
    )

    should.deepEqual(covenants, manifest.covenants)
    should.deepEqual(manifest.genesisBlocks, defaultManifest.genesisBlocks)
  })

  it('throws when there is no adult present to cascade manifest changes', () => {
    const config = {
      ...defaultConfig,
      staticChains: {
        public: {
          ...defaultConfig.staticChains.public,
          childChains: ['control']
        },
        control: {
          ...defaultConfig.staticChains.control,
          childChains: ['public']
        }
      }
    }

    should(() => {
      generateManifest(location, config, defaultCovenants)
    }).throw(
      /Config contains malformed childChains structure. ChildChains must form one or many trees when constructed./
    )
  })

  it('throws when there is a cycle and an unattached chain', () => {
    const config = {
      ...defaultConfig,
      staticChains: {
        public: {
          ...defaultConfig.staticChains.public,
          childChains: ['control']
        },
        control: {
          ...defaultConfig.staticChains.control,
          childChains: ['public']
        },
        unattached: {
          ...defaultConfig.staticChains.control,
          childChains: ['public']
        }
      }
    }

    should(() => {
      generateManifest(location, config, defaultCovenants)
    }).throw(
      /Config contains malformed childChains structure and must form one or many trees. "public" was referenced twice./
    )
  })

  it('forms a tree structure based on childChains', () => {
    const config = {
      ...defaultConfig,
      staticChains: {
        control: {
          ...defaultConfig.staticChains.control,
          childChains: ['public']
        },
        public: {
          ...defaultConfig.staticChains.public,
          childChains: ['grandchild']
        },
        grandchild: {
          ...defaultConfig.staticChains.public
        }
      }
    }

    console.log(config)
    const manifest = generateManifest(location, config, defaultCovenants)

    should.ok(manifest.manifest)
    should.ok(manifest.manifest[ROOT_CHAIN_ALIAS])
    should.ok(manifest.manifest[ROOT_CHAIN_ALIAS].chains.control)
    should.ok(manifest.manifest[ROOT_CHAIN_ALIAS].chains.control.chains.public)
    should.ok(
      manifest.manifest[ROOT_CHAIN_ALIAS].chains.control.chains.public.chains
        .grandchild
    )
  })

  it('makes unattached static chains children of the root', () => {
    const manifest = generateManifest(location, defaultConfig, defaultCovenants)

    should.ok(manifest.manifest)
    should.ok(manifest.manifest[ROOT_CHAIN_ALIAS])
    should.ok(manifest.manifest[ROOT_CHAIN_ALIAS].chains.control)
    should.ok(manifest.manifest[ROOT_CHAIN_ALIAS].chains.public)
  })
})

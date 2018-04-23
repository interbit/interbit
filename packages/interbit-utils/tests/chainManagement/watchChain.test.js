const assert = require('assert')
const { diffManifest } = require('../../src/chainManagement/watchChain')

const manifest = {
  peers: ['localhost:5000'],
  apps: {
    template: {
      appChain: 'public',
      buildLocation: '../build',
      browserChains: ['public']
    }
  },
  covenants: {
    public: {
      hash: '4aec30b1eec215d0ae37f6c8798957f0be0e3e5f1a0eaab99de1f2124cce65e2',
      filename:
        'covenants/4aec30b1eec215d0ae37f6c8798957f0be0e3e5f1a0eaab99de1f2124cce65e2.tgz'
    },
    control: {
      hash: 'c0e27a01989d18ce256fa640de65d563e9e749a8e4374d21a77e4143a363d63a',
      filename:
        'covenants/c0e27a01989d18ce256fa640de65d563e9e749a8e4374d21a77e4143a363d63a.tgz'
    },
    private: {
      hash: 'c5006bf9f1b637ef20f855031fe4c9937d1b2b6a0e355b1812544afd8221a432',
      filename:
        'covenants/c5006bf9f1b637ef20f855031fe4c9937d1b2b6a0e355b1812544afd8221a432.tgz'
    }
  },
  chains: {
    public: '4a23a5ad1756ff2a2477ff83322917c5a762eaf27a03196e88e721516f1c6090',
    control: '737f4950315c5863184d88dbabeff14bd88c1aff1f306111829f6b654ddb2b09',
    interbitRoot:
      '4b1df0cb00660411169b6cd67d89ab0f77408da8a8b5a7496fcb5912bf12e6ab'
  },
  genesisBlocks: {
    public: {
      blockHash:
        '4a23a5ad1756ff2a2477ff83322917c5a762eaf27a03196e88e721516f1c6090'
    },
    control: {
      blockHash:
        '737f4950315c5863184d88dbabeff14bd88c1aff1f306111829f6b654ddb2b09'
    },
    interbitRoot: {
      blockHash:
        '4b1df0cb00660411169b6cd67d89ab0f77408da8a8b5a7496fcb5912bf12e6ab'
    }
  },
  manifest: {
    // TODO: The tree! Blocked by #336
  }
}

describe('watchChain', () => {
  it('errors if the genesis blocks have changed when chains already exist')

  describe('diffManifest(prevManifest, currManifest)', () => {
    it('does a deep diff for manifest updates', () => {
      const changes = {
        public: {
          hash: '123456789',
          filename: '123456789.tgz'
        }
      }

      const prev = manifest
      const curr = {
        ...manifest,
        covenants: {
          ...manifest.covenants,
          ...changes
        }
      }

      const actualDiff = diffManifest(prev, curr)

      const expectedDiff = {
        covenants: {
          ...changes
        }
      }

      assert.deepEqual(actualDiff, expectedDiff)
    })

    it('only shows a positive diff (ie. it does not indicate removals, just additions to obj)', () => {
      const changes = {
        public: {
          hash: '123456789'
        }
      }

      const prev = manifest
      const curr = {
        ...manifest,
        covenants: {
          ...manifest.covenants,
          ...changes
        }
      }

      const actualDiff = diffManifest(prev, curr)

      const expectedDiff = {
        covenants: {
          ...changes
        }
      }

      assert.deepEqual(actualDiff, expectedDiff)
    })
  })
})

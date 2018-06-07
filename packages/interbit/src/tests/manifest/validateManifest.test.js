const should = require('should')
const { ROOT_CHAIN_ALIAS } = require('../../chainManagement/constants')
const validateManifest = require('../../manifest/validateManifest')
const { defaultManifest } = require('../testData')

const rootGenesis = defaultManifest.genesisBlocks[ROOT_CHAIN_ALIAS]

describe('validateManifest', () => {
  it('returns true when manifest is A-OK', () => {
    const result = validateManifest(defaultManifest)
    should.equal(result, true)
  })

  it('throws when properties in chains are not chains IDs', () => {
    const manifest = {
      ...defaultManifest,
      chains: {
        public: 'mana mana',
        controle: 'dun duuuh da da da',
        [ROOT_CHAIN_ALIAS]: 'mana mana'
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Chains in manifest are not real chain IDs$/)
  })

  it('throws when there is no chains property', () => {
    const manifest = {
      ...defaultManifest,
      chains: undefined
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Manifest is missing chains prop$/)
  })

  it('throws when there is no manifest property', () => {
    const manifest = {
      ...defaultManifest,
      manifest: undefined
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Manifest is missing manifest prop$/)
  })

  it('throws when there is no genesisBlocks property', () => {
    const manifest = {
      ...defaultManifest,
      genesisBlocks: undefined
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Manifest is missing genesisBlocks prop$/)
  })

  it('throws when app is missing a buildLocation', () => {
    const manifest = {
      ...defaultManifest,
      apps: {
        template: {
          ...defaultManifest.apps.template,
          buildLocation: undefined
        }
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/App "template" in manifest is missing buildLocation$/)
  })

  it('throws when app is missing appChain', () => {
    const manifest = {
      ...defaultManifest,
      apps: {
        template: {
          ...defaultManifest.apps.template,
          appChain: undefined
        }
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/App "template" in manifest is missing appChain$/)
  })

  it("throws when app's appChain is not a configured chain", () => {
    const manifest = {
      ...defaultManifest,
      apps: {
        template: {
          ...defaultManifest.apps.template,
          appChain: 'monster'
        }
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/App "template" in manifest uses unresolved appChain "monster"$/)
  })

  it('throws when covenant is missing a hash', () => {
    const manifest = {
      ...defaultManifest,
      covenants: {
        ...defaultManifest.covenants,
        public: {
          ...defaultManifest.covenants.public,
          hash: undefined
        }
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Covenant "public" is missing the hash prop/)
  })

  it('throws when covenant is missing a filename', () => {
    const manifest = {
      ...defaultManifest,
      covenants: {
        ...defaultManifest.covenants,
        public: {
          ...defaultManifest.covenants.public,
          filename: undefined
        }
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Covenant "public" is missing the filename prop/)
  })

  it('throws when genesis blocks are malformed', () => {
    const malformedGenesisBlock = {
      name: 'Kermit',
      species: 'frog',
      likes: ['answering the phone', 'telling folks someone is not home'],
      dislikes: ['when someone interrupts a phonecall to sing', 'mana mana']
    }
    const manifest = {
      ...defaultManifest,
      genesisBlocks: {
        ...defaultManifest.genesisBlocks,
        [ROOT_CHAIN_ALIAS]: malformedGenesisBlock
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Genesis block for "interbitRoot" is malformed/)
  })

  it('throws when genesis block does not have a blockmaster', () => {
    const malformedGenesisBlock = {
      ...rootGenesis,
      content: {
        ...rootGenesis.content,
        state: {
          ...rootGenesis.content.state,
          interbit: {
            ...rootGenesis.content.state.interbit,
            config: {
              ...rootGenesis.content.state.interbit.config,
              blockMaster: undefined
            }
          }
        }
      }
    }

    const manifest = {
      ...defaultManifest,
      genesisBlocks: {
        ...defaultManifest.genesisBlocks,
        [ROOT_CHAIN_ALIAS]: malformedGenesisBlock
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Genesis block for "interbitRoot" has no blockMaster/)
  })

  it('throws when chain IDs do not have corresponding genesis blocks', () => {
    const manifest = {
      ...defaultManifest,
      genesisBlocks: {
        ...defaultManifest.genesisBlocks,
        public: undefined
      }
    }

    should(() => {
      validateManifest(manifest)
    }).throw(/Chain "public" is missing a genesis block/)
  })

  it('returns true when genesis block contains covenant hash that is not available', () => {
    const malformedGenesisBlock = {
      ...rootGenesis,
      content: {
        ...rootGenesis.content,
        state: {
          ...rootGenesis.content.state,
          interbit: {
            ...rootGenesis.content.state.interbit,
            config: {
              ...rootGenesis.content.state.interbit.config,
              covenantHash: 'mana mana'
            }
          }
        }
      }
    }

    const manifest = {
      ...defaultManifest,
      genesisBlocks: {
        ...defaultManifest.genesisBlocks,
        [ROOT_CHAIN_ALIAS]: malformedGenesisBlock
      }
    }

    // This is because the genesis blocks do not change but we can update covenants later
    const result = validateManifest(manifest)

    should.equal(result, true)
  })
})

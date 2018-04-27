const path = require('path')
const should = require('should')
const { validateConfig } = require('../../src/rootCovenant/validateConfig')

const defaultConfig = {
  peers: ['localhost:5000', 'localhost:5050'], // First peers to connect to
  masterChain: 'hub',
  chains: {
    hub: {
      covenant: 'hub',
      runsInBrowser: true, // Insert chain ID into index.html,
      config: {
        maxBlockSize: 9001,
        validators: ['pubKey1', 'pubKey2'],
        joins: {
          consume: [],
          provide: [],
          receiveActionFrom: [
            {
              alias: 'spoke',
              authorizedActions: ['DO_A_THING']
            }
          ],
          sendActionTo: [{ alias: 'spoke' }]
        }
      },
      childValidators: ['pubKey1', 'pubKey2', 'pubKey3', 'pubKey4', 'pubKey5'],
      genesisTemplate: {
        covenantHash: 'spoke',
        parentChain: 'hub',
        validators: ['pubKey3', 'pubKey4', 'pubKey5'],
        acl: {
          doSomething: 'may contain any pubkey'
        }
      }
    },
    spoke: {
      covenant: 'spoke',
      parentChain: 'hub',
      config: {
        validators: ['pubKey3', 'pubKey4', 'pubKey5'],
        joins: {
          consume: [],
          provide: [],
          receiveActionFrom: [
            {
              alias: 'hub',
              authorizedActions: ['DO_A_THING']
            }
          ],
          sendActionTo: [{ alias: 'hub' }]
        }
      }
    },
    directory: 'dashj934ujq2ined0ww8q4j3i2lmd9wau3445jo'
  },
  covenants: {
    hub: {
      location: path.join(__dirname, 'hub')
    },
    spoke: {
      location: path.join(__dirname, 'spoke')
    }
  }
}

describe('validateConfig(config)', () => {
  it('passes when all joins are paired', () => {
    const config = { ...defaultConfig }
    const isValid = validateConfig(config)

    should.equal(isValid, true)
  })

  it('fails when join is missing an alias', () => {
    const config = {
      ...defaultConfig,
      chains: {
        hub: {
          covenant: 'hub',
          config: {
            joins: {
              receiveActionFrom: [{}]
            }
          }
        }
      }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"receiveActionFrom" join in "hub" chain is missing an alias$/)
  })

  it('fails when aliased join is missing a pair', () => {
    const config = {
      ...defaultConfig,
      chains: {
        hub: {
          covenant: 'hub',
          config: {
            joins: {
              receiveActionFrom: [
                {
                  alias: 'spoke'
                }
              ]
            }
          }
        }
      }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"receiveActionFrom" join in "hub" chain referenced "spoke" but it is unconfigured$/)
  })

  it('fails when corresponding aliased join is not correctly configured', () => {
    const config = {
      ...defaultConfig,
      chains: {
        hub: {
          covenant: 'hub',
          config: {
            joins: {
              consume: [
                {
                  alias: 'spoke'
                }
              ]
            }
          }
        },
        spoke: {
          covenant: 'hub',
          config: {
            joins: {
              provide: []
            }
          }
        }
      }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"hub" and "spoke" do not have matching join configuration$/)
  })

  it('fails when consume join is not properly formed', () => {
    const config = {
      ...defaultConfig,
      chains: {
        hub: {
          covenant: 'hub',
          config: {
            joins: {
              consume: [
                {
                  alias: 'spoke'
                }
              ]
            }
          }
        },
        spoke: {
          covenant: 'hub',
          config: {
            joins: {
              provide: [
                {
                  alias: 'hub'
                }
              ]
            }
          }
        }
      }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"path" property is required in join config$/)
  })

  it('fails when provide join is not properly formed', () => {
    const config = {
      ...defaultConfig,
      chains: {
        hub: {
          covenant: 'hub',
          config: {
            joins: {
              provide: [
                {
                  alias: 'spoke',
                  path: 'asd'
                }
              ]
            }
          }
        },
        spoke: {
          covenant: 'hub',
          config: {
            joins: {
              consume: [
                {
                  alias: 'hub'
                }
              ]
            }
          }
        }
      }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"joinName" property is required in join config$/)
  })

  it('fails when receiveActionFrom join is not properly formed', () => {
    const config = {
      ...defaultConfig,
      chains: {
        hub: {
          covenant: 'hub',
          config: {
            joins: {
              receiveActionFrom: [
                {
                  alias: 'spoke'
                }
              ]
            }
          }
        },
        spoke: {
          covenant: 'hub',
          config: {
            joins: {
              sendActionTo: [
                {
                  alias: 'hub'
                }
              ]
            }
          }
        }
      }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"authorizedActions" property is required in join config$/)
  })

  it('passes when required props are present', () => {
    const config = {
      peers: [],
      chains: {},
      covenants: {}
    }
    const isValid = validateConfig(config)
    should.equal(isValid, true)
  })

  it('fails when missing peers', () => {
    const config = {
      chains: { ...defaultConfig.chains },
      covenants: { ...defaultConfig.covenants }
    }

    should.throws(() => {
      validateConfig(config)
    }, /"peers" property is required in config$/)
  })

  it('fails when missing chains', () => {
    const config = {
      peers: [...defaultConfig.peers],
      covenants: { ...defaultConfig.covenants }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"chains" property is required in config$/)
  })

  it('fails when missing covenants', () => {
    const config = {
      peers: [...defaultConfig.peers],
      chains: { ...defaultConfig.chains }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"covenants" property is required in config$/)
  })

  it('fails when chain does not reference a covenant', () => {
    const config = {
      peers: [],
      chains: {
        chain1: {}
      },
      covenants: {}
    }
    should.throws(() => {
      validateConfig(config)
    }, /chain does not reference a covenant$/)
  })

  it('fails when a aliased covenant is not configured', () => {
    const config = {
      ...defaultConfig,
      covenants: {
        hub: defaultConfig.covenants.hub
      }
    }

    should.throws(() => {
      validateConfig(config)
    }, /"spoke" referenced covenant "spoke" but it is not configured$/)
  })

  it('fails when unsupported props are present', () => {
    const config = {
      ...defaultConfig,
      meow: 'meowmeowmeow',
      bao: 'yumyumyum'
    }
    should.throws(() => {
      validateConfig(config)
    }, /Config contains unsupported props: meow,bao$/)
  })

  it('passes when there is no master chain', () => {
    const config = {
      peers: [...defaultConfig.peers],
      chains: { ...defaultConfig.chains },
      covenants: { ...defaultConfig.covenants }
    }
    const isValid = validateConfig(config)

    should.equal(isValid, true)
  })

  it('passes when there is a master chain', () => {
    const config = { ...defaultConfig }
    const isValid = validateConfig(config)

    should.equal(isValid, true)
  })

  it('fails when chain structure contains cycles', () => {
    const config = {
      peers: [...defaultConfig.peers],
      masterChain: 'chain1',
      chains: {
        chain1: {
          covenant: 'hub',
          parentChain: 'chain3'
        },
        chain2: {
          covenant: 'hub',
          parentChain: 'chain1'
        },
        chain3: {
          covenant: 'hub',
          parentChain: 'chain2'
        },
        chain4: {
          covenant: 'hub'
        }
      },
      covenants: { ...defaultConfig.covenants }
    }

    should.throws(() => {
      validateConfig(config)
    }, /"chain1" cannot be added to manifest again: it is already a parent node$/)
  })

  it('passes when chain structure is a tree', () => {
    const config = {
      ...defaultConfig,
      masterChain: 'chain1',
      chains: {
        chain1: {
          covenant: 'hub'
        },
        chain2: {
          covenant: 'hub',
          parentChain: 'chain1'
        },
        chain3: {
          covenant: 'hub',
          parentChain: 'chain2'
        },
        chain4: {
          covenant: 'hub',
          parentChain: 'chain1'
        },
        chain5: {
          covenant: 'hub',
          parentChain: 'chain4'
        },
        chain6: {
          covenant: 'hub',
          parentChain: 'chain4'
        },
        chain7: {
          covenant: 'hub',
          parentChain: 'chain6'
        }
      }
    }
    const isValid = validateConfig(config)

    should.equal(isValid, true)
  })

  it('passes when chain structure is a single chain', () => {
    const config = {
      ...defaultConfig,
      masterChain: 'chain',
      chains: {
        chain: {
          covenant: 'hub'
        }
      }
    }

    const isValid = validateConfig(config)

    should.equal(isValid, true)
  })
})

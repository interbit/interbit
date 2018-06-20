const path = require('path')
const should = require('should')
const validateConfig = require('../../config/validateConfig')

const defaultConfig = {
  peers: ['localhost:5000', 'localhost:5050'], // First peers to connect to
  staticChains: {
    hub: {
      covenant: 'hub',
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

const apps = {
  hub: {
    peers: ['localhost:5000'],
    chains: ['hub', 'spoke'],
    appChain: 'hub',
    indexLocation: path.join(__dirname, 'public/index.html'),
    buildLocation: path.join(__dirname, 'build')
  }
}

describe('validateConfig(config)', () => {
  it('passes when all joins are paired', () => {
    const config = { ...defaultConfig }
    const wellFormedConfig = validateConfig(config)

    should.ok(wellFormedConfig)
  })

  it('returns a well formed config if parts are missing', () => {
    const poorlyFormedValidConfig = {
      staticChains: {
        hub: {
          covenant: 'one'
        },
        spoke: {
          covenant: 'one'
        }
      },
      covenants: {
        one: {
          location: 'covenantDir'
        }
      }
    }

    const expectedConfig = {
      peers: [],
      covenants: {
        one: {
          location: 'covenantDir'
        }
      },
      staticChains: {
        hub: {
          covenant: 'one',
          childChains: [],
          config: {
            validators: [],
            joins: {
              consume: [],
              provide: [],
              receiveActionFrom: [],
              sendActionTo: []
            }
          }
        },
        spoke: {
          covenant: 'one',
          childChains: [],
          config: {
            validators: [],
            joins: {
              consume: [],
              provide: [],
              receiveActionFrom: [],
              sendActionTo: []
            }
          }
        }
      },
      apps: {}
    }

    const wellFormedConfig = validateConfig(poorlyFormedValidConfig)

    should.deepEqual(wellFormedConfig, expectedConfig)
  })

  it('throws when covenant does not have a file location', () => {
    const config = {
      ...defaultConfig,
      covenants: {
        ...defaultConfig.covenants,
        hub: {}
      }
    }

    should.throws(() => {
      validateConfig(config)
    }, /Covenant "hub" does not contain a location/)
  })

  it('fails when join is missing an alias', () => {
    const config = {
      ...defaultConfig,
      staticChains: {
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
      staticChains: {
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
      staticChains: {
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
      staticChains: {
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
      staticChains: {
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
      staticChains: {
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
      staticChains: {},
      covenants: {}
    }
    const wellFormedConfig = validateConfig(config)
    should.ok(wellFormedConfig)
  })

  it('fails when missing staticChains', () => {
    const config = {
      peers: [...defaultConfig.peers],
      covenants: { ...defaultConfig.covenants }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"staticChains" property is required in config$/)
  })

  it('fails when missing covenants', () => {
    const config = {
      peers: [...defaultConfig.peers],
      staticChains: { ...defaultConfig.chains }
    }
    should.throws(() => {
      validateConfig(config)
    }, /"covenants" property is required in config$/)
  })

  it('fails when chain does not reference a covenant', () => {
    const config = {
      peers: [],
      staticChains: {
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

  it.skip('fails when chain structure contains cycles', () => {
    const config = {
      peers: [...defaultConfig.peers],
      staticChains: {
        chain1: {
          covenant: 'hub',
          childChains: ['chain3']
        },
        chain2: {
          covenant: 'hub',
          childChains: ['chain1']
        },
        chain3: {
          covenant: 'hub',
          childChains: ['chain2']
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

  // TODO: Validate shape of childChains in config
  it.skip('passes when chain structure is a tree', () => {
    const config = {
      ...defaultConfig,
      staticChains: {
        chain1: {
          covenant: 'hub',
          childChains: ['chain2', 'chain4']
        },
        chain2: {
          covenant: 'hub',
          childChains: ['chain3']
        },
        chain3: {
          covenant: 'hub'
        },
        chain4: {
          covenant: 'hub',
          childChains: ['chain5', 'chain6']
        },
        chain5: {
          covenant: 'hub'
        },
        chain6: {
          covenant: 'hub',
          childChains: ['chain7']
        },
        chain7: {
          covenant: 'hub'
        }
      }
    }
    const wellFormedConfig = validateConfig(config)

    should.ok(wellFormedConfig)
  })

  it('passes when chain structure is a single chain', () => {
    const config = {
      ...defaultConfig,
      staticChains: {
        chain: {
          covenant: 'hub'
        }
      }
    }

    const wellFormedConfig = validateConfig(config)

    should.ok(wellFormedConfig)
  })

  it('passes when apps are correctly configured', () => {
    const config = {
      ...defaultConfig,
      apps: {
        ...apps
      }
    }

    const wellFormedConfig = validateConfig(config)

    should.ok(wellFormedConfig)
  })

  it('fails when apps are missing props', () => {
    const config = {
      ...defaultConfig,
      apps: {
        app: {}
      }
    }

    should.throws(() => {
      validateConfig(config)
    }, /"peers" property is required in app config$/)
  })

  it('fails when apps reference unconfigured chains', () => {
    const config = {
      ...defaultConfig,
      apps: {
        hub: {
          ...apps.hub,
          chains: ['incorrect']
        }
      }
    }

    should.throws(() => {
      validateConfig(config)
    }, /app "hub" references unconfigured chain "incorrect"$/)
  })

  it('returns true when apps reference unconfigured peers', () => {
    const config = {
      ...defaultConfig,
      apps: {
        hub: {
          ...apps.hub,
          peers: ['localhost']
        }
      }
    }
    const wellFormedConfig = validateConfig(config)
    should.ok(wellFormedConfig)
  })

  it('fails when apps reference unconfigured appChain', () => {
    const config = {
      ...defaultConfig,
      apps: {
        hub: {
          ...apps.hub,
          appChain: 'meowmeowmeow'
        }
      }
    }

    should.throws(() => {
      validateConfig(config)
    }, /app "hub" references unconfigured appChain "meowmeowmeow"$/)
  })
})

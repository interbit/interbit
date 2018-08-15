const PUBLIC_KEY = 'SuperSecurePubKey'
const defaultConfig = {
  peers: ['localhost:5000'],
  adminValidators: [PUBLIC_KEY],
  staticChains: {
    public: {
      covenant: 'public',
      config: {
        validators: [PUBLIC_KEY],
        joins: {
          consume: [
            {
              alias: 'control',
              path: ['interbitServices'],
              joinName: 'INTERBIT_SERVICES'
            }
          ]
        }
      }
    },
    control: {
      covenant: 'control',
      defaultChain: true,
      config: {
        validators: [PUBLIC_KEY],
        joins: {
          provide: [
            {
              alias: 'public',
              path: ['interbitServices', 'shared'],
              joinName: 'INTERBIT_SERVICES'
            }
          ]
        }
      }
    }
  },
  covenants: {
    public: {
      location: 'src/interbit/public'
    },
    control: {
      location: 'src/interbit/public'
    }
  },
  apps: {
    template: {
      peers: ['localhost:5000'],
      chains: ['public'],
      appChain: 'public',
      indexLocation: 'public/index.html',
      buildLocation: 'build/'
    }
  }
}

const defaultManifest = {
  peers: ['localhost:5000'],
  apps: {
    template: {
      appChain: 'public',
      buildLocation:
        '../home/btl/Documents/Repositories/interbit/packages/interbit/build',
      browserChains: ['public']
    }
  },
  covenants: {
    control: {
      filename:
        'covenants/1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa.tgz',
      hash: '1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa'
    },
    private: {
      filename:
        'covenants/b7cc42ba4e4e67aa4783c113cadd3d5e6ad71a18d57f6e3da31b4c76aa5bd6ea.tgz',
      hash: 'b7cc42ba4e4e67aa4783c113cadd3d5e6ad71a18d57f6e3da31b4c76aa5bd6ea'
    },
    public: {
      filename:
        'covenants/72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775.tgz',
      hash: '72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775'
    },
    interbitRoot: {
      filename:
        'covenants/4fd5sca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775.tgz',
      hash: '4fd5sca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775'
    }
  },
  chains: {
    public: '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
    control: '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
    interbitRoot:
      '56399770d33b17fe3ba20a1d911cc56c3cc47ed11fc8f6935543c2b25da96f47'
  },
  genesisBlocks: {
    public: {
      blockHash:
        '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
      content: {
        actions: [],
        configChanged: true,
        errors: {},
        height: 0,
        previousHash: 'genesis',
        redispatches: {},
        seed: 0.4189617309531841,
        state: {
          interbit: {
            config: {
              acl: {
                actionPermissions: {
                  '*': ['root']
                },
                roles: {
                  root: ['SuperSecurePubKey']
                }
              },
              blockMaster: 'SuperSecurePubKey',
              consensus: 'PoA',
              consuming: [],
              providing: []
            },
            configChanges: {}
          }
        },
        stateHash:
          'da1123ac3d84634e39a8b5d2d18825491e82ba84585f1dcbfd49b0a4c7561bc5',
        timestamp: 1528753978382,
        timeToCreateBlock: 1
      },
      contentHash:
        '315a522f20ea39866d651e3ff29d91abf80ad37783e264d805ee058f1812d278',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce'
    },
    control: {
      blockHash:
        '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
      content: {
        actions: [],
        configChanged: true,
        errors: {},
        height: 0,
        previousHash: 'genesis',
        redispatches: {},
        seed: 0.7064943244658086,
        state: {
          interbit: {
            config: {
              acl: {
                actionPermissions: {
                  '*': ['root']
                },
                roles: {
                  root: ['SuperSecurePubKey']
                }
              },
              blockMaster: 'SuperSecurePubKey',
              consensus: 'PoA',
              consuming: [],
              providing: []
            },
            configChanges: {}
          }
        },
        stateHash:
          'da1123ac3d84634e39a8b5d2d18825491e82ba84585f1dcbfd49b0a4c7561bc5',
        timestamp: 1528753978384,
        timeToCreateBlock: 0
      },
      contentHash:
        '295b1f027b2581fe85700bd549d858f676406ae5f825f925dca848c78ed47574',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce'
    },
    interbitRoot: {
      blockHash:
        '56399770d33b17fe3ba20a1d911cc56c3cc47ed11fc8f6935543c2b25da96f47',
      content: {
        actions: [],
        configChanged: true,
        errors: {},
        height: 0,
        previousHash: 'genesis',
        redispatches: {},
        seed: 0.6957048809469053,
        state: {
          interbit: {
            config: {
              acl: {
                actionPermissions: {
                  '*': ['root']
                },
                roles: {
                  root: ['SuperSecurePubKey']
                }
              },
              blockMaster: 'SuperSecurePubKey',
              consensus: 'PoA',
              consuming: [],
              providing: []
            },
            configChanges: {}
          }
        },
        stateHash:
          'da1123ac3d84634e39a8b5d2d18825491e82ba84585f1dcbfd49b0a4c7561bc5',
        timestamp: 1528753978385,
        timeToCreateBlock: 0
      },
      contentHash:
        '1162a76294772d11c2e10a9022fd685cbfb4f6dde373c51645d3a04efa62ad66',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce'
    }
  },
  manifest: {
    interbitRoot: {
      alias: 'interbitRoot',
      chainId:
        '56399770d33b17fe3ba20a1d911cc56c3cc47ed11fc8f6935543c2b25da96f47',
      chainIdMap: {
        control:
          '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
        public:
          '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f'
      },
      validators: ['SuperSecurePubKey'],
      covenant: 'interbitRoot',
      covenantHashMap: {
        interbitRoot:
          '4fd5sca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775',
        control:
          '1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa',
        public:
          '72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775'
      },
      joins: {
        sendActionTo: [
          {
            alias: 'public'
          },
          {
            alias: 'control'
          }
        ],
        receiveActionFrom: []
      },
      chains: {
        public: {
          alias: 'public',
          chainId:
            '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
          chainIdMap: {
            control:
              '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
            interbitRoot:
              '56399770d33b17fe3ba20a1d911cc56c3cc47ed11fc8f6935543c2b25da96f47'
          },
          validators: ['SuperSecurePubKey'],
          covenant: 'public',
          covenantHashMap: {
            public:
              '72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775'
          },
          joins: {
            consume: [
              {
                alias: 'control',
                path: ['interbitServices'],
                joinName: 'INTERBIT_SERVICES'
              }
            ],
            sendActionTo: [],
            receiveActionFrom: [
              {
                alias: 'interbitRoot',
                authorizedActions: ['@@MANIFEST/SET_MANIFEST']
              }
            ]
          },
          chains: {},
          hash: '4534531a7e3fb794d178e87fd12ce41853f85e4a'
        },
        control: {
          alias: 'control',
          chainId:
            '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
          chainIdMap: {
            public:
              '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
            interbitRoot:
              '56399770d33b17fe3ba20a1d911cc56c3cc47ed11fc8f6935543c2b25da96f47'
          },
          validators: ['SuperSecurePubKey'],
          covenant: 'control',
          covenantHashMap: {
            control:
              '1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa'
          },
          joins: {
            provide: [
              {
                alias: 'public',
                path: ['interbitServices', 'shared'],
                joinName: 'INTERBIT_SERVICES'
              }
            ],
            sendActionTo: [],
            receiveActionFrom: [
              {
                alias: 'interbitRoot',
                authorizedActions: ['@@MANIFEST/SET_MANIFEST']
              }
            ]
          },
          chains: {},
          hash: 'd058115c23797f2f8167286f3ce1cc6510eedcc4'
        }
      },
      hash: '6579b116d3f76666bca7ead9a53afbca849b467f'
    }
  },
  hash: 'fd008fd0d71a1f78e1f626849c170c3d0e588115'
}

const defaultCovenants = defaultManifest.covenants

module.exports = {
  PUBLIC_KEY,
  defaultConfig,
  defaultManifest,
  defaultCovenants
}

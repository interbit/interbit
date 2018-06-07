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
      buildLocation: 'build/',
      browserChains: ['public']
    }
  },
  covenants: {
    public: {
      hash: '72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775',
      filename:
        'covenants/72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775.tgz'
    },
    control: {
      hash: '1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa',
      filename:
        'covenants/1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa.tgz'
    },
    private: {
      hash: 'b7cc42ba4e4e67aa4783c113cadd3d5e6ad71a18d57f6e3da31b4c76aa5bd6ea',
      filename:
        'covenants/b7cc42ba4e4e67aa4783c113cadd3d5e6ad71a18d57f6e3da31b4c76aa5bd6ea.tgz'
    }
  },
  chains: {
    public: '065fecd743c758700c052cb4d8ba42a4e1df17d0e02061bfb2e9820abcac270f',
    control: 'fd23cdf36dc48c9a968bad4fcb85d036aad747daf2b044db7a254a24fbc9e969',
    interbitRoot:
      '1f86d89a3109b0bc2c3706dc104302b33625955e74774c2ab77d0341744186a6'
  },
  genesisBlocks: {
    public: {
      content: {
        previousHash: 'genesis',
        stateHash:
          'bee1dcbf3cc78d850d91cae24e0409633211d87ab083e2b159547a82fe9b7c17',
        actions: [],
        errors: {},
        redispatches: {},
        height: 0,
        timestamp: 1523725637476,
        seed: 0.772511464491914,
        configChanged: true,
        timeToCreateBlock: 0,
        state: {
          interbit: {
            config: {
              consensus: 'PoA',
              providing: [],
              consuming: [],
              acl: {
                actionPermissions: {
                  '.*': ['root']
                },
                roles: {
                  root: [
                    '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v2.5.2\nComment: http://openpgpjs.org\n\nxk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO\n7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv\nQGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID\nFgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M\nPThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB\nAf9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH\na2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE\nOIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4\nfT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC\n=yjbz\n-----END PGP PUBLIC KEY BLOCK-----'
                  ]
                }
              },
              blockMaster:
                '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v2.5.2\nComment: http://openpgpjs.org\n\nxk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO\n7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv\nQGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID\nFgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M\nPThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB\nAf9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH\na2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE\nOIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4\nfT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC\n=yjbz\n-----END PGP PUBLIC KEY BLOCK-----',
              covenantHash:
                '72fe3ca61c3af35ecca31e58c33c368e1554dc1dab01ab8fc3aadc965f608775'
            },
            configChanges: {}
          }
        }
      },
      contentHash:
        'd0a89def3a4d336f03d4a51881fafd33b6590eda440c7f038980b246836fd0f6',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce',
      blockHash:
        '065fecd743c758700c052cb4d8ba42a4e1df17d0e02061bfb2e9820abcac270f'
    },
    control: {
      content: {
        previousHash: 'genesis',
        stateHash:
          '7582a4504336b32363e7bb6903ca98f023ff48aa33c1670c6840469f6502000d',
        actions: [],
        errors: {},
        redispatches: {},
        height: 0,
        timestamp: 1523725637477,
        seed: 0.5814716734898864,
        configChanged: true,
        timeToCreateBlock: 0,
        state: {
          interbit: {
            config: {
              consensus: 'PoA',
              providing: [],
              consuming: [],
              acl: {
                actionPermissions: {
                  '.*': ['root']
                },
                roles: {
                  root: [
                    '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v2.5.2\nComment: http://openpgpjs.org\n\nxk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO\n7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv\nQGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID\nFgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M\nPThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB\nAf9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH\na2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE\nOIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4\nfT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC\n=yjbz\n-----END PGP PUBLIC KEY BLOCK-----'
                  ]
                }
              },
              blockMaster:
                '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v2.5.2\nComment: http://openpgpjs.org\n\nxk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO\n7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv\nQGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID\nFgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M\nPThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB\nAf9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH\na2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE\nOIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4\nfT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC\n=yjbz\n-----END PGP PUBLIC KEY BLOCK-----',
              covenantHash:
                '1abaa91370f606b575ba2bca4dc13a3717aba7c6b09b95b23334c89eb98650fa'
            },
            configChanges: {}
          }
        }
      },
      contentHash:
        'd2df0cd66caf467e77e7638c2a0ace0eeacaf2d230a0efb17eb64dd3e519c5ad',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce',
      blockHash:
        'fd23cdf36dc48c9a968bad4fcb85d036aad747daf2b044db7a254a24fbc9e969'
    },
    interbitRoot: {
      content: {
        previousHash: 'genesis',
        stateHash:
          '99f0f5bd81cc28e16d0a554abdf804fa61835bb6c400dff9580c466130dc3da3',
        actions: [],
        errors: {},
        redispatches: {},
        height: 0,
        timestamp: 1523725637478,
        seed: 0.2930421227312665,
        configChanged: true,
        timeToCreateBlock: 0,
        state: {
          interbit: {
            config: {
              consensus: 'PoA',
              providing: [],
              consuming: [],
              acl: {
                actionPermissions: {
                  '.*': ['root']
                },
                roles: {
                  root: [
                    '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v2.5.2\nComment: http://openpgpjs.org\n\nxk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO\n7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv\nQGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID\nFgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M\nPThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB\nAf9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH\na2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE\nOIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4\nfT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC\n=yjbz\n-----END PGP PUBLIC KEY BLOCK-----'
                  ]
                }
              },
              blockMaster:
                '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: OpenPGP.js v2.5.2\nComment: http://openpgpjs.org\n\nxk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO\n7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv\nQGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID\nFgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M\nPThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB\nAf9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH\na2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE\nOIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4\nfT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC\n=yjbz\n-----END PGP PUBLIC KEY BLOCK-----'
            },
            configChanges: {}
          }
        }
      },
      contentHash:
        'bd2064ab8baafbb6988e8362dad49ac2c0b6a8a7e0f81e0639a9128f219cb38f',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce',
      blockHash:
        '1f86d89a3109b0bc2c3706dc104302b33625955e74774c2ab77d0341744186a6'
    }
  },
  manifest: {
    interbitRoot: {
      chainId:
        '1f86d89a3109b0bc2c3706dc104302b33625955e74774c2ab77d0341744186a6',
      validators: ['SuperSecurePubKey'],
      covenant: 'interbitRoot',
      covenants: {
        interbitRoot: 'interbitRoot',
        control: 'control'
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
          chainId:
            '065fecd743c758700c052cb4d8ba42a4e1df17d0e02061bfb2e9820abcac270f',
          validators: ['SuperSecurePubKey'],
          covenant: 'public',
          covenants: {
            public: 'public'
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
          chains: {}
        },
        control: {
          chainId:
            'fd23cdf36dc48c9a968bad4fcb85d036aad747daf2b044db7a254a24fbc9e969',
          validators: ['SuperSecurePubKey'],
          covenant: 'control',
          covenants: {
            control: 'control'
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
          chains: {}
        }
      }
    }
  }
}

const defaultCovenants = defaultManifest.covenants

module.exports = {
  PUBLIC_KEY,
  defaultConfig,
  defaultManifest,
  defaultCovenants
}

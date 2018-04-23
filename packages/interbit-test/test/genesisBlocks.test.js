// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
/*
This is available in version 0.2.8. To use this feature, you can use the
utility function: `createDefaultSponsoredChainConfig` in hypervisor to create
this genesis block. It creates the necessary configuration for a write join
from `sponsorChain` to the newly created chain.

To kick things off, you need to call the `cli` action: `sendChainToSponsor`
that requires `parentChainId` and `genesisBlock` (the one that can be
created with the former utility function)

Once a `sponsorChain` decides to `sponsor` this genesis block, it would setup
_only_ the write join from itself to the new chain. The rest of the join
setup can be done inside the `userCovenant` (potentially with
`remoteRedispatch` actions to other chains).

Please  note, if you want to enforce more strict conditions for `sponsorship`
or setup additional joins, you need to reduce the
`@@interbit/SPONSOR_CHAIN_REQUEST` action type and if you decide to reject
the request, all you need to do is `throw`.
*/

const assert = require('assert')
// const utils = require('interbit-covenant-utils')
const {
  createGenesisBlock,
  createDefaultSponsoredChainConfig
} = require('interbit-core')
const interbit = require('interbit-core')

describe('chain sponsorship', () => {
  const blockMasterPublicKey = 'pubKey1'
  const myPublicKey = 'pubKey2'
  const sponsorChainId = 'chn_349dejiepajifiesr3krda9dca'

  const expectedConfig = {
    consensus: 'PoA',
    providing: [
      {
        consumer: sponsorChainId,
        statePath: [
          'interbit',
          'received-actions',
          sponsorChainId,
          'action-status'
        ],
        joinName: 'WRITE-JOIN-ACTION-STATUS'
      }
    ],
    consuming: [
      {
        provider: sponsorChainId,
        mount: [
          'interbit',
          'received-actions',
          sponsorChainId,
          'pending-actions'
        ],
        joinName: 'WRITE-JOIN-PENDING-ACTIONS'
      }
    ],
    acl: {
      actionPermissions: {
        '*': ['root', `chain-${sponsorChainId}`]
      },
      roles: {
        root: [blockMasterPublicKey, myPublicKey],
        [`chain-${sponsorChainId}`]: [sponsorChainId]
      }
    },
    blockMaster: blockMasterPublicKey
  }

  it('makes a sponsored chain config', async () => {
    const config = createDefaultSponsoredChainConfig({
      blockMaster: blockMasterPublicKey,
      myPublicKey,
      sponsorChainId
    })

    assert.deepEqual(config, expectedConfig)
  })

  it('makes a genesis block with a known ID', async () => {
    const config = createDefaultSponsoredChainConfig({
      blockMaster: blockMasterPublicKey,
      myPublicKey,
      sponsorChainId
    })

    const genesisBlock = createGenesisBlock({ config })

    assert.deepEqual(genesisBlock.content.state.interbit.config, expectedConfig)
  })

  it('will boot a chain that has the chain ID specified in the generated genesis block', async () => {
    const genesisBlock = {
      content: {
        previousHash: 'genesis',
        stateHash:
          '4201a2caa39626873731480cb93fdf27335e2fc4cf49511566765fd3dc5ba564',
        actions: [],
        errors: {},
        redispatches: {},
        height: 0,
        timestamp: 1523660335422,
        seed: 0.7908571874018981,
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
                  '*': ['root']
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
                '4aec30b1eec215d0ae37f6c8798957f0be0e3e5f1a0eaab99de1f2124cce65e2'
            },
            configChanges: {}
          }
        }
      },
      contentHash:
        '6ff3827033392bcea85fee3bb4957cdb38483a54d70a2e8aa3f7a289fbeb9614',
      signatures: {
        GENESIS: 'GENESIS'
      },
      signaturesHash:
        '5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce',
      blockHash:
        'ab197aa8077b8bebf50d271917ae395506b3f881ccfecadb34477939fd2d7989'
    }

    const hypervisor = await interbit.createHypervisor()

    hypervisor.startHyperBlocker()
    try {
      const cli = await interbit.createCli(hypervisor)
      const chainId = await cli.startChain({ genesisBlock })

      assert.equal(chainId, genesisBlock.blockHash)
    } finally {
      hypervisor.stopHyperBlocker()
    }
  }).timeout(5000)
})

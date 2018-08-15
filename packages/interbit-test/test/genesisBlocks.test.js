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
const {
  createGenesisBlock,
  createDefaultSponsoredChainConfig
} = require('interbit-core')

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
        '*': ['root', `chain-${sponsorChainId}`],
        '@@interbit/REMOVE_JOIN_CONFIG': [`chain-${sponsorChainId}`]
      },
      roles: {
        root: [blockMasterPublicKey, myPublicKey],
        [`chain-${sponsorChainId}`]: [sponsorChainId]
      }
    },
    blockMaster: blockMasterPublicKey,
    sponsorChainId: 'chn_349dejiepajifiesr3krda9dca'
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
})

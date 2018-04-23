# Config

The interbit configuration file tells the script how to read and bundle your covenants.

The configuration file must live inside of the src/interbit directory. This is also where all your covenants will live.



#### Example

For the folder structure

my-interbit-app/
  src/
    interbit/
      yourCovenant/
        index.js
        package.json
      interbit.config.js
    otherCode/
  package.json

...your interbit.config.js file would look like this:

```js
const path = require('path')

const config = {
  peers: ['localhost:5000', 'localhost:5050'], // First peers to connect to
  masterChain: 'hub',
  adminValidators: ['adminKey1', 'adminKey2'], // Deployment pubkeys for the root node
  staticChains: {
    hub: {
      covenant: 'hub',
      config: {
        maxBlockSize: 9001,
        // The first validator listed is the blockMaster
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
          sendActionTo: [{ alias: 'spoke1' }]
        }
      },
      childValidators: ['pubKey1', 'pubKey2', 'pubKey3', 'pubKey4', 'pubKey5']
      // ability to make more spokes defined below
      genesisTemplate: {
        covenantHash: 'spoke', // get hash later from the covenants section of config ... must match the parents config of allowed covenant hashes
        parentChain: 'hub', // this is how you spec out your tree without going mad
        validators: ['pubKey3', 'pubKey4', 'pubKey5'], // 'must be a whole subset of the parent list of child validators'
        acl: {
          doSomething: 'may contain any pubkey'
        }
      },
    },
    spoke1: {
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
  },
  // Which index.html files to upgrade with chain information during start/build/deploy
  // One molecule may have several websites that it serves
  apps: {
    example: {
      peers: [], // the peers the browser should connect to
      chains: ['hub', 'spoke1'], // the chains that need to load in the browser
      appChain: 'hub', // The chain that the static page is loaded on
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build') // The location of the built static site to load onto the chain
    }
  }
}

module.exports = config
The above config will generate the below manifest.json in the master:

{
  config: {
    chainMap: {
      hub: {
        chainId: 'chn_123sdfsadfasdfasdfasdfaweghhqerh',
        children: {
          spoke: 'chn_dk23k4jsdflksdjlfksjd',
          spoke2: 'chn_dsajfkolu342920wjrfiaskldjikoasl',
          spoke3: 'chn_dfsdflkj234234lkjsdfljsd'
        }
      }
    },
    childChainValidatorPool: [
      'v1pubkey',
      'v2pubkey',
      'v3pubkey',
      'v4pubkey',
      'v5pubkey'
    ],
    covenants: {
      hubCovenant: 'cov_12asdfawdfasdfasdf',
      spokeCovenant: 'cov_1234123412341qwedfasdfasdf'
    },
    chainCovenantMap: {
      hub: 'hubCovenant',
      spoke1: 'spokeCovenant',
      spoke2: 'spokeCovenant',
      spoke3: 'spokeCovenant'
    }
    masterChain: 'self', // special in the case of the creator
    genesisBlocksCache: {
      // cleaned out by chain maintenance
      chn_dk23k4jsdflksdjlfksjd: 'the block itself held for 100 blocks time'
    }
  }
}
```

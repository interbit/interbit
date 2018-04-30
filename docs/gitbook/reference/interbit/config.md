# The Interbit Configuration File

The interbit configuration file containts instructions for the [build](build.md) script. It details how to read and bundle your covenants and deploy them to a network. The build script will consume a configuration and file and resolve the variables inside of it to generate a manifest file used to deploy your network.

It is a JS file and can be altered at any time.

It contains network information such as peers, validator public keys, and the different chains your network may run. It also contains a list of [covenants](../../key-concepts/README.md#covenants) and which blockchains they will run on.

## Example

Your interbit.config.js file would look something like this:

```js
const path = require('path')

const config = {
  peers: ['localhost:5000', 'localhost:5050'], // First peers to connect to
  adminValidators: [process.env.ADMIN_KEY_1, process.env.ADMIN_KEY_2], // Deployment pubkeys for the root node
  staticChains: { // Chain configuration
    hub: {
      covenant: 'hub',
      config: {
        maxBlockSize: 9001,
        // The first validator listed is the blockMaster
        validators: [process.env.PUBKEY_1, process.env.PUBKEY_2],
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
      childValidators: [process.env.PUBKEY_1, process.env.PUBKEY_2, process.env.PUBKEY_3, process.env.PUBKEY_4, process.env.PUBKEY_5]
      // ability to make more spokes defined below
      genesisTemplate: {
        covenantHash: 'spoke', // get hash later from the covenants section of config ... must match the parents config of allowed covenant hashes
        parentChain: 'hub', // this is how you spec out your tree without going mad
        validators: [process.env.PUBKEY_3, process.env.PUBKEY_4, process.env.PUBKEY_5], // 'must be a whole subset of the parent list of child validators'
        acl: {
          doSomething: 'may contain any pubkey'
        }
      },
    },
    spoke1: {
      covenant: 'spoke',
      parentChain: 'hub',
      config: {
        validators: [process.env.PUBKEY_3, process.env.PUBKEY_4, process.env.PUBKEY_5],
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
```

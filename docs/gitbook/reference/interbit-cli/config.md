# The Interbit Configuration File

The interbit configuration file contains instructions for the
[build](build.md) script. It details how to read and bundle your
covenants and deploy them to a network. The build script will consume a
configuration and file and resolve the variables inside of it to
generate a manifest file used to deploy your network.

It is a JS file and can be altered at any time.

It contains network information such as peers, validator public keys,
and the different chains your network may run. It also contains a list
of [covenants](key-concepts/README.md#covenants) and which blockchains
they will run on.

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
    }
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
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
    }
  }
}

module.exports = config
```

## Peers

```js
{
  peers: ['localhost:5050', 'localhost:8888']
}
```

The peers configuration specifies the peers list that all of the nodes
in your network should connect to. This peers list is specifically for
nodes only.

Each peer must specify a host and a port in the format `'host:port'`

## Static Chains

```js
{
  staticChains: {
    chainA: { ..chainAConfiguration },
    chainB: { ..chainBConfiguration },
  }
}
```

The static chains configuration specifies how each chain that is
configured statically (meaning they exist when the network is initially
deployed and are not created at runtime, through code, dynamically) is
setup.

This includes their covenants, public keys, and chain joins.

### validators

```js
{
  staticChains: {
    chainA: {
      config: {
        validators: ['pubkey1']
      }
    }
  }
}
```

The validators configuration for a static chain indicates public keys
for blocking nodes. In the PoA implementation, the first public key is
the blockmaster and forms the blocks.


### Covenant

```js
{
  staticChains: {
    chainA: {
      covenant: 'covenantAlias'
    }
  },
  covenants: {
    covenantAlias: { ...covenantConfiguration }
  }
}
```

The covenant configuration for a static chain determines which
configured covenant will be applied to the chain.

The covenant is described with a string that points to a key in the
[covenants](#covenants) configuration. The covenant must be configured
for the configuration to be valid.

### Joins

```js
{
  staticChains: {
    chainA: {
      config: {
        joins: {
          receiveActionsFrom: [{
            alias: 'chainB',
            authorizedActions: ['DO_A_THING']
          }],
          consume: [{
            alias: 'chainB',
            path: ['state', 'props', 'path'],
            joinName: 'FRIENDLY_NEIGHBOURHOOD_JOIN'
          }]
        }
      }
    },
    chainB: {
      config: {
        joins: {
          sendActionsTo: [{ alias: 'chainA' }],
          provide: [{
            alias: 'chainA',
            path: ['state', 'props', 'path'],
            joinName: 'FRIENDLY_NEIGHBOURHOOD_JOIN'
          }]
        }
      }
    }
  }
}
```

The join configuration for a pair of static chains determines whether
they will be authorized to share state or dispatch actions to each
other. The joins must correspond to each other.

Reference:
 - [Chain Joining](../../examples/joining.md)


## Covenants

```js
{
  covenants: {
    covenantAlias: {
      location: '../filepath/package-dir'
    }
  }
}
```

The covenants configuration specifies where local covenant packages can
be found for packing and deploying to your blockchains.

These covenants must be npm packable from an external location due to
the distribution of covenants across the network. This means no
external, local, file references.

## Apps

```js
{
  apps: {
    account: {
      peers: ['localhost'],
      chains: ['chainA'],
      indexLocation: path.join(__dirname, 'public/index.html')
    }
  }
}
```

The apps configuration contains peers that browser nodes should connect
to, chains that browser applications should load, and an index.html file
location to write this browser configuration to so it is available once
the app is served at runtime.

When start or build are run, the configuration for each app will be
written into the corresponding index.html file on a dom element with
`id="interbit"`.

If you wish to manage browser nodes yourself you may omit the apps
configuration.

Peers in the apps configuration should not specify a port. The port
should be selected in the app itself based on the protocol it was served
over. For example, if your app is served at `https://yourApp.com` it
should connect to `localhost:443`. Otherwise it should use `localhost:80`.
The magic of the internet and DNS routing will do the rest for browser
nodes.

It is still possible for a browser node to connect directly to the
desired port and host.

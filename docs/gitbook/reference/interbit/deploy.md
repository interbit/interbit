# `deploy()`

Uses a manifest to deploy a blockchain node.

#### Arguments

1. `options` *(Object)*: An object containing information about how to deploy the manifest. Defaults will be used if no options are given.
  1. `manifest` *(Object)*: a manifest that will be used for configuration to start the chain
  1. `keyPair` *(Object)*: a keypair that will be used to create the hypervisor
    1. `publicKey` *(string)*: A pgp public key string 
    1. `privateKey` *(string)*: A pgp public key string 
  1. `location` *(string)*:  The directory location to work from. If none is given cwd is used
  1. `port` *(int)*: the port that the interbit cli will listen on  
  1. `connect` *(bool)* If this node is connecting to an existing chain. Do not supply the option to configure joins, covenants and keys.

#### Returns

*(Object)*: A [cli](../interbit-core/cli/README.md) to use to interact with the Interbit node


#### Example

```js
const { deploy} = require('interbit')

const cli = deploy({
  manifest: require('./manifestLocation/interbit.manifest.json'),
  port: 8888
})
```


# `createChains()`

An object containing two functions: createChainsFromManifest and createChainsFromConfig

## `createChainsFromManifest()`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>This function signature and name is set to change in a future release. It will be renamed to createChains and location will be moved into options. Other changes may occur.</p>
</div>

Uses the cli and manifest provided to create and configure a set of chains. Optionally accepts the options argument to augment its behaviour.

#### Arguments

1. `location` *(Object)*: The filepath to run this command from
1. `cli` *(Object)*: The interbit cli to deploy and configure the manifest chains on
1. `manifest` *(Object)*: The contents of the manifest file as a JSON object.
1. `options` *(Object)*: Options for configuration and deployment. These correspond to the command line options available for [`interbit-cli`](../interbit-cli/README.md)

#### Returns

None.

#### Example

```js
const { createChains: { createChainsFromManifest } } = require('interbit')

const { ??? } = await createChainsFromManifest(cli, manifest)
```

## `createChainsFromConfig()`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>This function is set for deprecation in a future release. Please try to use createChainsByManifest wherever possible.</p>
</div>

Uses the cli and config provided to create and configure a set of chains.
#### Arguments

1. `cli` *(Object)*: The interbit cli to deploy and configure the manifest chains on
1. `config` *(Object)*: The contents of the configuration file as a JSON object.

#### Returns

*(Object)*: {
  `chainManifest`: *(Object)* a set of chain aliases that were present in the manifest file with their newly created chain IDs 
  `covenantHashes`: *(Object)* a set of covenant aliases with the hashes that resulted from deploying the code to the blockchain
}

#### Example

```js
const { createChains: { createChainsFromConfig } } = require('interbit')

const { chainManifest, covenantHashes } = await createChainsFromConfig(cli, manifest)
```


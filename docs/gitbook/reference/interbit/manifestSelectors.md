# `manifestSelectors`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content.</p>
</div>

A set of selectors for getting information from a properly formatted
configuration file.


## Functions Available

- `getApps`
- `getChains`
- `getCovenants`
- `getGenesisBlocks`
- `getPeers`
- `getBlockMasterByAlias`
- `getChainIdByAlias`
- `getCovenantHashByAlias`
- `getGenesisBlockByAlias`
- `getRootChildren`


## Function Definitions


### `getApps(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The apps available in this manifest


### `getChains(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The chain IDs that were generated for this manifest


### `getCovenants(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The covenant hashes that were generated for this manifest


### `getGenesisBlocks(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The genesis blocks that were generated for this manifest


### `getManifest(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The manifest of chain configuration generated for this manifest


#### Tips

- The manifest file is separate from the manifested chain configuration.
  The manifest is setup as subsets of manifest so that chains further
  down the manifest tree with fewer permissions can easily be passed
  only the parts of the manifest that concern them by their parents.


### `getPeers(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The peers list for nodes that will be deployed from this manifest


### `getChainIdByAlias(chainAlias, manifest)`


#### Arguments

1. chainAlias *(String)* The alias of the chain to select for
1. manifest *(Object)* The manifest to select from


#### Returns

*(String)* The Chain ID of the chain that was specified by alias 


### `getCovenantHashByAlias(chainAlias, manifest)`


#### Arguments

1. chainAlias *(String)* The alias of the chain to select for
1. manifest *(Object)* The manifest to select from

#### Returns

*(String)* The hash of the covenant that is configured to deploy on the
chain that was specified by alias. 


### `getGenesisBlockByAlias(chainAlias, manifest)`


#### Arguments

1. chainAlias *(String)* The alias of the chain to select for
1. manifest *(Object)* The manifest to select from


#### Returns

*(Object)* The genesis block for the chain that was specified by alias


### `getBlockMasterByAlias(chainAlias, manifest)`


#### Arguments

1. chainAlias *(String)* The alias of the chain to select for
1. manifest *(Object)* The manifest to select from

#### Returns

*(string)* The publicKey of the block master for the chain that was
specified by alias


### `getRootChildren(manifest)`


#### Arguments

1. manifest *(Object)* The manifest to select from

#### Returns

*(Object)* All of the chains specified in the chainManifest that are not
the root chain


#### Tips

- The manifest file is separate from the manifested chain configuration.
  The manifest is setup as subsets of manifest so that chains further
  down the manifest tree with fewer permissions can easily be passed
  only the parts of the manifest that concern them by their parents.


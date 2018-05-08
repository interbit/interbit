# `selectors`

<div class="tips warning">
  <p><span></span>TODO</p>
  <p>Incomplete content.</p>
</div>

An object containing a set of selector functions for getting specific information from the middleware's redux state.

## Object Properties

1. `getBlockMaster`
1. `getChain`
1. `getChainId`
1. `getConfiguredChains`
1. `getConfiguredPeers`
1. `getConnectionStatus`
1. `getCovenantHash`
1. `getInterbitStatus`
1. `getPrivateChain`
1. `getPrivateChainId`
1. `getPublicChain`
1. `getPublicChainId`
1. `getPublicKey`
1. `getSponsorConfig`
1. `isChainLoaded`
1. `isPublicChainLoaded`
1. `immutable`
1. `interbitAtRoot`
1. `fromStoreRoot`


## Selector Function Definitions

All selector functions share the following parameters

1. `state` *(Object)*: The state slice from the redux store belonging to the middleware
1. `options` *(Object)*: An options object for specifying selection rules
  1. `root` *(Object)*: The root of the state to select from. Defaults to the store root. You will probably not need to use it.

### `getBlockMaster(state, { root , chainAlias })`

Returns the blockMaster public key for a specified chain alias.

#### Additional Options

  1. `chainAlias` *(Object)*: The alias of the chain whose blockMaster we are selecting


#### Returns

*(String)*: The public key belonging to the blockMaster for the specified chain

### `getChain`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:

### `getChainId`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getConfiguredChains`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getConfiguredPeers`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getConnectionStatus`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getCovenantHash`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getInterbitStatus`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getPrivateChain`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getPrivateChainId`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getPublicChain`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getPublicChainId`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getPublicKey`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `getSponsorConfig`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `isChainLoaded`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `isPublicChainLoaded`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `immutable`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `interbitAtRoot`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:
### `fromStoreRoot`

...

#### Additional Options

  1. `?` *(Object)*:


#### Returns

*(String)*:

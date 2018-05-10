# `configSelectors`

A set of selectors for getting information from a properly formatted configuration file.

## Functions available

 - getAdminValidators
 - getApps
 - getChains
 - getChainByAlias
 - getChainCovenant
 - getChainJoins
 - getChainValidators
 - getJoinTypeForChain
 - getCovenants
 - getPeers
 - joinTypes


## Function Definitions

### `getAdminValidators(config)`

#### Arguments
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The admin validator public keys


### `getApps(config)`

#### Arguments
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The entire apps configuration


### `getChains(config)`

#### Arguments
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The entire set of static chain configurations

### `getChainByAlias(chainAlias, config)`

#### Arguments
1. config *(string)* the chain alias of the chain to find
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The configuration for the chain that was selected


### `getChainCovenant(chainAlias, config)`

#### Arguments
1. chainAlias *(string)* The chain alias of the chain to find a covenant for
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The covenant alias for the chain that was selected


### `getChainJoins(chainAlias, config)`

#### Arguments
1. chainAlias *(string)* The chain alias of the chain to find a join configuration for
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The join configuration for the chain that was selected


### `getChainValidators(chainAlias, config)`

#### Arguments
1. chainAlias *(string)* The chain alias of the chain to find a validator set for
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The validator public keys for the chain that was selected


### `getJoinTypeForChain(chainAlias, joinType, config)`

Gets a specific type of join configuration from config for the chain specified by alias.

#### Arguments
1. chainAlias *(string)* The chain alias of the chain to find a join configuration for
1. joinType *(string)* A [constant](#jointypes) string for the join type to select
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The join configuration of a specific type for the chain that was selected


### `getCovenants(config)`

#### Arguments
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The entire covenants configuration


### `getPeers(config)`

#### Arguments
1. config *(Object)* The configuration to select from

#### Returns
*(Object)* The entire peers configuration


### `joinTypes`

An object of constants specifying join types that are available within interbit.

```js
{
  SEND,
  RECEIVE,
  PROVIDE,
  CONSUME
}
```

# `createGenesisBlock(config)`

Accepts a valid genesis block configuration which can be build using the [genesisConfigBuilder](./genesisConfigBuilder.md) and returns a fully resolved genesis block that can be used to start a chain.

#### Arguments

1. `config` *(Object)*: The configuration object used to create the genesis block.

{
  config: The config built from genesisConfigBuilder
}

#### Returns

*(Object)*: A resolved genesis block based on the passed in config


#### Example

```js
const builtGenesisConfig = genesisConfigBuilder.build()

const genesisBlock = interbit.createGenesisBlock({ config: builtGenesisConfig })
```


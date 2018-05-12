# `createGenesisBlock(genesisConfig)`

Creates a genesis block based on the passed in configuration. 

#### Arguments

1. `genesisConfig` *(Object)*: The genesis block configuration. See [tips](#tips) section for more information.


#### Returns

*(Object)*: A genesis block that can be used to [startChain](startChain.md)


#### Example

```js
const interbit = require('interbit')

// ... generate the genesis configuration

const genesisBlock = interbit.createGenesisBlock(genesisConfig)
```

#### Tips

 - The genesis block configuration can be created using the [Genesis Config Builder](../genesisConfigBuilder.md)
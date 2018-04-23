# `startChain(config)`

starts a chain based on the configuration provided

#### Arguments

1. `config` *(Object)*: {
  genesisBlock: the genesis to start the chain from
}


#### Returns

*(Promise)*: A promise that resolves to the chain ID on success


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)
const config = {
  genesisBlock
}

const chainId = await cli.startChain(config)
```


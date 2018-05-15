# `getChain(chainId)`

Returns a chain interface for the chain ID specified

#### Arguments

1. `chainId` *(String)*: The chain ID for the chain to retrieve


#### Returns

*(Object)*: A Chain Interface to interact with the chain ID specified
  - `dispatch` *(function)* `(action) => {}` Dispatches an action to the blockchain
  - `subscribe` *(function)* `(callback) => {}` Subscribes to chain changes and calls the callback on change
  - `getState` *(function)* `() => {return state}` Gets the chain state

#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

cli.getChain()
```


# `loadChain()`

Attempts to load an existing chain from peers based on a chain ID. If it is permitted, this will allow the CLI to host the chain on the local node's hypervisor.

#### Arguments

1. `chainID` *(String)*: The Chain ID of the chain to load into the local hypervisor


#### Returns

*(Object)*: The chain interface for the loaded chain
  - `dispatch` *(function)* `(action) => {}` Dispatches an action to the blockchain
  - `subscribe` *(function)* `(callback) => {}` Subscribes to chain changes and calls the callback on change
  - `getState` *(function)* `() => {return state}` Gets the chain state


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const chainInterface = await cli.loadChain('md90ewuejr09emeowqw3iowejq03meow9i0w9e')
```


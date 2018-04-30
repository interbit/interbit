# `getChain(chainId)`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content.</p>
</div>

Returns a chain interface for the chain ID specified

#### Arguments

1. `chainId` *(String)*: The chain ID to retrieve


#### Returns

*(Object)*: A Chain Interface to interact with the chain ID specified

```js
{
  dispatch: (action) => {}, // Dispatch an action to the blockchain
  subscribe: (callback) => {}, // Subscribe to chain changes
  getState: () => {} // Get the chain state
}
```

#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

cli.getChain()
```


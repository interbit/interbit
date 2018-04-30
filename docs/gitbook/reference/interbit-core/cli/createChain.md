# `createChain()`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content.</p>
</div>

...

#### Returns

*(Promise)*: A promise that resolves with the chainId of the newly created chain or rejects if a chain could not be created


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const chainId = await cli.createChain()
```


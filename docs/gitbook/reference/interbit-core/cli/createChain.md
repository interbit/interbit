# `createChain()`

Creates a chain that will run on this cli and corresponding hypervisor.
When first created the chain is empty. It does not have a covenant and
is only a genesis block. It will inherit the keys of the cli that
created it.


## Returns

*(Promise)*: A promise that resolves with the chainId of the newly
created chain or rejects if a chain could not be created


## Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const chainId = await cli.createChain()
```

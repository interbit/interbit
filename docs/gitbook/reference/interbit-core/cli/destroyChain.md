# `destroyChain(chainId)`

Removes chain related resources from all hypervisors that host the chain except if other chains have a join with the deleted chain. Their join config is not cleaned up automatically.

except: any chain related data in the kv store is not being deleted yet

This function dispatches a [destroy](../../interbit-covenant-utils/destroy.md) action into the hypervisor for the specified chain ID. This action can also be dispatched from user covenants.

#### Arguments

1. `chainId` *(String)*: The chain ID of the chain to destroy


#### Returns

*(bool)*: Whether or not the chain was successfully destroyed.


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const chainId = 'ap9oedirqaw90opeuridjqaioi8uhy9ioyhepqa'

if (cli.destroyChain(chainId)) {
  // ... success
}
```


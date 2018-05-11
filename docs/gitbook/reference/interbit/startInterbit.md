# `startInterbit()`

Starts a [hypervisor](../../key-concepts/README.md#hypervisor) and [cli](../interbit-core/cli/README.md) for hosting Interbit blockchains then returns both.

#### Arguments

None.

#### Returns

*(Object)*: {
  cli: *(Object)* A [cli](../interbit-core/cli/README.md) to use to interact with the Interbit node
  hypervisor: *(Object)* A [hypervisor](../interbit-core/hypervisor/README.md) to use for hosting chains
}

#### Example

```js
const { startInterbit } = require('interbit')

const { cli, hypervisor } = await startInterbit()
```

# `createHypervisor()`

Creates an Interbit Hypervisor. The Hypervisor is the small piece of code that is used to boot chains and is itself a blockchain.

The hypervisor hosts all chains you wish to run on a given interbit node and manages admin actions.

#### Arguments

None

#### Returns

*(Object)*: Hypervisor

#### Example

```js
const core = require('interbit-core')
const hypervisor = core.createHypervisor()
```

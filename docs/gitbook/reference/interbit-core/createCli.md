# `createCli()`

Creates an Interbit Interface. The Interface is used to...


#### Arguments

1. `hypervisor` *(Object)*: a hypervisor object

#### Returns

*(Object)*: Interface

#### Example

```js
const core = require('interbit-core')
const hypervisor = core.createHypervisor()
const cli = await core.createCli(hypervisor)
```

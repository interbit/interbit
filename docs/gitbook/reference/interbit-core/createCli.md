# `createCli()`

Creates an Interbit Interface. The Interface is used to interact with the running interbit node. It can load chains from peers, connect to new peers, get chain interfaces for you, and do many other cool tricks.

It requires a hypervisor to mount and run your chains onto.

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

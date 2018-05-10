# `destroy()`

When redispatched from within a covenant or dispatched to a chain, it destroys this chain in the same manner as the cli method [`destroyChain(chainId)`](../interbit-core/cli/destroyChain.md).

To destroy means removing chain related resources from all hypervisors that host the chain except if other chains have a join with the deleted chain. Their join config is not cleaned up automatically.

except: any chain related data in the kv store is not being deleted yet

#### Arguments

None

#### Returns

An action that can be dispatched to a chain to destroy it.

#### Example

```js
const covenantUtils = require('interbit-covenant-utils')

const destroyAction = covenantUtils.destroy()
```

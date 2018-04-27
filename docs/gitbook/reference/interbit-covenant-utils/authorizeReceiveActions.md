# `authorizeReceiveActions()`

Generates an action that can be dispatched to a chain to authorize actions from a sender during a write join.

When dispatched, this action allows a sender chain to send actions to it.

This action should be dispatched to the receiver chain for a write join.

#### Arguments

1. `senderChainId` *(string)*: The chain ID of the blockchain that will send actions
2. `permittedActions` *(array [string])*: The actions that the sender is permitted to send


#### Returns

None


#### Example

```js
const covenantUtils = require('interbit-covenant-utils')
// ...
const authorizeReceiveAction = covenantUtils.authorizeReceiveActions({senderChainId, permittedActions})
// ...
chainInterface.dispatch(authorizeReceiveAction)
```

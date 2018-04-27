# `authorizeSendActions()`

Generates an action that can be dispatched to a chain to authorize sending actions to another chain.

When dispatched, this action allows the chain to send actions to another chain.

This action should be dispatched to the sender chain for a write join.

#### Arguments

1. `receiverChainId` *(string)*: The chain ID of the chain that will receive the actions


#### Returns

None


#### Example

```js
const covenantUtils = require('interbit-covenant-utils')
...
const authorizeSendAction = covenantUtils.authorizeSendActions({receiverChainId})
// ...
chainInterface.dispatch(authorizeSendAction)
```

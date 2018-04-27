# `startConsumeState()`

Generates an action that can be dispatched to a chain to begin the process of consuming state with a read join.

When dispatched, this action will allow a consumer chain to begin consuming the provider state. The consumer will mount the state given by the provider chain to the consumer chain application state at the mount path specified in the action. 

This action should be dispatched to the consumer chain for a read join.

#### Arguments

1. `provider` *(string)*: The chain ID of the blockchain that will be providing state
2. `mount` *(array)*: A state path that the shared state will be mounted to 
3. `joinName` *(string)*: A name for the join. This must be the same as the name used by the provider chain 


#### Returns

None


#### Example

```js
const covenantUtils = require('interbit-covenant-utils')
// ...
const consumeStateAction = covenantUtils.startConsumeState({provider, mount, joinName})
// ...
chainInterface.dispatch(consumeStateAction)
```

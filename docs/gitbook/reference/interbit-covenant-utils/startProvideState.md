# `startProvideState()`

Generates an action that can be dispatched to a chain to begin the process of providing state in a read join.

When the resulting action is dispatched, the provider chain will begin providing it's application state specified by statePath to the consumer chain.

This action should be dispatched to the provider chain for a read join.

#### Arguments

1. `consumer` *(string)*: The chain ID of the blockchain that will be consuming state
2. `statePath` *(array [string])*: Defines the path to the state that will be shared with the consumer chain 
3. `joinName` *(string)*: The name of the join. This must be the same name used by the consumer chain.


#### Returns

None


#### Example

```js
const covenantUtils = require('interbit-covenant-utils')
// ...
const provideStateAction = covenantUtils.startProvideState({consumer, statePath, joinName})
// ...
chainInterface.dispatch(provideStateAction)
```

# `redispatches()`

Adds an action from within a reducer to the redispatch queue to be processed by the reducer later.

#### Arguments

1. `state` *(Object)*: the state to attach the action to
2. `redispatchAction` *(Object)*: The action to redispatch


#### Returns

*(Object)*: State


#### Example

```js
const { redispatch } = require('interbit-covenant-utils')

const reducer = (state, action) => {
  const anotherAction = {
    type: 'DO_ANOTHER_THING',
    payload: {}
  }
  const nextState = redispatch(nextState, anotherAction)

  // ...

  return nextState
}
```

# `chainDispatch()`

Returns a redux action that is accepted by interbit-middleware to dispatch an action to the specified blockchain

#### Arguments

1. `chainAlias` *(String)*: The alias of the chain to dispatch to.
1. `chainAction` *(Object)*: The action to dispatch to the blockchain

#### Returns

*(Object|Promise)*: The promise returned from the blockchain dispatch function. Resolves when the action is accepted by the chain

#### Example

```js
const middleware = require('interbit-middlware')

const chainAlias = 'whichBlockchain'
const chainAction = {
  type: 'DO_A_THING',
  payload: {}
}

const chainDispatchAction = middleware.chainDispatch(chainAlias, chainAction)

reduxStore.dispatch(chainDispatchAction)
```

Tips
 - The chainAlias must be one that is configured in the Interbit config file apps configuration to load in the UI.

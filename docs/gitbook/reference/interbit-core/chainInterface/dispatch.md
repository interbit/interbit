# `dispatch()`

Dispatches a single action to a chain. This is the only way to trigger a state change.

This is a method that is called from a running chain.


#### Arguments

1. `action` *(Object)*: an object whose data can affect a change your application will understand

Note: Actions are how new data is fed to the blockchain. Actions must have a `type` field that indicates the requested action and a `payload` field that contains context specific data. Best practice is to define types as string constants, imported from another module.


#### Returns

*(Object)*: A promise that resolves when the action is accepted and blocked.


#### Example

```js
const action = {
  type: 'EVENT_OCCURRED',
  payload: {
    data: { }
  }
}

const hypervisor = interbit.createHypervisor()

hypervisor.dispatch(action)
```

#### Tips

* You cannot call `dispatch` from inside a smart contract or another reducer.
* If you do wish to dispatch further actions from within a smart contract use [`redispatch`](../../interbit-covenant-utils/redispatch.md
)
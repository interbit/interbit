# `subscribe(callback)`

<div class="tips warning">
  <p><span></span>TODO</p>
  <p>Incomplete content. This may or may not return an unsubscribe function.</p>
</div>

Subscribes to state changes from a chain. When the state of a chain changes, the callback passed into params will be called.

This is a method that is called from a running chain.

#### Arguments

1. `callback` *(Function)*: a callback with no parameters.

#### Returns

This function does not return anything.

#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

cli.subscribe(() => {
  // State has changed, do something.
})
```

#### Tips

* To get the state from within the callback, you must call the `chain.getState()` function.

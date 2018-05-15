# `subscribe(callback)`

<div class="tips warning">
  <p><span></span>TODO</p>
  <p>Incomplete content. This may or may not return an unsubscribe function.</p>
</div>

Subscribes to state changes from the hypervisor chain. When the hypervisor state changes, the callback passed into params will be called.

#### Arguments

1. `callback` *(Function)*: a callback with no parameters.

#### Returns

??? 

#### Example

```js
const hypervisor = interbit.createHypervisor()

hypervisor.subscribe(() => {
  // State has changed, do something.
})
```

#### Tips

* To get the state from within the callback, you must call the `chain.getState()` function.

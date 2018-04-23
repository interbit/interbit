# `getState()`

Returns the current [Application State](../key-concepts/README.md#application-state). This is the same as the last value returned by any [Smart Contract](../key-concepts/README.md#smart-contracts) or library function (reducers).



#### Arguments

1. `?` *(Object)*: ?


#### Returns

*(Object)*: an object representing the [Application State](../key-concepts/README.md#application-state).


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

cli.getState()
```

#### Tips

* This function is not used to get the state in Smart Contracts, but on the front end of the application.
* `getState()` can be used to make decisions about whether to call an external API, and then dispatch the results of that call.


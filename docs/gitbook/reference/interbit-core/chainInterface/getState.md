# `getState()`

Returns the current [Application State](/key-concepts/state.adoc). This
is the same as the last value returned by any [Smart
Contract](/key-concepts/smart_contracts.adoc) or library function
(reducers).


## Arguments

None.


## Returns

*(Object)*: an object representing the [Application
State](/key-concepts/state.adoc).


## Example

```js
const state = chainInterface.getState()
```


## Tips

* This function is not used to get the state in Smart Contracts, but on
  the front end of the application.

* `getState()` can be used to make decisions about whether to call an
  external API, and then dispatch the results of that call.

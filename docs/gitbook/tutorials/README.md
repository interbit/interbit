# Tutorials

<div class="tips danger">
  <p><span></span>Placeholder Text</p>
  <p>This content is placeholder text and needs expansion.</p>
</div>

# How to write a Smart Contract

<div class="tips danger">
  <p><span></span>Unfinished Content</p>
  <p>This content is unfinished and needs expansion.</p>
</div>

Smart contracts contain the business and processing logic, or functions,
of the application. Continuing the scenario from the previous section,
a single smart contract would suffice:

```js
const smartContracts =  {
    lastAccidentDate: (state = Immutable.from(initialState.lastAccidentDate), action) => {
        if (action.type == actions.RESET) {
            state = new Date()
        }
        return state
    }
}
```

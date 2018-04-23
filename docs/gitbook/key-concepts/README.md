# Key Concepts

Actions, application states, and smart contracts are covered below to foster understanding of blockchain technology and Interbit.

## Actions
Actions are data payloads that provide information from your application to your Interbit blockchain. Interbit uses the [Redux](http://redux.js.org/) design, so actions in Interbit are essentially the same as actions in Redux. Specifically, actions are plain JavaScript objects that must have a `type` and a `payload` property. Types should be defined as string constants. The contents of the `payload` property are completely up to you.

Actions are sent to the blockchain by calling the   dispatch() method. You define your own application actions, and at runtime they originate from either user or system activity. Your [Smart Contracts](key-concepts.md#smart-contracts) (reducers) typically evaluate the incoming Action type to determine appropriate behavior.

Below are the various contexts in which you will work with actions.

Defining your Action:
```js
let actions = {
  EVENT_OCCURRED: 'EVENT_OCCURRED',
  eventOccurred: (data) => {
    return {
      type: actions.EVENT_OCCURRED,
      payload: {
        data
      }
    }
  }
}
```

Dispatching an Action:
```js
chain.dispatch(action)

```

Evaluating an Action in a Smart Contract:
```js
if (action.type === actions.EVENT_OCCURRED) {
  // Take appropriate behavior
}

//OR

switch (action.type) {
  // Case for each action type
}
```

<div class="tips info">
  <p><span></span>Example</p>
  <p>To see actions in practice, please see the actions in the <a href="/examples/to-do-list.md#the-actions">To Do List</a> example.</p>
</div>

## Application State
The Application State is the most up-to-date state of application-specific data running on the blockchain. It is the result of all of the actions in the blockchain, from the [genesis block](../GLOSSARY.md#genesis-block) and its initial Application State, having been processed by the Smart Contracts.
The Application State does not include additional Interbit platform metadata.

The initial Application State that you define for your application is the first Application State that you give to the Smart Contracts. The initial Application State is akin to the data model in traditional application development. It details what data the application will store as well as the initial values.

Below are samples of the various contexts in which you will work with the Application State.

The initial Application State taken from the To Do List example:
```js
import Immutable from 'seamless-immutable'

const initialState = Immutable.from({
  items: []
})

export default initialState
```

Retrieving the Application State:
```js
const appState = animatedChain.getState()
```

Using Application State in a Smart Contract:
```js
const smartContract = (state, action) => {
  state = state.set('items', [])
  return state
}
```

<div class="tips info">
  <p><span></span>Note</p>
  <p>While the Redux design pattern recommends minimizing the amount of state that you send to reducers (smart contracts in our context), be aware that you will have to manage your own state separation. Consider whether your application will be performance sensitive enough to require minimization of state passed to smart contracts, or if greater consolidation of state management is more valuable.</p>
</div>


See also: [Blockchain State](../GLOSSARY.md#blockchain-state)


## Smart Contracts
Smart Contracts provide the programmability and customizability of Interbit. Smart Contracts must be written in JavaScript and must be developed using deterministic, functional programming methodology.

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>We need to talk about the third argument passed into smart contracts (chain).</p>
</div>

<div class="hide-in-web">
  <p>Below is an implementation of a simple Smart Contract that increments a counter by an amount whenever an <code>ADD</code> action is received. For context, the action and state are also given.</p>
  <pre><code class="lang-jsx">
var state = { sum: 5 }

var action = {
  type: 'ADD',
  payload: { amount: 5 }
}

var smartContract = {
  incrementSum: (state, action) => {
    var newState = {
        sum: state.sum + action.payload.amount
    }
    return newState
  }
}
  </code></pre>
</div>

<div class="hidden-on-print">
  <p>We have supplied a code exercise of a simple smart contract that should increment a counter by the amount defined in the <code>ADD</code> action payload when it is received. For context, the action and state are given.</p>
  <div class="tips info">
    <p><span></span>Exercise Context</p>
    <pre class="language- exercise-pre">
      <code class="lang-js exercise-code">
  var state = { sum: 5 }

  var action = {
    type: 'ADD',
    payload: { amount: 5 }
  }
      </code>
    </pre>
  </div>

  {% exercise %}
  Write a smart contract to increment the sum contained in the state for the action described above.

  {% initial %}
  var smartContract = {
    incrementSum: (state, action) => {
      // TODO

      return state
    }
  }

  {% solution %}
  var smartContract = {
    incrementSum: (state, action) => {
      var newState = {
          sum: state.sum + action.payload.amount
      }
      return newState
    }
  }

  {% validation %}
  assert(smartContract.incrementSum(state, action).sum === 10 && state.sum === 5)

  {% context %}
  var action = {
    type: 'ADD',
    payload: {
      amount: 5
    }
  }

  var state = {
    sum: 5
  }

  {% endexercise %}

  <div class="tips warning">
    <p><span></span>Assertion failed?</p>
    <p>If your assertion has failed, double check that your smart contract is not mutating the existing state and is instead returning a new state.</p>
  </div>
</div>

## Sagas

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Talk about the root saga.</p>
</div>

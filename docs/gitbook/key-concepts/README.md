# Key Concepts

Actions, application states, and smart contracts are covered below to foster understanding of blockchain technology and Interbit.

## Covenants

A covenant is a set of action creators and types, a reducer (which is a smart contract), and a redux saga that together indicate the functioning of an Interbit blockchain. These actions, smart contract, and saga will work together to fulfill the functionality of a single Interbit blockchain. The rootSaga in a smart contract is optional.

A covenant should be packaged as an npm module but does not necessarily have to be published anywhere to run on the interbit blockchain.

```js
// Covenant exports
module.exports = {
  reducer,
  actionCreators,
  actionTypes,
  rootSaga
}
```

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

## Root Saga

Because a smart contract must be deterministic a method of handling side effects on a blockchain must be used. Interbit uses the redux-saga API to manage side effects. If you require side effect management in your covenant simply export a `rootSaga` in your covenant package export in the same way you would export a redux saga.

Refer to the [redux-saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html) documentation for implementation details.

## Chain Joining

Chains can join to each other via a read or write join. These joins enable Interbit blockchains to share data and interact with each other.

## Read Joins

A read join allows one blockchain to share application state with another. Both blockchains must agree to and authorize the join in order for any data to be shared.

Once authorized on both chains, the providing chain will send verifiable blockheaders and data to the consuming chain which will receive a subset of the providing chain's state. A read join is authorized on the providing chain with an [`'@@interbit/START_PROVIDE_STATE'`](../reference/interbit-covenant-utils/startProvideState.md) action and on the receiving chain by an [`'@@interbit/START_CONSUME_STATE'`](../reference/interbit-covenant-utils/startConsumeState.md). Once both actions have been blocked the state will be shared.

## Write joins

A write join allows one blockchain to remotely dispatch actions to another blockchain. Both blockchains must agree to authorize the join in order for any actions to be sent.

Once both chains have agreed to the join, the remote dispatch is handled using a read join that shares a queue of actions from the sending chain to the receiving chain. The receiving chain will process these actions if the sending chain is authorized to dispatch them.

A write join is authorized on the sending side with an [`'@@interbit/AUTHORIZE_SEND_ACTIONS'`](../reference/interbit-covenant-utils/authorizeSendActions.md) action and on the receiving side with an [`'@@interbit/AUTHORIZE_RECEIVE_ACTIONS'`](../reference/interbit-covenant-utils/authorizeReceiveActions.md) action.


## Configuration and Manifest File

Interbit uses a [configuration](../reference/interbit/config.md) file so that you can describe your entire blockchain network in a single place. This file allows you to generate and manage networks based on the constraints described in the configuration.

The [manifest](../reference/interbit/manifest.md) file is generated during the [`interbit build`](../reference/interbit/build.md) step to describe a fully resolved and deployable blockchain network.

# Hypervisor

The small piece of code that boots interbit and allows hosting of multiple blockchains on a single node.

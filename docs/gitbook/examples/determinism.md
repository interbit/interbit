# Determinism

<div class="tips warning">
  <p><span></span>Incomplete Content</p>
  <p>Since this documentation was written a new feature was implemented. [`redux-saga`](https://github.com/redux-saga/redux-saga) can be used and included in the covenant as the property rootSaga.</p>
  <p>TODO: Write a saga implementation that handles randomness.</p>
</div>

#### Version Requirements
To develop Interbit applications, your development environment will need the following software:

* <a href="https://nodejs.org" target="_blank">Node.js</a> 8.6 or higher
* <a href="https://nodejs.org" target="_blank">NPM</a> 5.8 or higher

## The Example

This example will cover the topic of determinism in Smart Contract development. Determinism in software development means that given a particular state and a specific set of input, the result will always be the same.  This is an important concept to understand before developing an Interbit application.

Determinism is very important when writing smart contracts.

In order for a blockchain to maintain Application State across multiple nodes the smart contract absolutely must be written deterministically. If there are any side-effects, or some non-deterministic process is used, then the different nodes of a blockchain may arrive at a different resulting Application State, which would cause a fork in their chain.

Determinism is essential for all nodes to have a shared application state. Application state is the cumulative result of initial Application State used to initialize the chain and state changes caused by Smart Contracts processing actions in sequence. Nodes do not process data simultaneously. For all nodes to arrive at the same application state, each node must start from the initial application state (or a known blockchain state), execute the same smart contracts with the same inputs in the same order, and get the same results from each smart contract method, given the same inputs.

The consensus mechanism can only order the actions and is not responsible for making sure that each node processing the actions gets the same results from their inputs. It is the Smart Contract that processes the Actions and because of this it must always output the same result if it is given the same inputs. For example, a smart contract cannot call `Date.now()` because if node A has a clock difference of 5 seconds from node B then they will end up with a different time that an event occurred.

There are several things that are inherently non-deterministic and must not be called from within your Smart Contracts. Notably non-deterministic operations include:
 * Time
 * Randomness
 * File operations
 * API calls

This example will cover inserting a randomly generated number into state to be used in a simple implementation of Odd or Even.


## Example

We will handle generating randomness in an Interbit application in 2 ways:

1. Generate a random number outside of the blockchain and dispatch the result to the chain
1. Use a pseudo-random number generator inside of the smart contract with a seed value stored in state

### Pseudo Randomness Dispatched to Chain

The standard way to generate random data in JavaScript is with
`Math.random()`. Although it is a pseudo-random number generator (PRNG),
it cannot be deterministic because it does not accept a seed value. To
handle this oddness, we can simply dispatch a value from `Math.random()`
to the blockchain.

In the following sample is a simple smart contract that accepts an action called `RANDOM` and replaces the random value in state with the one it received from the action.

```js
// Option 1a: Dispatch some random data to your smart contract

// ... the action
RANDOM: 'RANDOM',
random: (number) => {
  return {
    type: actions.RANDOM,
    payload: { number }
  }
},

// ... inside the smart contract
if (action.type === actions.RANDOM) {
  return state.set('number', action.payload.number)
}

// ... dispatching the action
const randomInt = Math.floor(Math.random() * 100)
const randomAction = actions.random(randomInt)
chain.dispatch(randomAction)
```

### True Randomness Dispatched to Chain

If you need something more random, then it is also possible to generate random data and dispatch that value to the blockchain as we have here.


```js
// Option 1b: Dispatch some random data to your smart contract

// ... dispatching the action
fetchRandom()
  .then(trulyRandomInt => {
    const trulyRandomAction = actions.random(trulyRandomInt)
    chain.dispatch(trulyRandomAction)
  })
  .catch(error => {
    console.log(error)
  })
```

### Pseudo Randomness Inside of a Smart Contract

If a PRNG is given a seed value it can be used to give sufficiently random values for many purposes and arrive at the same value on every node in the blockchain. You just need to be sure that the seed value changes every time a random number is generated (in a deterministic way), otherwise the same value will be produced every time. In our case we have simply concatenated the number of times the action has been called to our initial seed value.

Option 2 in our example demonstrates this.


```js
// Option 2: Use a seeded PRNG to make a deterministic "random" value

// ... the action
PSEUDO_RANDOM: 'PSEUDO_RANDOM',
pseudoRandom: () => {
  return {
    type: actions.PSEUDO_RANDOM,
    payload: { }
  }
}

// ... inside the smart contract
if (action.type === actions.PSEUDO_RANDOM) {
  const seed = state.seed + state.times
  const prng = seedrandom(seed)
  const prNumber = Math.floor(prng() * 100)

  state = state.set('number', prNumber)
  state = state.set('times', state.times + 1)

  return state
}

// ... dispatching the action
const pseudoRandomAction = actions.pseudoRandom()
chain.dispatch(pseudoRandomAction)
```

### Alternatively, Rethink the Approach

Here are some questions that may help when faced with non-determinism:

* Do you really need that UUID as a key for your items or can you store them in an array?

* Could you use a nonce instead?

* Does the data you are storing in a file truly need to be on file or can it be loaded on the chain and used that way?

Ultimately, the decision will be based on the requirements of the project but how you handle it will make all the difference in a well written Interbit application.


### Redux Saga

<div class="tips danger">
  <p><span></span>Incomplete Content</p>
  <p>Since this documentation was written a new feature was implemented. [`redux-saga`](https://github.com/redux-saga/redux-saga) can be used and included in the covenant as rootSaga.</p>
  <p>TODO: Write the optional saga implementation.</p>
</div>

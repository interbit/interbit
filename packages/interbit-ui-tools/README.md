# Interbit Middleware

The interbit-ui-tools package contains a Redux middleware and reducer. The middleware and reducer work together to boot the Interbit blockchains specified in the DOM, sync their states with the Redux store, and allow you to dispatch to them.

The Interbit middleware reads the index.html file generated when the blockchain node boots to connect to the chains. To learn more about this file [click here](TODO: LINK or DESCRIBE).

Whenever the blockchains update their state, an action is dispatched to the redux store and its state is updated to match.

The blockchain's dispatch functions are wrapped in the redux dispatch wrapped in an action provided with the reducer.


## Getting started

You will need to include the interbit reducer as well as the interbit middleware to sync your blockchains and your state. You will also need to have launched an interbit node and included the updated index.html file with connection information for interbit.

Let's assume starting interbit output an [index.html](#index-html) from configuration to work with.

### Setting Up

Once the node has generated with chain IDs you can simply include the middleware and reducer as follows to use Interbit.

```js
const { createStore, applyMiddleware } = require('redux')
const {
  reducer as interbitReducer,
  middleware as interbitMiddleware
} = require('interbit-ui-tools')

// including the reducer
const reducers = combineReducers({
  interbit: interbitReducer,
  custom: yourReducer
})

// including the middleware
const store = createStore(reducers, applyMiddleware(interbitMiddleware))
```

### Dispatching to the Blockchain

To dispatch an action to the blockchain you will need to wrap your blockchain action in a 'CHAIN_DISPATCH' action. This redux dispatch function will return the resulting promise from the blockchain.

```js
const { chainDispatch } = require('interbit-ui-tools')
const { myBlockchainActionCreator } = require('./actionCreators')

// Take your chain alias (from interbit.config.js) and the blockchain action ...
const chainAlias = 'myChain'
const blockchainAction = myBlockchainActionCreator(...args)

// ... and wrap them in interbit-ui-tools's chainDispatch ...
const action = chainDispatch(chainAlias, blockchainAction)

// ... then dispatch to the redux store!
store.dispatch(action)
```

### Getting the blockchain's state

Assuming we have used the setup above and the reducer was mounted at `interbit` the redux store would look somthing like this:

```js
const state = store.getState()

console.log(state)
// LOGGED:
// {
//   interbit: {
//     chains: {
//       myChain: {
//         ...myBlockchainState
//       },
//       myOtherChain: {
//         ...myOtherBlockchainState
//       }
//     }
//   },
//   custom: {
//     ...myCustomReduxState
//   }
// }

```

## How It Works

Now that we know how to use it, here is an overview of what it does.
### The Middleware

The middleware reads the interbit script tag from index.html and constructs a chainData object that is used to connect your chain to the redux store. It then boots a hypervisor and attaches a cli to each defined chain and returns the chains to the middleware so that dispatches destined for the blockchains can be intercepted. When a chain forms a block and its state is updated, the middleware dispatches a `'interbit-middleware/CHAIN_UPDATED'` action to the store to sync the state.

The middleware also intercepts any `'interbit-middleware/CHAIN_DISPATCH'` actions, unwrapping them and sending them to the blockchain that was specified by chainAlias. Instead of the usual dispatch return from redux, the blockchain's dispatch promise is returned so you can know when your blockchain action was blocked and stored in the chain. If the blockchain has not loaded yet when you dispatch an action to it, dispatch returns `undefined` and the action is buffered to be dispatched when the chain is loaded.

### The reducer

There is a corresponding reducer that must be used with the middleware that accepts the `'interbit-middleware/CHAIN_UPDATED'` actions and updates the redux store with the dispatched state.

The reducer also comes with an action creator for `'interbit-middleware/CHAIN_DISPATCH'` actions that wraps a blockchain action and takes the alias of the chain that action is meant for.

###  <a name="index-html"></a>index.html

The index file created by interbit start has a script tag with id="interbit" and data that has been appended from the chain configuration file that was used to boot your blockchains. The script tag looks something like this:

```jsx
<script id="interbit" src="http://todo.cdn.interbit.io/interbit.bundle.js" data-chain-id-my-chain="j08534j9rwj9rwej09532bgv98uijnhtrfg89i04t5rw3i" data-chain-id-my-other-chain="890uij4e3wd7yfdsjklhr3982nri4e0tj4scnmxzq9asd3" />
```

# Interbit Middleware

Redux middleware to connect configured interbit blockchains to redux store state.

This middleware creates a connected interface and a hypervisor, then loads and connects to chains and peers that have been specified in the index.html file.

## Setting Up

### Installing dependencies

The middleware is included in the `interbit-ui-tools` package.

```sh
npm i --save interbit-ui-tools redux redux-saga
```

### Creating the Redux Store

Because the interbit middleware contains a saga that must be run there are several steps to including it in your redux store.

1. Creating the Interbit middleware
1. Creating the Redux Saga middleware
1. Including the reducer
1. Including the middlewares with your store on `createStore`
1. Running the saga

```js
import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'

import {
  reducer as interbitReducer,
  createMiddleware as createInterbitMiddleware,
  rootSaga as interbitSaga
} from 'interbit-ui-tools'

import createSagaMiddleware from 'redux-saga'


const createStore = () => {
  // 1,2. Creating the middlewares
  const interbitMiddleware = createInterbitMiddleware()
  const sagaMiddleware = createSagaMiddleware()

  // 3. Including the reducers
  const reducers = combineReducers({
    interbit: interbitReducer,
    // ... other reducers
  })

  // 4. Including the middlewares
  const store = createStore(
    reducers,
    applyMiddleware(interbitMiddleware, sagaMiddleware)
  )

  // 5. Running the saga
  sagaMiddleware.run(interbitSaga)

  return store
}
```

### Specifying Chains in index.html

The middleware automatically connects to any chains that are specified on the first DOM element in index.html with an id of `"interbit"`.

Specify chain IDs using a data tag starting with data-chain-id-chain-name. The chain-name will be camel case when it is used as a chain alias to mount state on in the middleware's redux store.

```html
<div id="interbit" data-chain-id-my-chain="32b9365f325da189439f6d453593cf4e0a5a06ead7e6bbecc1d0814c578df452" />
```

The above data tag will result in a chain named `myChain` being mounted in the middleware state as follows:

```js
const state = {
  interbit: {
    chains: {
      myChain: { ...chainState }
    },
    chainData: {
      myChain: {
        status: 'BLOCKING',
        chainId: '32b9365f325da189439f6d453593cf4e0a5a06ead7e6bbecc1d0814c578df452'
      }
    }
  }
}
```

The chains property contains chain state for each of the connected chains and the chainData section contains metadata about the chains including their status (LOADING, BLOCKING, etc.) as well as their chainId.

<div class="tips warning">
  <p><span></span>TODO</p>
  <p>Incomplete content. These statuses need to be documented in an API reference and linked to from here.</p>
</div>

### Specifying peers in index.html

You can specify peers for your browser node to connect to in index.html as well. There are specified the same was as chains using the data-peer-hints attribute.

If no port is specified the middleware will attempt to connect on port 80 for http connections and 443 for https connections.

To specify multiple peers, separate them using a comma.

If no peers are specified the middleware will attempt to connect to localhost:5000, which is the default set by interbit when it runs a node.

```html
<div id="interbit" data-peer-hints="your-blockchain-node.com,localhost:1234" />
```

### Using Interbit Config to Specify Chains in index.html

Interbit config can be used to automatically update chain IDs as you generate new chains and adjust your network configuration.

To configure an application which has the index.html file in cwd/public/index.html add the following to the interbit configuration.

```js
const config = {
  // ... other configuration ...
  apps: {
    myApp: {
      peers: [], // If no peers are specified then the middleware will use the default of localhost:5000
      chains: ['myChain'], // the chains that need to load in the browser
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build/') // the location of the finished build to update
    }
  }
}
```

### Getting Interbit State

Getting interbit state once the middleware is attached works through the redux store.

```js
const state = store.getState()
console.log(state.interbit)
```

### Dispatching to Interbit

The middleware comes with an action creator that wraps your blockchain action in a redux action with the chain alias of the chain you wish to dispatch your action to.

The middleware intercepts the blockchain action and returns the promise from the blockchain to the user after dispatch. This promise will resolve when the action is blocked or reject on failure.

```js
const { chainDispatch } = require('interbit-ui-tools')
const blockchainAction = {
  type: '@@blockchain/ACT',
  payload: {
    data: 'meowmeowmeow'
  }
}

const reduxAction = chainDispatch('myChain', blockchainAction)

const blockchainPromise = store.dispatch(reduxAction)
```

## Advanced Use

The middleware can be configured to allow authorized joins to interbit account chains.

<div class="tips warning">
  <p><span></span>TODO</p>
  <p>Incomplete content.</p>
</div>

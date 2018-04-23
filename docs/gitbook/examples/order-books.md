# Order Books Example

The `InterbitSDK/examples/order-books` directory contains an example React application that contains a blockchain application powered by Interbit. We've used the [`create-react-app`](https://github.com/facebookincubator/create-react-app) npm package and [`react-bootstrap`](https://react-bootstrap.github.io/), [`react-redux`](https://github.com/reactjs/react-redux), and [`redux`](http://redux.js.org) for a quick and easy development experience.

The application mimics an exchange’s set of open orders for various commodities trading or this fictional exchange's order books. It contains balances of each commodity traded by a user and a list of the open trades on its books. The commodities traded are oil, gas, Canadian dollars (CAD), and United States dollars (USD). Because of the limitations of the library used in this release, there is only one user that can open orders on the books in this example. However, this code can easily be extended to other users if you are so inclined.

The rest of this page contains a description of the parts of the application and how they all fit together, with some comments on application expansion possibilities.


## Assumptions

* You know React basics (what a Component is; what render is).
* You know Redux basics (what a reducer is; what an action is; what the store is).

## Relevant terminology

Some important key concepts used in this example are:
* [Action](../key-concepts/README.md#action)
* [Application State (or State)](../key-concepts/README.md#application-state)
* [Blockchain](../GLOSSARY.md#blockchain)
* [Blockchain State](../GLOSSARY.md#blockchain-state)
* [Cryptography](../GLOSSARY.md#cryptography)
* [Smart Contract](../key-concepts/README.md#smart-contracts)

Some more terminology from other sources used are:
* [React Component](https://facebook.github.io/react/docs/react-component.html)
* [Redux Store](http://redux.js.org/docs/api/Store.html)

## Run the Application

To get started, run the following commands in your console:

```bash
$ cd /InterbitSDK/examples/order-books/
$ npm install
$ npm test
$ npm start
```

The `npm test` command runs a Mocha test suite designed to make sure the Smart Contract works correctly. The `npm start` command starts a webpack server, and boots an Interbit blockchain in a React app in the browser.


## Example

Inside the `examples/order-books directory`, there is a React application made using `create-react-app` that boots an Interbit blockchain on the client side, and interacts with it using `react` and `react-redux`. Along with a few files, there are three subdirectories: `public`, `src`, and `tests`.

Directory/File                | Purpose
----------------------------- | -------
public                        | public files available to the client, such as css files
src                           | source code to render the react app, and boot and interact with the blockchain
src/chain                     | source code to manage the Interbit Blockchain
src/components                | React Component source code
src/redux                     | Redux reducer, actions and state to sync redux store with the Blockchain Application State
src/index.js                  |
src/registerServiceWorker.js  | file from [`create-react-app`](https://github.com/facebookincubator/create-react-app) to serve the React app
tests                         | Mocha test suite to make sure the Smart Contract works correctly
.babelrc                      | configuration for ES6 compiler
package.json                  | NPM configuration file

This example will focus primarily on the contents of the `src` directory before touching on `tests`. it will not address `registerServiceWorker.js` as it is included by `create-react-app`. Please see the documentation for [`create-react-app`](https://github.com/facebookincubator/create-react-app) to learn more about this file or the directory structure.

This example will not address [`.babelrc`](https://babeljs.io/docs/usage/babelrc/), [`package.json`](https://docs.npmjs.com/files/package.json), or the [`public`](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#folder-structure) directory.

### Entry Point

As the entry point for the application, `src/index.js` is responsible for rendering the React app and connecting it to the redux store. To do this, it wraps the `App` Component in a [`Provider`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) Component supplied by `react-redux` which has been given the Redux Store. The store is passed a reducer and an initial state that can be invoked when the Blockchain state updates to keep the two synced. Once the Blockchain has been booted, it will remain synced with the Redux Store as long as the React app remains running.


### Chain Directory

The `src/chain` directory contains all of the files required for the Blockchain. It holds the Smart Contract, the Actions, the initial Application State, as well as the keys and a file that boots a new chain.

#### Actions

`src/chain/actions.js` contains two Action types and a function to generate each type of action that can be easily used across the application and during testing.

These Actions will be passed to the Blockchain when it is booted to let it know which operations are valid, and they will be used to distribute data to the Blockchain during operation. Once the Blockchain has received the Actions, it passes them to the Smart Contract with the current Application State to get a new Application State.

This example contains two Actions: `PLACE_ORDER` and `CANCEL_ORDER`. Below, we will take a look at the `PLACE_ORDER` Action.

<div class="filename">src/chain/actions.js</div>

```js
const actions = {
  PLACE_ORDER: 'PLACE_ORDER',
  placeOrder: ({ bidFlavour = 'cad', askFlavour = 'oil', price = 1, bidAmount = 10, conditions, orderId }) => ({
    type: actions.PLACE_ORDER,
    payload: {
      bidFlavour, askFlavour, price, bidAmount, conditions, orderId
    }
  }),
  // ...
}
```
<div class="tips info">
  <p><span></span> <code>PLACE_ORDER</code> Action Type and Creator</p>
  <p>This snippet shows an Action type definition, which is simply a string and its corresponding Action creator function. The Action creator returns a standardized payload so we can consistently reference it in the Smart Contract and easily make new Actions for operation and testing.</p>
</div>


#### Application State

`src/chain/initialState.js` contains the starting application state for the Blockchain to use before any actions have been processed. An initial state is required so that when the first Action is received on the Blockchain, there is some state available to pass to the Smart Contract with the Action.


#### Keys

`keys.js` contains the public and private OpenPGP cryptography keys for this application. These keys are used to create a `Crypto` object which is passed to the Blockchain at chain boot time. The `Crypto` object is then used to sign any Actions that are dispatched to the Blockchain, and the public key is used for Cryptographic verification.


#### Smart Contract

`smartContract.js` contains the smart contract that will run on the Blockchain.

The smart contract is responsible for changing the state in response to user actions generated from the GUI, and manages orders as they are placed on the books and cancelled from user operations.

<div class="filename">src/chain/smartContract.js</div>

```js
export default {
  orderBook: (state = Immutable.from(initialState.orderBook), action) => {
    console.log(action)
    switch (action.type) {
      case actions.CANCEL_ORDER:
        return cancelOrder(state, action)

      case actions.PLACE_ORDER:
        return placeOrder(state, action)

      default:
        return state
    }
  }
}
```
<div class="tips info">
  <p><span></span>The Smart Contract</p>
  <p>The smart contract for this project exports a fairly basic function. It switches on the action type and calls helper functions within the same file to manage and update the state based on the type of action that occurred.</p>
  <p>When a <code>CANCEL_ORDER</code> action arrives, the order is taken off the books, and the bid amount is returned to the user who placed the order</p>
  <p>When a <code>PLACE_ORDER</code> action arrives, the bidFlavour balance is checked to see if the user has enough of the commodity they are bidding to place the order. If they do, that balance is locked from their account while the trade is on the books. If a corresponding order is already on the books, a trade will be made, and any remaining amount to be traded will be placed on the books. If there is no corresponding order, the order will simply be placed on the books.</p>
</div>

#### Booting the Chain

`bootChain.js` contains a script that uses the other chain files to create the Blockchain, and then returns a promise that will resolve with the chain or reject.

When the chain boots, it will load the Smart Contract, Actions, and initial Application State that are given to it. The keys are used to create a Crypto object that will sign any actions dispatched by this chain.

The chain will accept Actions defined in `actions.js`, and pass them to the Smart Contract given to the chain at boot with the Application State. The first time an Action is dispatched to the chain, it will pass the state defined in `initialState.js` to the Smart Contract that was loaded on the chain with the Action.

We will wire the Application State updates resulting from these dispatched Actions to the React Components in real time to build our application. In order to sync our Blockchain's Application State with our React application's state, we will use `react-redux` and `redux`.

### Redux Directory

The Redux logic for syncing with the Blockchain Application State lives in `redux/chains.js`. This file contains a reducer, an action, and some initial state to be passed to Redux's `createStore` method. You may notice that this looks very similar to the definition of a Smart Contract for an application powered by Interbit. This is intentional.

`CHAIN_UPDATED` is the only Redux action defined. It is meant to be called whenever the Blockchain updates.

The corresponding creator function takes the chain, its name, and its updated state. When the resulting action is fired, it triggers a reducer that overwrites the previous Blockchain state in the Redux Store. This allows us to sync the Blockchain with the Redux Store.

This synced state in the Redux Store is passed to the application.


### React Components

The React Components that make up the GUI for this application do not have access to the store by default. They must use the `react-redux` `connect` method to access the Redux Store. This example contains three major Components:

* [`ChainDetails`](order-books.md#chaindetails) is a read-only Component that shows the Blockchain's state in tree view and raw view.
* [`OrderBook`](order-books.md#orderbooks) is an interactive Component that both displays the Application State, and dispatches user activity as Actions to the Blockchain
* App is the Component that brings these pieces together.

Because the App Component is so simple, we will not spend any more time discussing it. It is in `src/components/App.js` if you want to want to learn more.

#### ChainDetails

`ChainDetails` is a fairly simple Component that connects to the Redux Store, and then renders based on the synced blockchain data

##### Connect to the Redux Store

`ChainDetails` uses the connect function from `react-redux` to access the Redux Store, and maps the store to its own state. It then takes the `orderbook` property of the store, which is the orderbook Blockchain. It proceeds to take and render this synced data in a raw format through another Component, the `BlockExplorer`. It ties these Components together using some predefined Components from  `react-bootstrap` for simplicity. We will go over mapping the chain state to props and accessing those props.


<div class="filename">src/components/index.js</div>

```js
// Defining how to map Redux's state to local props
const mapStateToProps = (state, ownProps) => {
  return { chain: state.orderbook }
}

// Decorating and exporting the ChainDetails Component
export default connect(mapStateToProps)(ChainDetails)
```
<div class="tips info">
  <p><span></span>Connecting the React Component to the Store</p>
  <p>The <code>mapStateToProps</code> function accepts the Redux Store's state and a Component's props, then maps these to a new set of props that will be used in the Component. This mapping function is then passed into the <code>connect</code> function from <code>react-redux</code> to create a decorator function that can be called on a Component class. Finally, this function is called on our <code>ChainDetails</code> class and its props are mapped with data from the Redux Store's state, and are available for rendering. It is this decorated class that we will be exporting and using in our application.</p>
  <p>In this example, we are setting <code>props.chain</code> with the <code>orderbook</code> chain from the Redux Store so we can render its data.</p>
</div>

##### Rendering the Data

When this `ChainDetails` Component is rendered, we can access the props to display the Blockchain data or pass data from these props to other Components. In our example, we are doing both. The raw view stringifies the entire state, and the BlockExplorer Component is passed the props for its own rendering.

<div class="filename">src/components/ChainDetails/index.js</div>

```jsx
class ChainDetails extends React.Component {
  render () {
    // ...

    // Accessing the synced Redux Store's state from the Component props
    const state = this.props.chain.app
    const chain = this.props.chain.chain

    // ...
    return (
      // ...

      // Rendering raw Blockchain data from the props
      <pre>
        {JSON.stringify({ state, chain }, null, 4)}
      </pre>

      // ...

      // Passing the props to another Component
      {% raw %}<BlockExplorer treeData={{ state, chain }} />{% endraw %}

      // ...
```
<div class="tips info">
  <p><span></span>Using the Mapped Props</p>
  <p>The mapped props are then used in the same way they would be in any other React Component. Here, they are being rendered and passed to another Child Component.</p>
</div>

Both of these Components are fairly simple if you are familiar with React.


#### Orderbooks

The `Orderbooks` component also connects to the Redux store. Because it reads and writes data to the chain, it maps both state and dispatch to Component props. The `src/components/Orderbooks/index.js` file is where the mapping happens. Other files are child Components. We will discuss the `index.js` file first, followed by the Components that display the Blockchain Application State, followed by the Components that dispatch Actions.


##### Connecting to the Redux Store

The `src/components/Orderbooks/index.js` file is the primary application file. It boots a new chain, and maps Redux's dispatch function to props so that it can notify Redux whenever the Blockchain's Application State has updated. We will first cover mapping state and dispatch to props, and then discuss how that is used to sync the chain

<div class="filename">src/components/OrderBook/index.js</div>

```js
import { chainUpdated } from '../../redux/chains'

// ...

const mapStateToProps = (state, ownProps) => {
  return { chain: state.orderbook }
}

// Mapping the import chainUpdated Redux action creator to props
const mapDispatchToProps = {
  chainUpdated
}

// Connecting our OrderBook Component to the Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(OrderBook)
```
<div class="tips info">
  <p><span></span>Connecting State and Dispatch to Props</p>
  <p>Much like the <code>mapStateToProps</code> function, <code>mapDispatchToProps</code> returns an object that will be mapped to the connected Component's props. In our example we have included the <code>chainUpdate</code> action from <code>src/redux/chains.js</code>. When we call this creator function from props, the resulting action will be dispatched to Redux and result in a change to the Redux Store. We can call this whenever the Blockchain Application State updates to keep them synced.</p>
  <p>We are still setting <code>props.chain</code> with the orderbook chain from the redux store. We are also mapping a Redux action to dispatch so that it will update the store with the new Application State when it is called.</p>
  <p>This time, when we call connect, we are passing both <code>mapStateToProps</code> and <code>mapDispatchToProps</code>. This will return a decorator function that we use to decorate our <code>OrderBook</code> Component. Once decorated and connected to the Redux Store and action dispatcher, it is exported for use in our application.</p>
</div>

##### Booting and Syncing the Blockchain

Once the dispatch is available for Redux to use, we will have to create a Blockchain and sync to Redux using the Blockchain's subscribe function. The Blockchain is booted and synced from within the `OrderBook` Component when the Component has mounted using the `componentDidMount` function from React.

<div class="filename">src/components/OrderBook/index.js</div>

```js
// ...
import bootChain from '../../chain/bootChain'
// ...

class OrderBook extends React.Component {
  // ...

  // Booting a new Blockchain when the Component has mounted
  componentDidMount () {
    this.setState({ loading: true }, () => {
      bootChain()
        .then((chain) => {
          this.chain = chain
          this.chainUpdated()
          // Subscribing to changes in the Blockchain with a Redux action
          this.chain.subscribe(this.chainUpdated)
          // ...
        })
    })
  }

  // Getting the Blockchain and Application State from this.chain and updating Redux
  chainUpdated = () => {
    const state = this.chain.getState()
    const chainState = this.chain.getChainState()
    this.props.chainUpdated('orderbook', state, chainState)
  }

  // ...
```
<div class="tips info">
  <p><span></span>Booting and Syncing the Blockchain</p>
  <p>We will use React's <code>componentDidMount</code> function to boot our chain when the Component is first mounted. We have imported the <code>bootChain</code> function that we wrote from <code>/src/chain/bootChain.js</code>. When the chain has booted and is available, we save the chain locally, call <code>chainUpdated</code> directly to sync with redux, and subscribe to Blockchain changes with its subscribe function.</p>
  <p>We have wrapped the <code>chainUpdated</code> function from the mapped props in another function that uses the saved chain to get the chain state and application state before passing that data to Redux. This will sync the Redux Store with the Application State and the Blockchain's state.</p>
</div>

The rest of the Components in the `OrderBook` are rendered using `react-bootstrap` to hold them together. They are responsible for displaying pieces of the Application State and dispatching user activity to the Blockchain as Actions.

##### Displaying Loading and Boot Errors

You may have noticed that during the Blockchain boot process, we set the local state's loading property to true. The Component's local state is used to indicate loading and errors from the Blockchain booting process. Any errors or loading state are rendered when the Blockchain Application State is unavailable.

<div class="filename">src/components/OrderBook/index.js</div>

```jsx
// ...
import bootChain from '../../chain/bootChain'
// ...

class OrderBook extends React.Component {
  constructor (props) {
    super(props)
    // Defining local state to handle loading and errors
    this.state = {
      loading: false,
      error: null
    }
  }

  // Setting local state to indicate loading and errors during boot
  componentDidMount () {
    this.setState({ loading: true }, () => {
      bootChain()
        .then((chain) => {
          // ...
          this.setState({ loading: false })
        })
        .catch((err) => {
          this.setState({ error: err.message })
        })
    })
  }

  // ...

  // Rendering errors and loading status based on local state
  render () {
    if (this.state.error) {
      return (
        <div>
          <h2>Try again</h2>
          <p>{this.state.error}</p>
        </div>
      )
    }

    if (this.state.loading || !this.props.chain || !this.props.chain.app) {
      return <h2>loading...</h2>
    }

    // ...
```

<div class="tips info">
  <p><span></span>Rendering Loading and Errors</p>
  <p>Above, you can see we are using the local state to render an error message or a loading indicator when there are problems with the Blockchain booting process or when the Application State is unavailable. Simple messages will do, but if you want something more interesting, you could easily load a child Component instead.</p>
</div>


##### Displaying Application State

The `Balance` and `OpenOrders` Components simply take the state that was connected to props and display it. Below, you can see the `Balance` Component is rendering the balances from the state for a specific public key.

<div class="filename">src/components/OrderBook/Balance.js</div>

```jsx
import Balance from './Balance'
import keys from '../../chain/keys'
// ...

class OrderBook extends React.Component {
  // ...
  render () {
    // ...
    const state = this.props.chain.app
    // ...
    return (
      // ...

      // Render a subset of the Application State in the Balances Component
      <Balance balances={state.orderBook.balances[keys.public]} />
      // ...
    )
  }
```
<div class="tips info">
  <p><span></span>Rendering a Component from State</p>
  <p>In the snippet above, we are rendering this child Component the same way that the <code>BlockExplorer</code> was rendered from the <code>ChainDetails</code> Component. The <code>Balance</code> Component is being passed the balances part of the state belonging to a specific public key.</p>
  <p>It would be possible to connect to a chain using a public key from environment variables, and only display the portion of the state related to that key if there were more users connecting to this chain. In this simplified example, however, we have only used one key pair and one Blockchain.</p>
</div>

##### Reacting to User Activity

The `PlaceOrder` and `CancelOrder` Components bypass traditional form submission and dispatch Actions to the Blockchain instead. We will look at `CancelOrder` because it is the simpler of the two Components. Inside of `CancelOrder`, local state is used to hold form values as they change, as in a normal React Component. When the submit button is pressed, they are dispatched to the Blockchain.

<div class="filename">src/components/OrderBook/CancelOrder.js</div>

```jsx
export default class CancelOrder extends Component {
  constructor(props) {
    super(props)
    // Setup local state
    this.state = {
      orderId: ''
    }
  }

  // ...

  render() {
    return (
      // ...
      // Save user input to local state
      <FormControl type='text'
        value={orderId}
        onChange={e => this.setState({ orderId: e.target.value })}
      />
      // ...
```
<div class="tips info">
  <p><span></span>Saving User Input to Local State</p>
  <p>Saving local state is business as usual for a React Component. Local state is set on construction, and then modified as the user changes form values.</p>
</div>

Once we have saved changes to the text field in the local state, we can dispatch the user activity in an Action to the Blockchain when the user clicks a button.

<div class="filename">src/components/OrderBook/CancelOrder.js</div>

```jsx
export default class CancelOrder extends Component {
  // ...

  dispatchCancelOrder = (chain, order) => {
    // Generate an Action and dispatch it to the Blockchain
    const cancelOrderAction = chain.getActions().cancelOrder(order)
    chain.dispatch(cancelOrderAction)
  }

  render() {
    const chain = this.props.chain
    const orderId = this.state.orderId

    return (
      // ...
      // When the Button is clicked, dispatch the local state to the Blockchain
      <Button onClick={() => this.dispatchCancelOrder(chain, { orderId })}>
        Cancel Order
      </Button>
      // ...
```
<div class="tips info">
  <p><span></span>Dispatching Saved State</p>
  <p>When the button is clicked, the Blockchain is accessed through props, and an Action is generated and dispatched to it using the user inputs from the form.</p>
</div>

### Testing

There is a single Mocha test suite in this example that tests that the Smart Contract supplied to the Blockchain is working. Tests are written by passing a mocked Action and Application State into the Smart Contract, and asserting that the results were as expected.

```js
  it('does not PLACE_ORDER if account does not have sufficient balance', function () {
    // Modify initial state so that user 1 has a CAD balance of 0
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 0 } })

    // Create an action to bid CAD for oil sent by user 1
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      price: 1,
      askFlavour: 'oil',
      bidAmount: 10
    })
    action.signature = { publicKey: 1 }

    // Run mocked Application State and Action through the Smart Contract
    let newState = smartContract.orderBook(state, action)

    // Assert that no new orders were added for CAD->oil
    should.ok(newState)
    should.equal(0, newState.books.cad.oil.length)
  })

  // ...
```
<div class="tips info">
  <p><span></span>Example Test Case</p>
  <p>This test case asserts that there are no new orders placed when the user (defined by their public key) places an order if they do not have sufficient balance to pay for the order.</p>
  <p>As you can see, we mock the Action's signature to mimic a specific user interacting with the Blockchain. We set this user's balance to 0 CAD in the Application State, and pass the mocked State and Action into the Smart Contract. Finally, we assert that a new order was not added to the Application State.</p>
</div>

## Summary

With this example, we have covered booting a Blockchain from a React Component, accessing that Blockchain in child Components, syncing the Blockchain State and Application State with Redux, and using `react-redux` to access the state from React Components that do not have access to the full Blockchain.

The concepts covered here apply to any React-Redux application that you may build on the Interbit Blockchain Development Platform.


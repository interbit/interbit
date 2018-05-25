# Using the Template Application

This walkthrough starts where the [Getting Started](../getting-started/README.md) guide left off.

The template application may seem like a lot but it comes with an architecture that allows each browser to interact with the application using its own private chain, and shows the user how to join two chains together through redirects.

In this walkthrough we will cover:
  - [Version requirements](./template.md#version-requirements)
  - [Application structure](./template.md#application-structure)
    - Directory structure
    - Chain architecture
  - [Sponsored Chains](./template.md#sponsored-chains)
  - [The Interbit Config](./template.md#the-interbit-config)
    - Static chains
    - Covenants
    - Joins
    - Apps
  - [The Covenants](./template.md#the-covenants)
    - The Private Covenant
    - The Public Covenant
    - The Control Covenant
  - [The Application](./template.md#the-application)
    - index.js
    - Connecting the Chain to a UI Component

#### Version Requirements
To develop Interbit applications, your development environment will need the following software:

* <a href="https://nodejs.org" target="_blank">Node.js</a> 8.6 or higher
* <a href="https://nodejs.org" target="_blank">NPM</a> 5.8 or higher

## Application Structure

This template comes with a lot of moving parts to help you bootstrap an application that uses joined chains from the browser.

Below we cover the files and folders in the app and what they are used for. We will exclude `.env`, `.gitignore`, `CHANGELOG.md`, `package.json`, and `README.md`.

### Directory Structure

Directory | Purpose
----------|-----------
`public`                  | Website's public directory
`src`                     | Source code for the app
`src/adapters`            | A set of adapters to fill UI details for the covenant forms
`src/components`          | React components
`src/constants`           | A file of constants that are used throughout the application (Ex. URLs)
`src/containers`          | React components that are connected to redux state
`src/css`                 | The css
`src/interbit`            | All of the covenants needed for this application
`src/redux`               | Reudcers and any other redux related files
`tests`                   | Jest tests
`App.js`                  | The main React component that loads the SPA
`exports.js`              | A file to export anything that may be needed outside of this project (Ex. covenant action creators)
`index.js`                | The file that creates the Redux store, attaches the [Interbit middleware](../reference/interbit-middleware/README.md), and runs the SPA
`registerServiceWorker.js` | A file used by create-react-app to register a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/)
`interbit.config.js`      | The [Interbit configuration file](../reference/interbit-cli/config.md)
`interbit.prod.config.js` | The production environment interbit configuration file
`keyPair.js`              | A file to import a public private key pair from environment variables when in production
`static.json`             | Used to serve a single page application (SPA) in Heroku. This describes where to fallback if routes are not matched (Returning 404)

If you run an Interbit node, it will generate a data store called `db-interbit`.

If you run the `interbit:build` command it will generate a `dist/` directory containing the Interbit build.

If you run the `build` command it will generate a `build/` directory containing the React app build.


### Chain Architecture

In this application there are 3 types of chains.

 - A public chain which is loaded by everyone in the browser
 - A private chain that is created for each browser that connects to the public chain and belongs to the user
 - A control chain which resides only on the nodes and is responsible for hosting and authorizing the private chains

The chain type is defined by its covenant.

Because this is a permissioned system, simply loading a chain in the browser is not enough to interact with it. The browser is running a full node with its own set of keys and those keys must be authorized to interact with the system somehow.

We use a process called chain sponsorship to perform this authorization.

Further Reading:
 - [Chain Architecture](../architecture/chain-architecture.md)

<div class="tips warning">
  <p><span></span>Incomplete Content</p>
  <p>TODO: Add a diagram of hypervisors, node, browser, and covenants.</p>
</div>

## Sponsored Chains

A sponsored chain can request for a host to run the sponsored chain on the host's hypervisor. The host can deny this request.

The sponsored chain is the one that being run on another hypervisor, and the host is the one running the sponsored chain.

Being a sponsored chain means that some other hypervisor has agreed to run your genesis block (and therefore your chain) outside of the hypervisor it was created on. This means that the private chains, once sponsored, can persist and be propagated throughout the network but only if they meet a certain criteria and the host, the control chain in our case, is willing to host them.

Sponsoring is important, because without it our private chains would not be able to run outside of the browser window that opened them. They need to be hosted outside of the browser so that when a user clears the browser's local storage or loads the application from a separate device, they can get their own chain back.

In order to be sponsored a chain must:
1. Run a specific covenant on it. The covenant hash and therefore the code must be known to the host
1. Allow the hosting chain to form all of its blocks by including it's public key as root and as the block master
1. Know the chain ID of its host and send the host its sponsorship request.

It is not important to know how sponsorship works immediately, but it is worth understanding in more detail if you want to know everything about how the application works.

Further Reading:
 - [How Middleware Sponsors Chains](../reference/interbit-middleware/chainSponsorship.md)

<div class="tips warning">
  <p><span></span>Incomplete Content</p>
  <p>We will be updating our documentation with a deep dive into sponsorship in the coming weeks.</p>
  <p>TODO: Add a link to Sponsorship Docs</p>
</div>

## The Interbit Config

The Interbit config determines how your node will run. The configuration in the template application specifies two static chains, three covenants, one application, and one peer.


<div class="tips info">
  <p><span></span>Updating the Config</p>
  <p>When you update the config you will need to restart the Interbit node using <code>npm run interbit:start</code>.</p>
</div>

#### Configured Static Chains

The static chains configured for our application are the public and control chains.

The public chain is loaded in the browser and on the node and supplies the browser with the instructions necessary to create a sponsorable private chain.

The control chain is only loaded on the node and is responsible for hosting and controlling the private chains.

This example does not demonstrate creation of dynamic chains.

Further Reading:
 - [Interbit Configuration File](../reference/interbit-cli/config.md)
 - [Static and Dynamic Chains](./static-dynamic.md)

#### Configured Covenants

There are three covenants used in this application.

The [public covenant](https://github.com/interbit/interbit/tree/master/packages/template/src/interbit/public) is an identity reducer. Much like an identity function, it always returns its state. Because anyone can load it in the browser it supports no actions at all.

The [control covenant](https://github.com/interbit/interbit/tree/master/packages/template/src/interbit/control) does not do much either, as the functionality required to sponsor chains comes with [`interbit-core`](../reference/interbit-core/README.md). When this chain is initially deployed and receives a SET_MANIFEST action, which contains covenant hashes and chain IDs for the network, it sets up information about how it would like sponsored chains to apply for sponsorship. This is shared with the public chain via read join in the [Interbit configuration](./template.md#configured-joins).

The [private covenant](https://github.com/interbit/interbit/tree/master/packages/template/src/interbit/private) describes how the users interact with the application. They allow the users to add memos that only they can see as well as sum numbers together.

Further Reading
 - [What is a Covenant](../key-concepts/README.md#covenants)
 - [Writing Covenants](./covenants.md)

#### Configured Joins

There are two joins configured for the template app. Both joins are a read join from the control chain to the public chain.

The first join is named `'INTERBIT_SERVICES'` and contains URLs to link to interbit services such as accounts.test-interbit.io.

The second join is named `'HOSTING_SPONSOR'` and it contains the information required for a private chain to be sponsored. This includes
 - the control chain's chain ID
 - the control chain's public key
 - a hash of the covenant that the control chain is willing to host.

This is all the information a private chain needs to be hosted. This information is given to the public chain so that it is available in the browser. This information will be provided by the browser's hypervisor to the host so that the private chain can be sponsored.

Further Reading
 - [What is a Join](../key-concepts/README.md#chain-joining)
 - [How to Join](./joining.md)

#### Configured Apps

This Interbit configuration file specifies configuration for one application. The configuration specifies an `index.html` file to update with peers and chain IDs that the middleware will load.

Every time you generate a new chain ID by running a new Interbit node, the index.html file specified in `apps` will update with any new information.

```js
  apps: {
    theNewThing: {
      peers: ['localhost:5000'], // the peers the browser should connect to
      chains: [chainAliases.PUBLIC], // the chains that need to load in the browser
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      // ...
    }
  }
```

Further Reading
 - [Apps Config](../reference/interbit-cli/config.md#apps)

## The Covenants

The `src/interbit` folder contains the covenants that will run on the Interbit blockchains.

Each covenant must be written as though it were an npm package about to be published to npm. This means that it can contain no file references outside of its folder, even though it is inside of another project. This is because when it is loaded onto the chain for distribution throughout the blockchain network, it will not have access to the rest of the files in the project.

It is also important that each covenant be an npm package with its own `package.json` file, specifying its dependencies. These covenants should use immutable state from the [`seamless-immutable`](https://github.com/rtfeldman/seamless-immutable) npm package.

<div class="tips info">
  <p><span></span>Changing the Covenants</p>
  <p>When you change the covenants you will need to turn the Interbit node off and on again.</p>
  <p>There is an open issue to restore the covenant watch and deploy feature. (#181)</p>
</div>

### The Private Covenant

The private covenant is the one the browser's hypervisor will be authorized to use. This means that it is the one the user will interact with the most.

Because of this, it contains two (not very) interesting actions `ADD_MEMO` and `ADD_NUMBER`. Actions for this covenant are dispatched to the private chain from the React app's UI.

The covenant's reducer, which updates application state, is written the same way as a redux reducer.

Here is the `ADD_MEMO` action in the private covenant's reducer

```js
const reducer = (state = initialState, action) => {
  // ...
  switch (action.type) {
    case actionTypes.MEMO: {
      const { text } = action.payload
      const memos = state.getIn(['memos'], Immutable.from([]))

      return text ? state.set('memos', memos.concat(text)) : state
    }

    // ...

    default:
      return state
  }
}
```

### The Public Covenant

The public covenant acts as a buffer between the control covenant and the outside world. It is loaded in the browser as dictated in the Interbit config file.

It simply provides the information required for the browser's hypervisor to send a sponsorship request to the control chain.

### The Control Covenant

The control chain only sets up information about sponsorship and shares it with the public chain.


## The Application

The React application for this project was created using [`create-react-app`](https://github.com/facebook/create-react-app/).

The React application syncs to the blockchain and makes the sponsorship request using the `interbit-middleware` from the `interbit-ui-tools` package. The middleware knows which peers to connect to and which chains to load from the information written by config to the index.html file.

The index.js file that loads the React app also attaches the middleware and prepares it for sponsorship.

### Index.js

Let's take a look at `src/index.js`.

```jsx
// ... imports occur

const interbitMiddleware = createInterbitMiddleware({
  publicChainAlias: PUBLIC,
  privateChainAlias: PRIVATE
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(interbitMiddleware, sagaMiddleware))
)
sagaMiddleware.run(interbitSaga)

// BlockExplorer will monitor the public chain
store.dispatch(setSelectedChain(PRIVATE))

// eslint-disable-next-line react/no-render-return-value
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
```

It's a fairly straightforward file with only a few steps

1. The middleware is attached to the redux store as a middleware
1. Saga middleware is added to the store
1. We include redux devtools because they are lovely
1. The interbit middleware saga is run
1. We dispatch an action into the redux store to tell it which chain we want to see first
1. The react app is rendered
1. The service worker from create-react-app is rendered.


The middleware is loaded with sponsorship details by giving the chain aliases of the public and private chain. When the middleware loads, it will automatically generate a new private chain with details from the public chain. This private chain will be attached to the redux store and automatically synced every time a block is formed by the middleware.

Further Reading
 - [interbit-middleware](../reference/interbit-middleware/README.md)
 - [create-react-app](https://github.com/facebook/create-react-app/)

### Connecting the Chain to a UI Component

The React component `InteractiveChains`, found at `app-the-new-thing/src/containers/InteractiveChains.js`, does a few things to map the blockchain dispatch to the UI.

First, it is a redux connected component which has mapped the Interbit middleware state to props and has also mapped a special redux action from the middleware to props.

Mapping state to props is simple since the middleware handles almost everything for you. Inside of state.interbit lies all the state from the chains that were connected to the app from the apps configuration in the Interbit config file.

The dispatch is a little more interesting. Let's take a look.

```jsx
import { chainDispatch } from 'interbit-ui-tools'
// ...
const mapDispatchToProps = dispatch => ({
  resetForm: form => {
    dispatch(reset(form))
  },
  // We have curried this function by chain alias, so that we can dispatch to the blockchain through the middleware
  blockchainDispatch: chainAlias => action =>
    dispatch(chainDispatch(chainAlias, action))
})
// ...

export class InteractiveChains extends Component {
  // ...

  render() {
    const { selectedChain, resetForm, blockchainDispatch } = this.props
    // ...

    return (
      <Grid>
        <Row>
          <LinkedCovenant
            // ...

            // Here we are using the blockchainDispatch like any other redux dispatch prop
            blockchainDispatch={blockchainDispatch(selectedChain.chainAlias)}
          />
        </Row>
      </Grid>
    )
  }
}
```

First, in mapDispatchToProps there is a prop called `blockchainDispatch` which dispatches a chainDispatch action from `interbit-ui-tools` to the redux store. This function takes an action that is destined for your blockchain and the alias of the blockchain to send it to.

In our case, when we pass the prop to `LinkedCovenant` in the render function we are currying it to use the chain that is selected in our redux state. This way, whenever a new chain is loaded in the UI we are automatically mapping our dispatch to the chain that was selected.

When this action is dispatched to the redux store the middleware will intercept it and send it to the correct blockchain. The middleware will return the promise that was returned from the blockchain from the redux dispatch function. This promise will resolve when the action is accepted by the chain.

Further Reading
 - [chainDispatch](../reference/interbit-middleware/chainDispatch.md)
 - [Function Currying](https://hackernoon.com/currying-in-js-d9ddc64f162e)

## Conclusion

The template application utilizes the PPC model to authorize a chain to run in the browser and interact with the application chains. This model can be extended into many other architectures that use a private user chain in the browser to interact with one or many chains in different contexts.

This application also leverages the interbit middleware to sync the blockchain with the redux store, so the UI developer doesn't have to interact directly with the chain, but instead can use the redux store.

Further Reading
 - [interbit-middleware](../reference/interbit-middleware/README.md)
 - [actions](../key-concepts/README.md#actions)
 - [Interbit Manifest File](../reference/interbit-cli/manifest.md)
 - [build](../reference/interbit-cli/build.md)
 - [deploy](../reference/interbit-cli/deploy.md)

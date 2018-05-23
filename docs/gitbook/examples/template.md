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
    - What each one does
    - How to Modify Covenants
    - How to give a browser permission on the control chain
  - [The Application](./template.md#the-application)
    - index.js
    - How to load another chain in the browser
    - How to dispatch an action to the UI

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

At the moment, the control chain only sets up information about sponsorship and shares it with the public chain.

The control covenant does not do much, but we can change that!

If we want some information to be added and shared by all users, we can authorize the browser's hypervisor to dispatch actions directly into the control chain when they make their sponsorship requests for the private chains.

This should ONLY be done if you not have any information you want to keep a secret. If you do have information to keep secret, the control chain can be setup to forward the browser keys to the public chain and the users can do public things there, instead.

### How to Modify Covenants

If we want the control chain to allow users to add shared data, we have to describe a new action for it.

Add a new action to actionTypes and actionCreators.

```js
const actionTypes = {
  MEOW: 'MEOW'
}

const actionCreators = {
  meow: (whoMeowed) => ({
    type: actionTypes.MEOW,
    payload: {
      whoMeowed
    }
  })
}
```

Of course, we need a place for these meows in initialState.

```js

const initialState = Immutable.from({
  cats: {},
  // ...
})
```

Now that we've defined an action, we need to handle it in the reducer.

```js
const reducer = (state = initialState, action) => {
  // ...
  switch (action.type) {
    case actionTypes.MEOW: {
      const { whoMeowed } = action.payload
      const numberOfMeows = state.cats[whoMeowed] || 0
      return nextState.setIn(['cats', whoMeowed], numberOfMeows + 1)
    }
    // ...
    default:
      return nextState
  }
}
```

Just to make sure this works, let's test it. Since we can't do anything to it from the browser, we need to know it works.

Let's add a test to `src/tests/interbit/controlCovenant.test.js`

```js
  it('counts meows', () => {
    const goodCat = 'Mr. Tibbs'
    const action = controlCovenant.actionCreators.meow(goodCat)
    const actualState = controlCovenant.reducer(
      controlCovenant.initialState,
      action
    )

    assert.equal(actualState.cats[goodCat], 1)
  })
```

But it's not very useful unless we can do something with it from our UI.

Further Reading
 - [Covenants](../key-concepts/README.md)

### How to Add a Browser Key to the ACL

AKA. How to give a browser permission to do things on the control chain, like MEOW. :cat:

To give the browser permission to dispatch MEOWs to the control chain, we will need to add its hypervisor public key to the control chain's ACL. ACL stands for access control list, which dictates who is allowed to do what on that chain.

We will somehow need to find the public key to add it to the ACL.

When the chain sponsorship request arrives at the control covenant's reducer, it contains the entire genesis block for the chain that is requesting sponsorship. This genesis block includes the public key for the browser hypervisor.

It also contains the control chain's public key, so we will have to filter that out.

Finally, we don't want to simply give all of these browsers root access, so we will need to define a role in the ACL for them.

We will handle the request for sponsorship in the reducer with a switch case on the sponsorship request:

```js
    case '@@interbit/SPONSOR_CHAIN_REQUEST': {
      const rootKeys =
        action.payload.genesisBlock.content.state.interbit.config.acl.roles.root
      const blockMaster = state.interbit.config.blockMaster

      const [privateChainPublicKey] = rootKeys.filter(
        key => key !== blockMaster
      )

      console.log(JSON.stringify(rootKeys))
      console.log(privateChainPublicKey)

      const addToAclAction = addToAcl({
        actionPermissions: {
          [actionTypes.MEOW]: 'coolcats'
        },
        roles: { coolcats: [privateChainPublicKey] }
      })

      return redispatch(nextState, addToAclAction)
    }
```

Let's make sure it doesn't break anything by adding another test to `src/tests/interbit/controlCovenant.test.js`.

For this unit test, I've mocked the parts of the genesis block that are required to find and add the pubkey as well as the interbit configuration state in the chain's application state.

```js
  it('adds role and pubkey to ACL on sponsor request', () => {
    const catPubKey = 'catPubKey'
    const controlPubKey = 'controlPubKey'
    const action = {
      type: '@@interbit/SPONSOR_CHAIN_REQUEST',
      payload: {
        genesisBlock: {
          content: {
            state: {
              interbit: {
                config: {
                  consuming: [],
                  acl: {
                    actionPermissions: {
                      '*': ['root']
                    },
                    roles: {
                      root: [catPubKey, controlPubKey]
                    }
                  },
                  blockMaster: controlPubKey
                }
              }
            }
          }
        }
      }
    }
    const state = controlCovenant.initialState.setIn(
      ['interbit', 'config', 'blockMaster'],
      controlPubKey
    )

    const actualState = controlCovenant.reducer(state, action)

    assert.deepEqual(actualState.sideEffects[0], {
      payload: {
        actionPermissions: { MEOW: 'coolcats' },
        roles: { coolcats: ['catPubKey'] }
      },
      type: '@@interbit/ADD_TO_ACL'
    })
  })
```

This test checks to make sure our ACL action made it into interbit's side effects queue.

This test is not a great test as it assumes a lot of underlying state, but hopefully it will show more of what is happening when a redispatch occurs as well as what the ACL for a sponsored chain needs to look like to be hosted.

This is fine and dandy, but we will need to load the chain in the browser to interact with it. We will cover the React application next.

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

### How to Load a Chain in the Browser

You may have noticed that chain IDs and peers have not been specified in the middleware. This is because the are written in the index.html file automagically by the `interbit-cli` start script based on `apps` configuration.

In order to load the control chain in the browser so we can use it, we will need to include it in the `apps` portion of the Interbit config file.

```js
  apps: {
    template: {
      chains: [chainAliases.PUBLIC, chainAliases.CONTROL],
      // ...
    }
  }
```

The next time `interbit:start` is run, index.html will be updated with the chain ID for the control chain. This will cause the middleware to load it in the browser hypervisor and connect it to the redux store.

Further Reading
 - [Apps Config](../reference/interbit-cli/config.md#apps)

### How to Dispatch an Action to the UI

So, how do we dispatch to the chain now that it's loaded in the UI?

The container that does the most interacting with the selected chain is called `InteractiveChains`. It uses an adapter to populate a form to dispatch actions to the selected chain. It also displays the state of the selected chain.

First thing, let's attach the control chain to the UI and forget about the private chain for now. We will need to select it and adapt the form to its actions.

Back in the `index.js` file, set the selected chain to the control chain by dispatching a `SET_SELECTED_CHAIN` action to the redux store.

```jsx
// Import the alias of the control chain, too
import { PUBLIC, PRIVATE, CONTROL } from './constants/chainAliases'

// ...

// We keep the interbit middleware configuration the same.
// The public chain is still supplying the sponsorship data and the private chain is still the sponsored chain
const interbitMiddleware = createInterbitMiddleware({
  publicChainAlias: PUBLIC,
  privateChainAlias: PRIVATE
})

// ...

// BlockExplorer will monitor the control chain now...
store.dispatch(setSelectedChain(CONTROL))
```

This will connect the control chain to the UI.

Unfortunately, it is still using the form for the private chain. We can fix this by writing a controlChainAdapter and attaching it to the UI.

`src/adapters/controlChainAdapter.js`
```js
const covenant = require('../interbit/control')

const covenantName = 'Interbit Template Control Chain'

const meowActionLabel = 'Meow at the Moon'
const textParamLabel = 'Who even meowed?'

const actionCreators = {
  meow: () => ({
    type: meowActionLabel,
    arguments: {
      [textParamLabel]: ''
    },
    invoke: ({ [textParamLabel]: whoMeowed }) =>
      covenant.actionCreators.meow(whoMeowed)
  })
}

module.exports = {
  covenantName,
  actionCreators
}
```

To use the adapter inside of `InteractiveChains` you can simply update the import of the actionCreators inside of the `InteractiveChains` container.

Inside of `src/containers/InteractiveChains.js`

```js
// ...
import { actionCreators } from '../adapters/controlChainAdapter'

// ...
```

<div class="tips warning">
  <p><span></span>Incomplete Content</p>
  <p>TODO: Add a screenshot of what the UI should look like...</p>
</div>

And that's it! Now all of the folks in the neighbourhood watch can track who's meowing at the moon late at night and inform their owners of unruly behaviour.

Updating the `interbit.prod.config.js` file has been left as an exercise for the reader. Once updated, you can try the `interbit:build` and `interbit:deploy` commands.

Further Reading
 - [interbit-middleware](../reference/interbit-middleware/README.md)
 - [actions](../key-concepts/README.md#actions)
 - [Interbit Manifest File](../reference/interbit-cli/manifest.md)
 - [build](../reference/interbit-cli/build.md)
 - [deploy](../reference/interbit-cli/deploy.md)

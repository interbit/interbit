# To-do List Example Application

In the `packages/app-todo-list` directory, we provide a simple To-do List application running on an Interbit blockchain. The application can add items to the to-do list, edit existing items, and toggle the completed state of items.

This application was created using the Interbit [Template app](./template), and what follows is a description of the app and how to recreate it from the Template. The To-do List uses the same Interbit configuration as the Template. As such, to-do items are added to the user's private chain.

#### Requirements

* <a href="https://nodejs.org" target="_blank">Node.js</a> 8.6 or higher
* <a href="https://nodejs.org" target="_blank">NPM</a> 5.8 or higher

## Run the Application

To get started, run the following commands in your console from the `interbit` repo's root:

```bash
npm install
npm run build:modules
cd packages/app-todo-list
npm run interbit:start
```

The `interbit:start` command fires up an Interbit node which runs the blockchain. The chain statuses and blocking actions are printed in the console, and the message 'Updating index.html with chain data' indicates that the blockchain node is ready. Leave this process running.

In another console run:
```bash
cd packages/app-todo-list
npm start
```

The `start` command runs the React application which has a UI to interact with the blockchain. Open your browser to `localhost:3055` to view the To-do List app. There are 3 pages in the application, which are accessible from the main navigation menu.

The To-do List page shows a friendly UI with a form to add items and a table displaying them. The table is initially empty, but once an item is added you can mark it as completed and edit the item's title and description.

The Private Chain page displays the private chain's state and also provides a UI for adding and editing to-do items. Try adding a to-do item on this page and you will see the item added to the `todos` array on the left.

The Block Explorer page is an interactive tool for viewing the private chain's blocks, the chain state, actions that were dispatched to the chain, and block metadata.

You can optionally run
```bash
cd packages/app-todo-list
npm test
```
in another console to run a test watcher. The To-do List app comes with all the tests from the Template app and tests for the to-do list private chain actions.


## Application Structure

If you look in the `packages/app-todo-list` directory, you will see a basic application built on Interbit. Refer to the [Template docs](./template.md#application-structure) for detailed information on these directories and files. This document only covers the changes we made to the Template files to build our To-do List app. Specifically, we take a closer look at the private chain actions in `src/interbit/private`, the tests in `src/tests/privateCovenant.test.js`, `src/adapters/privateChainAdapter.js`, and the React components in `src/components`.

Directory | Purpose
----------|-----------
`public`                  | Website's public directory
`src`                     | Source code for the app
`src/adapters`            | A set of adapters to fill UI details for the covenant forms
`src/components`          | React components
`src/constants`           | A file of constants that are used throughout the application (Ex. URLs)
`src/containers`          | React components that are connected to Redux state
`src/css`                 | The css
`src/interbit`            | All of the covenants needed for this application
`src/redux`               | Reducers and any other Redux related files
`tests`                   | Jest tests
`App.js`                  | The main React component that loads the SPA
`exports.js`              | A file to export anything that may be needed outside of this project (Ex. covenant action creators)
`index.js`                | The file that creates the Redux store, attaches the [Interbit middleware](../reference/interbit-middleware/README.md), and runs the SPA
`registerServiceWorker.js` | A file used by create-react-app to register a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/)
`interbit.config.js`      | The [Interbit configuration file](../reference/interbit-cli/config.md)
`interbit.prod.config.js` | The production environment interbit configuration file
`keyPair.js`              | A file to import a public private key pair from environment variables when in production
`static.json`             | Used to serve a single page application (SPA) in Heroku. This describes where to fallback if routes are not matched (Returning 404)


## Walk-through

In this section, we step through the code that is specific to the To-do List app. This app is a modified clone of the Template app, so we highlight any changes that were made to the Template files and any new files we've added.

### Set Up and Configuration

We named our app `app-todo-list` and updated our public and private covenant names correspondingly. See:

- `package.json`
- `interbit.config.js`
- `interbit.prod.config.js`

The public, private, and control chain configurations are exactly as they are in the Template app&mdash;all we've done is rename things here. The Template app is configured so that users can dispatch actions to their private chain, so our To-do List app does the same. Users have their own private to-do lists. In the future, we may extend this example so that users can have shared lists.

### Modifying the Private Covenant

Our To-do List app allows users to add items, edit items, and mark items as complete in their to-do list. These actions are described in the app's private covenant in `src/interbit/private`. We've removed the actions included in the Template app and added the `ADD_TODO`, `EDIT_TODO`, and `TOGGLE_TODO` actions.

Actions are dispatched to the chain during operation, and are passed to
the [smart contract](/key-concepts/smart_contracts.adoc) to change the
[application state](/key-concepts/state.adoc). Interbit follows the
Redux design pattern, so actions in the Interbit covenants are
essentially the same as actions in Redux. All the same, we'll go through
each of the files in `src/interbit/private`.


<div class="filename">actionTypes.js</div>

This is a constants file that names each of our actions, a.k.a. our action types.

```js
const covenantName = 'app-todo-list-private'

const actionTypes = {
  ADD_TODO: `${covenantName}/ADD_TODO`,
  EDIT_TODO: `${covenantName}/EDIT_TODO`,
  TOGGLE_TODO: `${covenantName}/TOGGLE_TODO`
}

module.exports = actionTypes
```


<div class="filename">action.js</div>

We define the [action creators](../reference/interbit-middleware/actionCreators) here, each with an action type (e.g. `ADD_TODO`) and a payload.

```js
const actionTypes = require('./actionTypes')

const actionCreators = {
  addTodo: (title, description) => ({
    type: actionTypes.ADD_TODO,
    payload: {
      title,
      description
    }
  })
  // ...
}

module.exports = {
  actionTypes,
  actionCreators
}
```


<div class="filename">index.js</div>

This file defines the initial private chain state and the smart contract, which is implemented as a Redux reducer. The smart contract defines how each action changes the application's state. It accepts actions and a current state then generates a new state. In other words, the smart contract does "the stuff" in an application and contains most of the business logic. In our app, the `ADD_TODO` action adds an object such as `{id: 0, title: 'foo', description: 'bar', completed: false}` to the `todos` array in the private chain state.

Note that the state is immutable so we enforce this with the `seamless-immutable` library.


```js
const Immutable = require('seamless-immutable')

const {
  cAuthConsumerCovenant,
  mergeCovenants
} = require('interbit-covenant-tools')

const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: { name: `To-do list application - User's private chain` },
  todos: []
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  console.log('REDUCING: ', action)

  switch (action.type) {
    case actionTypes.ADD_TODO: {
      const { title, description } = action.payload
      const todos = state.getIn(['todos'], Immutable.from([]))
      const id = todos.length
      const completed = false

      return title
        ? state.set(
            'todos',
            todos.concat({ id, title, description, completed })
          )
        : state
    }
    // ...
    default:
      return state
  }
}

const covenant = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}

module.exports = mergeCovenants([covenant, cAuthConsumerCovenant])
```


### Tests for the Private Covenant

Jest tests for private and control covenants are located in `src/tests/interbit`. We've updated `privateCovenant.test.js` with tests for the To-do List actions which have a watcher. Run `npm test` from the `app-todo-list` directory to view the results of the tests as you make changes to the code.


### The Private Chain Adapter and the Private Chain Page

As described above, the Private Chain page displays the private chain's state and has some rudimentary UI for adding and editing to-do items. This is a handy development tool to interact with the private chain and verify that the application state is updating correctly. We use the `<Covenant />` component from the `interbit-ui-components` package to easily connect UI forms to the covenant actions.

The Template app comes with the scaffolding to connect the private covenant actions to the `<Covenant />` component. We modified `src/adapters/privateChainAdapter.js` so that we can dispatch the `ADD_TODO` and `EDIT_TODO` actions from the Private Chains page.

<div class="filename">src/adapters/privateChainAdapter.js</div>

```js
const covenant = require('../interbit/private')

const covenantName = 'Interbit To-do List Private Chain'

const addTodoActionLabel = 'Add a to-do item'
const addTodoTitleLabel = 'Enter a title *'
const addTodoDescriptionLabel = 'Enter a description'

const editTodoActionLabel = 'Edit a to-do item'
const editTodoIdLabel = 'Enter the ID of the to-do to edit'
const editTodoTitleLabel = 'Enter a new title *'
const editTodoDescriptionLabel = 'Enter a new description'

const actionCreators = {
  addTodo: () => ({
    type: addTodoActionLabel,
    arguments: {
      [addTodoTitleLabel]: '',
      [addTodoDescriptionLabel]: ''
    },
    invoke: ({
      [addTodoTitleLabel]: title,
      [addTodoDescriptionLabel]: description
    }) => covenant.actionCreators.addTodo(title, description)
  }),
  editTodo: () => ({
    type: editTodoActionLabel,
    arguments: {
      [editTodoIdLabel]: '',
      [editTodoTitleLabel]: '',
      [editTodoDescriptionLabel]: ''
    },
    invoke: ({
      [editTodoIdLabel]: id,
      [editTodoTitleLabel]: title,
      [editTodoDescriptionLabel]: description
    }) => covenant.actionCreators.editTodo(id, title, description)
  })
}

module.exports = {
  covenantName,
  actionCreators
}
```

## Further Work

The to-do list app could still use some work. At the moment, there is no error checking, and the smart contract will accept any action with an appropriate type just fine, whether you supplied meaningful data or not. This is a very basic example of what Interbit can do. If you want to forge ahead, and write your own Interbit application, you can go ahead and do that now, or if you are not sure what you want to try next, you can try adding another action and case statement to this To-do List application.


## To Do List

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>This example needs a shiny new UI</p>
</div>


In the `InterbitSDK/examples/to-do-list` directory, we have provided a simple To Do List application running on an Interbit blockchain. The application can add items that need to be done to the list, however those items cannot be toggled.

The following is a brief description of the example To Do application as it currently exists, followed by a tutorial on how to add functionality to toggle To Do items.

#### Requirements

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Versions need updating.</p>
</div>

* <a href="https://nodejs.org" target="_blank">Node.js</a> 7.10 or higher
* npm 4.2.0
* mocha

### Run the Application

To get started, run the following commands in your console:

```bash
$ cd /InterbitSDK/examples/to-do-list/
$ npm install
$ npm test
$ npm start
```

The `npm test` command runs a Mocha test suite designed to ensure the Smart Contract works correctly. The `npm start` command fires up an Interbit blockchain and makes it work, printing actions and the resulting state to the console.


<div class="tips warning">
  <p><span></span>Help: Localhost instance is asking for a username and password</p>
  <p><strong>Problem:</strong> After running <code>npm install</code>, the console printed that the app was serving on localhost, so I went there and was asked for a username and password.</p>
  <p><strong>Solution:</strong> It sounds like you ran <code>npm install</code> from the SDK root directory. Before you run an example, make sure that have switched into the example's root directory.</p>
</div>


### Example

Some key concepts used in this example are:
* [Actions](../key-concepts/README.md#action)
* [Application State (or State)](../key-concepts/README.md#application-state)
* [Blockchain](../GLOSSARY.md#blockchain)
* [Smart Contracts](../key-concepts/README.md#smart-contracts)
* [Strobe](../GLOSSARY.md#strobe)

If you look in the `examples/to-do-list` directory, you will see a basic application built on Interbit. Along with a few files, there are three subdirectories: build, src, and tests.

Directory/File | Purpose
-------------- | -------
build          | compiled ES6 files
src            | source code that will run on the Interbit blockchain
tests          | Mocha test suite to make sure the Smart Contracts work correctly
.babelrc       | configuration for ES6 compiler
index.js       | app entry point - the run script that starts a blockchain with the code in `src`
package.json   | NPM configuration file

In this example, we are only going to examine `src`, `tests`, and `index.js`. In the `src` directory, we will pay special
attention to `actions.js` and `smartContracts.js`. There is also a `src/keys.js` file, which contains the private and public keys for initializing the chain. That file is not relevant for this tutorial since it does not play a key role in the application's functionality.


This To Do List example is setup as an interactive tutorial. If you want to skip ahead to the interactive part of the tutorial, [go ahead](to-do-list.md#adding-toggle-functionality).

In this example,
1. we will step through the components of the example as it is now, and address what each component does, and how each works.
  1. [Actions](to-do-list.md#actions)
  1. [Smart Contract](to-do-list.md#smart-contract)
  1. [Testing](to-do-list.md#testing)
  1. [Script](to-do-list.md#script)
1. we will add new code to each of the sections covered in order to add toggling functionality to the To Do List.
  1. [Adding an Action](to-do-list.md#adding-a-new-action)
  1. [Handling the Action](to-do-list.md#handling-the-action-in-the-smart-contract)
  1. [Testing the Action](to-do-list.md#testing-the-action)
  1. [Dispatching the Action](to-do-list.md#dispatching-the-action-to-the-chain)



#### Actions

Actions serve two purposes:
* They are dispatched to the chain during operation, and passed to the Smart Contracts to change the Application State.
* They are passed to the chain on initialization to inform it of which operations are valid.

To ensure that we always have a consistent Action format, we describe our Action types and use a set of functions to generate our Actions with a consistent format. This file is called `actions.js` by convention, and is located in `/src/actions.js` in this example.

Once the Action types are defined and passed to the chain on initialization, you can dispatch them to the chain, which then passes them through the Smart Contracts with the current state.

<div class="filename">src/actions.js</div>

```js
let actions = {
  ADD_ITEM: 'ADD_ITEM',
  addItem: (id, label, description) => {
    return {
      type: actions.ADD_ITEM,
      payload: {
        id,
        label,
        description
      }
    }
  },
  // ...
}
```

<div class="tips info">
  <p><span></span>The <code>ADD_ITEM</code> Action Type and Creator</p>
  <p>In the snippet above, an Action type and creator function for that item are shown. The creator function accepts parameters we need to process this Action, so that when we make an Action anywhere in our application or tests, we know we are always supplying the Smart Contract with the required payload.</p>
</div>

#### Smart Contract

The Smart Contract has several responsibilities. These include:
* accepting Actions and a current state to generate a new state
* defining the state changes to occur for each Action type

In our example, we have defined an Action to add an item that is handled by our Smart Contract. When the Smart Contract receives an `ADD_ITEM` Action, it updates the state to include the item described by the Action. The results of this operation are deterministic. If the same inputs are passed to the Smart Contract, it will repeat its output exactly.

<div class="filename">src/smartContracts.js</div>

```js
// ...
(itemsState = Immutable.from(initialState.items), action) => {
  switch (action.type) {
    case actions.ADD_ITEM:
      action.payload.isDone = false
      itemsState = itemsState.concat(action.payload)
      break

    // ...

    default:
      break
  }
  return itemsState
}
// ...
```

<div class="tips info">
  <p><span></span>Snippet of Smart Contract to Add a New To Do Item</p>
  <p>Above, you can see the part of the Smart Contract that updates the state based on the Action type that was just received. In this case, the <code>ADD_ITEM</code> Action contains the To Do item that is being added in the payload. We are ensuring that the item is not marked done, and then adding that item to the state.</p>
  <p>Because the state is immutable, we are are enforcing this in our Smart Contract with the <code>seamless-immutable</code> library. The Action, however, is mutable, and you can see in the snippet that we are setting done to false before including the payload in the state.</p>
</div>

#### Testing

This example demonstrates two types of testing:  integration testing and unit testing.
* The integration tests use the reduce function to simulate the process of the chain passing the previous state and the series of Actions into the Smart Contract, and asserts on the resulting state.
* The unit tests supply one mocked Action at a time to the Smart Contract, and asserts specific results on output state to ensure each Action does not produce extraneous edge cases in our integration tests.

Although other systems are not integrated into the integration tests, the integration tests are named as such because the other systems integrate with the Smart Contracts and chain by dispatching Actions. This means that calling the reduce function as such is essentially mocking the integration of other parts of the system.

The delineation between these two types of tests is not obvious in an example as simple as the one above. However, we hope it inspires you to use these types of tests on your own in more interesting circumstances.

#### index.js

The simple script in our example moves through a series of tasks to set up an application chain and send Actions to it, each time printing the resulting state to the console.  The series of tasks is as follows:

1. It ties Actions, Smart Contracts, and the application chain together.
1. It creates a chain based on the Actions and Smart Contract.
1. It creates a [genesis block](../GLOSSARY.html#genesis-block).
1. It animates the chain. An animated blockchain is one which has a running strobe, is connecting to other available nodes, and is creating blocks.
1. It subscribes to the chain with a callback that will be called when the chain state changes.
1. It dispatches an Action every few seconds to the chain to initiate state changes.
1. When the chain updates its To Do List item state, it logs the resulting state to the console.

While the script is running, it prints output to the console from the subscribed function. Every time the To Do List updates, it prints the list, and every time an Action is handled by the chain, it prints the Action so that you can see how the Actions affect the chain as they are processed.

<div class="filename">index.js</div>

```js
//...
  animatedChain.subscribe(() => {
    const appState = animatedChain.getState()

    if (previousItems !== appState.items) {
      console.log('\r\nCurrent To Do list:')
      appState.items.forEach((item, index) => {
        const isDoneLabel = item.isDone ? 'Done' : '    '
        console.log(' ' + isDoneLabel + ' | ' + item.label + ': ' + item.description)
      })
      console.log('\r\n')

      previousItems = appState.items
    }
  })
//...
```

<div class="tips info">
  <p><span></span>The Chain Subscription</p>
  <p>The subscribe function takes a callback that is called when the Application State changes. This is a very simple example of a subscription that checks to see if a specific portion of the state has updated, and then prints the state if it has changed. The subscribe function is very useful, enabling asynchronous requests based on certain state conditions, the dispatch of the results back to the chain, or the displaying of data to the user.</p>
</div>

There are several Actions that belong to Interbit, including an init Action and the strobe that fires periodically. Because the Smart Contracts do not define app state changes for these Actions, they do not affect the To Do List. They do trigger the subscription function though, which is why we check that the portion of the state that we are interested in has changed before printing it.

### Tutorial: Adding Toggle Functionality

After covering the parts of the application, we can now add greater functionality. To mark items as done, we need to find out what a To Do item looks like in the state. Below is a sample piece of item data used as a mock in the unit tests.

<div class="filename">tests/unit.Test.js</div>

```js
// Sample of what a To Do Item looks like in Application State
const itemData = {
  id: 1,
  label: 'Add toggle to the todo list example',
  description: 'A todo list is not terribly useful if you can\'t mark items done. Implement the toggle feature',
  isDone: false
}
```

<div class="tips info">
  <p><span></span>Did you notice the <code>isDone</code> property?</p>
  <p>The <code>isDone</code> property looks like a good option for a toggle feature.</p>
</div>

You can use the following test for quick feedback on whether the toggle feature is changing the isDone property.

<div class="filename">tests/integration.Test.js</div>

```js
  it('toggles items back and forth several times, twice, and once', function () {
    const actionsToTake = [].concat(addItemActions[0], toggleItemAction, toggleItemAction, toggleItemAction)
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)

    should.equal(true, result[0].isDone)

    const moreActionsTaken = [].concat(toggleItemAction, toggleItemAction)
    const secondResult = moreActionsTaken.reduce(smartContracts.items, result)

    should.equal(true, secondResult[0].isDone)

    const evenMoreActions = [].concat(toggleItemAction)
    const thirdResult = evenMoreActions.reduce(smartContracts.items, secondResult)

    should.equal(false, thirdResult[0].isDone)
  })
```

<div class="tips info">
  <p><span></span>Failing Tests</p>
  <p>The new test will currently fail. Copy &amp; paste the snippet into <code>tests/integration.Test.js</code> to get started!</p>
</div>

#### Adding a New Action

All Action information is stored in `/src/actions.js`, so this file needs to be updated with information relevant to our new Action.

First, define a new Action type so that it can be dispatched to the chain. To ensure you can mark and unmark an item as done, define a `TOGGLE_ITEM` Action type in the exported Actions object.

An Action creator is needed to define an Action to dispatch in an app or in tests. Supply the item id of the item to be toggled. The only relevant data in the Action payload to toggle an item is which item is to be toggled.

<div class="filename">src/actions.js</div>

```js
TOGGLE_ITEM: 'TOGGLE_ITEM',
toggleItem: (id) => {
  return {
    type: actions.TOGGLE_ITEM,
    payload: {
      id
    }
  }
}
```

<div class="tips info">
  <p><span></span>The Action Type and Creator</p>
  <p>We have defined a type and creator function above, which you can copy &amp; paste into <code>/src/actions.js</code>. To use it in your tests, go to <code>tests/unit.Test.js</code> and <code>tests/integration.Test.js</code>, and uncomment the calls to the toggle creators before the test suites</p>
</div>

#### Handling the Action in the Smart Contract

An Action is of no use unless you define how it affects the state. Define this behavior in the Smart Contract. In this case, it is located in `/src/smartContracts.js`. In this file, there is a switch statement managing Action types (with one lonely Action being handled). Handle the `TOGGLE_TODO` Action here.

It is important to use an immutable data structure to manage the state. Make sure you only use the data passed into the Smart Contract to influence the Smart Contract's output. In this case, we have already included the `seamless-immutable` library. You should try to use it or another immutable data library to make sure you do not change the state object passed into the Smart Contract every time you write one.

Using an immutable object structure, and containing state in Smart Contract parameters instead of objects, is an easy way to keep the Smart Contract deterministic.


<div class="filename">src/smartContracts.js</div>

```js
      case actions.TOGGLE_ITEM:
        const itemIndex = itemsState.findIndex(item => item.id === action.payload.id)
        if (itemIndex !== -1) {
          const isDone = !itemsState[itemIndex].isDone
          itemsState = itemsState.setIn([itemIndex, 'isDone'], isDone)
        }
        break
```

<div class="tips info">
  <p><span></span>The Case for <code>TOGGLE_TODO</code> in the Smart Contract</p>
  <p>We have written a simple switch case for the <code>TOGGLE_TODO</code> Action above. It finds the index of the To Do item with the correct ID, then returns a new object with the item's <code>isDone</code> property toggled.</p>
  <p>Copy &amp; paste this switch case into the switch statement in <code>/src/smartContracts.js</code>.</p>
</div>

#### Testing the Action

Now the provided tests should pass! Run them and see.

```bash
$ npm test
```

Look at `tests/unit.Test.js`. It only tests that an item was added on  `ADD_ITEM`. It also has an empty test for `TOGGLE_ITEM` that is currently being skipped.

Clearly, an unwritten test is not a suitable unit test. We will add one to the suite, and run the tests again. The unit test should set up by adding an item to the initial state that has not been done, and by creating a `TOGGLE_ITEM` Action with that item's ID. The test will act by passing the state and Action that were made during setup to the items Smart Contract. Finally, it will assert that the only item in the returned state is the initial item, and that it has been marked done.


<div class="filename">tests/unit.Test.js</div>

```js
  it('toggles the isDone property of an item on TOGGLE_ITEM action', function () {
    const toggleItemAction = actions.toggleItem(itemData.id)
    const state = initialState.setIn(['items', 0], itemData)

    const itemsState = smartContracts.items(state.items, toggleItemAction)

    should.equal(1, itemsState.length)
    should.equal(itemData.id, itemsState[0].id)
    should.equal(itemData.label, itemsState[0].label)
    should.equal(itemData.description, itemsState[0].description)
    should.equal(true, itemsState[0].isDone)
  })
```

<div class="tips info">
  <p><span></span>A Unit Test for Item Toggling</p>
  <p>This snippet is a unit test for item toggling, and can be copy &amp; pasted into the unit test suite to replace the empty test in  <code>/tests/unit.Test.js</code>.</p>
</div>

#### Dispatching the Action to the Chain

Now, we want to see this Action working on the Interbit blockchain. To do so, add the Action to the array that Interbit runs through in the   `index.js` script with the other Actions being dispatched.

We will make two toggle items, and add them to our `actionsToTake` array near the bottom of the script.


<div class="filename">index.js</div>

```js
  const toggleItem2 = actions.toggleItem(2)
  const toggleItem3 = actions.toggleItem(3)

  const actionsToTake = [].concat(addAction1, addAction2, addAction3, toggleItem2, toggleItem3)
```

<div class="tips info">
  <p><span></span>Adding Some Toggle Actions</p>
  <p>In this snippet, we have created items to toggle by the ID of the listed items. In this case, we are going to toggle Renew passport and Plan vacation. Maybe the vacation was planned while waiting in line at the passport office.</p>
  <p>Move this code into the example, and run the app with <code>npm start</code>. It should dispatch our new Action to the Smart Contract and update the state as intended.</p>
</div>

Finally, we will run the application again to see our toggling in action.

```bash
$ npm start
```

### Putting it All Together

This example has gone through the primary components of an Interbit application: the Actions, the Smart Contracts, the run script, and the tests. Hopefully, it is all starting to make more sense, and you have the basic tools you need to begin making your own Interbit  applications.

If you have also added the toggle To Do functionality, then congratulations! You have just written your first Interbit Smart Contract, added it to the blockchain, and made it run by dispatching an Action. This is the basis of all Interbit application development -using the Smart Contract logic to process Action data to move the application state forward.


<div class="tips success">
  <p><span></span>The Solution</p>
  <p>There is a copy of a possible solution for toggling and editing the To Do items in <code>InterbitSDK/examples/example-solutions/to-do-list</code>.</p>
</div>

### Further Work

The list could still use some work. At the moment, there is no error checking, and the Smart Contract will accept any Action with an appropriate type just fine, whether you supplied meaningful data or not. This is a very basic example of what Interbit can do. If you want to forge ahead, and write your own Interbit application, you can go ahead and do that now, or, if you are not sure what you want to try next, you can try adding another Action and case statement to this To Do application.

If you wish to add another Action, below are a couple of integration tests to include in your `tests/integration.Test.js` suite. These will get you started on adding an EDIT_ITEM Action to the To Do List example. There are a few To Do items in the `index.js` file that could use a description. Remember that state is immutable when editing the To Do item.


<div class="filename">tests/integration.Test.js</div>

```js
  const editItemActions = [1, 2, 3, 4, 5].map(id => {
    return actions.editItem(id, 'item' + id, 'Do something else', false)
  })

  it('edits items it has just added to the list', function () {
    const actionsToTake = [].concat(addItemActions, editItemActions)
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)

    should.equal('Do something else', result[0].description)
    should.equal('Do something else', result[1].description)
    should.equal('Do something else', result[2].description)
    should.equal('Do something else', result[3].description)
    should.equal('Do something else', result[4].description)
  })

  it('adds, edits, and toggles an item', function () {
    const actionsToTake = [].concat(addItemActions[0], editItemActions[0], toggleItemAction)
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)
    const item = result[0]

    should.equal(1, item.id)
    should.equal('item1', item.label)
    should.equal('Do something else', item.description)
    should.equal(true, item.isDone)
  })
```

<div class="tips info">
  <p><span></span>More Tests!</p>
  <p>Copy &amp; paste these into <code>tests/integration.Test.js</code> to get started on adding an <code>EDIT_ITEM</code> action to the To Do List example.</p>
</div>

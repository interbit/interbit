# Introductory Project

This example project continues where [Getting Started](../getting-started/README.md) left off. Please refer to that page to start this example if you have not already.

After following the getting started guide your project directory should have the following structure:

Directory/File     | Purpose
-------------------| -------
node_modules/      | Installed npm packages
index.js           | Entry point to your application
package.json       | Configuration file for the Node.js project

## Tutorial

In order to make a basic Interbit application (or a complex one), there are several basic steps you must follow.

1. You must add a start script to package.json.
1. You must generate a set of keys.
1. You must set up configuration values for the blockchain.
1. You must create a covenant consisting of Smart Contracts, Actions, and initial Application State.
1. You must initialize the blockchain.

Finally, you can do something with the Application State like displaying it in a UI, or using it to drive business decisions.

### Running the Project

To run the project, you will need to add the start command to the scripts section in `package.json`.

<div class="filename">package.json</div>

```js
  "scripts": {
    "start": "node index.js",
    // ...
  }
```


This script will enable you to use npm to start your application. To run it, enter the following command in your terminal:

```bash
$ npm start
```

If you have used the index.js file from [Getting Started](../getting-started/README.md), this command logs the imported Interbit library to the console.

### Preparing Chain Configuration

To prepare to initialize your chain you must generate some PGP keys and setup a basic chain configuration object. To make things easier, we have supplied a key pair and basic configuration below.

<div class="filename">keys.js</div>

```js
const public = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v2.5.2
Comment: http://openpgpjs.org

xk0EWN0/BQEB/1R8H/WSzYR97uXnm7XpynjIlo6WK+qTuzQr3Gtb5Q6jV/HO
7Yl9BjCbpbA4OXdT/1CImJ53zvJBZAcNUrW9Wc8AEQEAAc0RQlRMIDxpbmZv
QGJ0bC5jbz7CdQQQAQgAKQUCWN0/BQYLCQcIAwIJEEq0xDiCCwdsBBUICgID
FgIBAhkBAhsDAh4BAAAO7AH9E9DuIPDCDGAmREffEDtbP4JOjzIl45VqoH5M
PThXGWNuYVb9Nn7GD8iCqBHRFhhhaXMVuDr7e68qd/I+CvKX0c5NBFjdPwUB
Af9soNyJh4Sv3zuh2kG0byjTtGMFwTZ+QmnEYtlm/q4F59J5gmlv52OTY+bH
a2HLGmzuTFxwr1jkSOA8CfYp85/nABEBAAHCXwQYAQgAEwUCWN0/BQkQSrTE
OIILB2wCGwwAAHHIAf9Ohcudsms6N9d6uGRXfLy/Ltu8uR37fmG242zjCLg4
fT2QuwcZCN8hKMUuD2kvbh502ov9Kdr8cE81Mxs+pkPC
=yjbz
-----END PGP PUBLIC KEY BLOCK-----`

const private = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: OpenPGP.js v2.5.2
Comment: http://openpgpjs.org

xcA4BFjdPwUBAf9UfB/1ks2Efe7l55u16cp4yJaOlivqk7s0K9xrW+UOo1fx
zu2JfQYwm6WwODl3U/9QiJied87yQWQHDVK1vVnPABEBAAEAAf4tLVbVtdPK
ZqEqNYixZTxNDE5eHvWK8caoZk/u5Ov+wELJQORB4gu7FHSqx6U3z1zUCEXU
Ryt3bZ9V3GHCxoehAQCVGqKCG/e6kMLUl8qHWob/V+Wc0wlwai93fSNDVXYk
PwEAkQ3NRuetnwm+n48o8wy37Yuf/zO3PqfpUVt6qcdKJnEA/jB+dw2dwfyN
ckQxDo5Yk/ewgCmvTarHLebslkR0BOlSVCjNEUJUTCA8aW5mb0BidGwuY28+
wnUEEAEIACkFAljdPwUGCwkHCAMCCRBKtMQ4ggsHbAQVCAoCAxYCAQIZAQIb
AwIeAQAADuwB/RPQ7iDwwgxgJkRH3xA7Wz+CTo8yJeOVaqB+TD04VxljbmFW
/TZ+xg/IgqgR0RYYYWlzFbg6+3uvKnfyPgryl9HHwDgEWN0/BQEB/2yg3ImH
hK/fO6HaQbRvKNO0YwXBNn5CacRi2Wb+rgXn0nmCaW/nY5Nj5sdrYcsabO5M
XHCvWORI4DwJ9inzn+cAEQEAAQAB+gKu+qO/IE0D88Is1SCy+kw4kZWrzz/R
PjGmy34a3ouwxPVJLGSiWLRMgfRMWwMFvQeNJJXMN4AxIscfuf23oSkBANB4
sGFjsLXXy5l30dlGEbdodaF1mA3RKiLwDBDAigKzAQCFZOQbr2/dirOd++dw
RGbInBtVecc8dnp0hP6CrFu3/QD+K1u7hevd8Ax5SO91iHbdwbQ2BpfWSenq
RJXU4XFwJhBVS8JfBBgBCAATBQJY3T8FCRBKtMQ4ggsHbAIbDAAAccgB/06F
y52yazo313q4ZFd8vL8u27y5Hft+YbbjbOMIuDh9PZC7BxkI3yEoxS4PaS9u
HnTai/0p2vxwTzUzGz6mQ8I=
=7Bd2
-----END PGP PRIVATE KEY BLOCK-----`

module.exports = {
  public,
  private
}
```

<div class="tips info">
  <p><span></span>PGP Keys</p>
  <p>This release of Interbit supports OpenPGP.js v2.5.2 keys. You can copy &amp; paste the entire snippet above into a file called keys.js for any test and prototype projects you make on the Alpha release, but we recommend generating your own key pair for other uses.</p>
</div>


In addition to the keys, we've included the most basic chain configuration Interbit will accept to run a chain. At minimum it must contain a chain name, description, network configuration, and consensus configuration. The consensus configuration must include a list of all public keys that are allowed to participate in the chain with the property name validators.

<div class="filename">index.js</div>

```js
const chainConfig = {
  name: 'intro-project',
  description: 'Introductory project for developing in Interbit',
  network: {},
  consensus: {
    type: 'PoW|Federated|PoC',
    validators: [keys.public]
  }
}
```

<div class="tips info">
  <p><span></span>Chain Configuration</p>
  <p>Copy &amp; paste this snippet into index.js to use to initialize an Interbit blockchain.</p>
</div>

### Making a Covenant

A convenant consists of a Smart Contract, Actions, and an Initial State. The Smart Contract reacts according to the Actions that are dispatched to the blockchain to update the Application State. The Initial State is the first application state that the blockchain ever has.

We have included a very basic covenant below that simply adds numbers and stores the sum in the blockchain state.

<div class="filename">index.js</div>

```js
const initialState = { sum: 0 }

const actions = {
  ADD: 'ADD',
  add: (number) => {
    return {
      type: actions.ADD,
      payload: { number }
    }
  }
}

const smartContract = {
  sum: (state = initialState.sum, action) => {
    console.log(action)
    if (action.type === actions.ADD) {
      return state + action.payload.number
    }
    return state
  }
}
```

<div class="tips info">
  <p><span></span>Covenants</p>
  <p>The snippet above is a basic covenant. It contains one Action to dispatch to the blockchain: <code>ADD</code>. When the action is dispatched to the blockchain it is received by the defined Smart Contract which receives the current Application State and the action. It adds the number with the current sum in state and returns the updated Application State to be stored on the blockchain. The Initial State provides the first values to use for the blockchain, before any Actions are dispatched and any blocks are formed. Copy &amp; paste this snippet into index.js.</p>
</div>

### Initializing and Using the Blockchain

Intitializing the blockchain is a simple matter of following the API reference steps and then using the chain in your application. Below we've included some code to initialize a new blockchain with the covenant that we just created. Copy &amp; paste the following into your application.

<div class="filename">index.js</div>

```js
const crypto = Interbit.Crypto(keys.public, keys.private)
const baseChain = Interbit.initBaseChain({ initialState, actions, reducers: smartContract, chainConfig, crypto })
const chainId = Interbit.createGenesis(baseChain)
const chainPromise = Interbit.animateChain({ baseChain, crypto, isCreator: true, chainId })
```

Now that you have a chain promise, you can wait for it to resolve to your animated blockchain and then use it however you like. We've included an example below that subscribes to the chain and logs it on any change and dispatches an `ADD` action to make sure our Smart Contract updates. Copy &amp; paste it into `index.js` and now the whole app should work.

<div class="filename">index.js</div>

```js
chainPromise.then(animatedChain => {
  const applicationState = animatedChain.getState()
  console.log('Initial Application State:', applicationState)

  animatedChain.subscribe(() => {
    const updatedApplicationState = animatedChain.getState()
    console.log('Updated Application State:', updatedApplicationState)

    const blockchainState = animatedChain.getChainState()
    console.log('Updated Blockchain State:', blockchainState)
  })

  animatedChain.dispatch(actions.add(5))
})
```

## Conclusion

At this point, you will have created your first Interbit application. Although it is simple this application contains all of the building blocks necessary to create more complex applications. It initializes a new blockchain, accepts Actions, updates Application State using Smart Contracts, and fetches and logs data from the blockchain.

To continue learning about Interbit, please check out our other examples:

 * [Determinism](determinism.md)

 * [To-do List](to-do-list.md)

 * [Order Books](order-books.md)

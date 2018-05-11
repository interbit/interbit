# Joining Example

To join two chains together the corresponding Interbit join actions must be dispatched to each chain.

Send and receive action types correspond. Consume and provide action types correspond.

These actions can also be [redispatched](../reference/interbit-covenant-utils/redispatch.md) from within a smart contract.

There are two ways to join chains together. Statically when the node is started from the configuration file and dynamically by dispatching an action during chain operation.

When creating a join both sides must agree on the join name and both sides must dispatch a corresponding action.

## By Configuration File

Ultimately, the joins set up in the configuration file are dispatched by the admin keys to the chain during start and deployment.

Join configuration is set in each individual chain's config and both sides of the join must be properly configured. A join name will automatically be created for the join.

The friendly alias is used to set up the join in configuration and the chain specified by alias must be configured.

```js
const config = {
  // ...
  staticChains: {
    chainA: {
      config: {
        joins: {
          consume: [],
          provide: [],
          receiveActionFrom: [
            {
              alias: 'chainB',
              authorizedActions: ['DO_A_THING']
            }
          ],
          sendActionTo: []
        }
      },
      // ...
    },
    chainB: {
      config: {
        joins: {
          sendActionTo: [{ alias: 'chainA' }]
        }
      }
    }
  }
  // ...
}
```

## By Action Dispatch

When dynamically dispatching join actions to a chain you must be sure to match the join names. Chain IDs must be used as the friendly alias is only available in the configuration file and the middleware.

```js
const {
  coreCovenant: {
    actionCreators: {
      startConsumeState,
      startProvideState
    }
  }
} = require('interbit-covenant-tools')

const chainAChainID = '6cffd9f24329c49d3a5047aa187c805e20e39923a15d7f9c427bc659225c08d2'
const chainBChainID = '32b9365f325da189439f6d453593cf4e0a5a06ead7e6bbecc1d0814c578df452'

const chainAInterface = cli.loadChain(chainAChainID)
const chainBInterface = cli.loadChain(chainBChainID)

const consumeAction = startConsumeState({
  provider: chainAChainID,
  mount: ['state', 'to', 'share'],
  joinName: 'MeowMeowMeow'
})
chainBInterface.dispatch(consumeAction)


const provideAction = startProvideState({
  consumer: chainBChainID,
  statePath: ['chainA', 'state'],
  joinName: 'MeowMeowMeow' // The same join name - this must match
})
chainAInterface.dispatch(provideAction)
```

[Read more...](../key-concepts.md#chain-joining)

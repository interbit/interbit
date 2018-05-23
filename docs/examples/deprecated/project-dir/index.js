const Interbit = require('interbit-core-alpha')
const keys = require('./keys')

console.log(Interbit)

const chainConfig = {
  name: 'intro-project',
  description: 'Introductory project for developing in Interbit',
  network: {},
  consensus: {
    type: 'PoW|Federated|PoC',
    validators: [keys.public]
  }
}

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

const crypto = Interbit.Crypto(keys.public, keys.private)
const baseChain = Interbit.initBaseChain({ initialState, actions, reducers: smartContract, chainConfig, crypto })
const chainId = Interbit.createGenesis(baseChain)
const chainPromise = Interbit.animateChain({ baseChain, crypto, isCreator: true, chainId })

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

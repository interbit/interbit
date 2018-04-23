import * as Interbit from 'interbit-core-alpha'
import keys from './keys'
import actions from './actions'
import smartContract from './smartContract'
import initialState from './initialState'

export default function () {
  const chainConfig = {
    name: 'Trade Order Book',
    description: 'Allocation Processing Costs to Working Interest Partners',
    strobeInterval: 60000,
    actionBatchingDelay: 2000,
    consensus: {
      type: 'PoW|Federated|PoC',
      validators: [
        keys.public
      ],
      minQuorum: 2,
      changeConsensusQuorum: 3
    },
    network: {
      [keys.public]: '127.0.0.7:4000'
    }
  }

  const crypto = Interbit.Crypto(keys.public, keys.private)
  const baseChain = Interbit.initBaseChain({initialState, actions, reducers: smartContract, chainConfig, crypto})
  const chainId = Interbit.createGenesis(baseChain)
  const chainPromise = Interbit.animateChain({ baseChain, crypto, isCreator: true, chainId })

  return chainPromise
}

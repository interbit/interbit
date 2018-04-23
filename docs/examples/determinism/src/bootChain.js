// External dependencies
import * as Interbit from 'interbit-core-alpha'

// Internal dependencies
import keys from './keys'
import { initialState, actions, smartContracts } from './chain'


export default () => {
  // Chain config minimum details
  const chainConfig = {
    name: 'randomness',
    description: 'Sample Interbit application demonstrating non-determinism',
    network: {},
    consensus: {
      type: 'PoW|Federated|PoC',
      validators: [keys.random.public]
    }
  }

  const crypto = Interbit.Crypto(keys.random.public, keys.random.private)
  const baseChain = Interbit.initBaseChain({ initialState, actions, reducers: smartContracts, chainConfig, crypto })
  const chainId = Interbit.createGenesis(baseChain)
  const chainPromise = Interbit.animateChain({ baseChain, crypto, isCreator: true, chainId })

  return chainPromise
}
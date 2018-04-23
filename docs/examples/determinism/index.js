import bootChain from './src/bootChain'
import fetchRandom from './src/randomApi'
import { actions } from './src/chain'


// First, setup the blockchain
bootChain().then(chain => {

  // Option 1a: Insert random data via action
  const randomInt = Math.floor(Math.random() * 100)
  const randomAction = actions.random(randomInt)
  chain.dispatch(randomAction)

  // Option 1b: Find some truly random data and insert that via action also
  fetchRandom()
    .then(trulyRandomInt => {
      const trulyRandomAction = actions.random(trulyRandomInt)
      chain.dispatch(trulyRandomAction)
    })
    .catch(error => {
      console.log(error)
    })

  // Option 2: Use the PRNG in the smart contract to generate a number
  // ... Look in ./src/chain.js for details
  const pseudoRandomAction = actions.pseudoRandom()
  chain.dispatch(pseudoRandomAction)
})

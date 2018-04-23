import Immutable from 'seamless-immutable'
import seedrandom from 'seedrandom'

export const initialState = Immutable.from({
  random: {
    seed: 'meow',
    times: 0,
    number: -1 
  }
})

export const actions = {
  RANDOM: 'RANDOM',
  random: (number) => {
    return {
      type: actions.RANDOM,
      payload: { number }
    }
  },
  PSEUDO_RANDOM: 'PSEUDO_RANDOM',
  pseudoRandom: () => {
    return {
      type: actions.PSEUDO_RANDOM,
      payload: { }
    }
  }
}

export const smartContracts = {
  random: (state = initialState, action) => {

    // Option 1: Dispatch some random data to your smart contract
    if (action.type === actions.RANDOM) {
      return state.set('number', action.payload.number)
    }

    // Option 2: Use a seeded PRNG to make a deterministic "random" value
    if (action.type === actions.PSEUDO_RANDOM) {
      const seed = state.seed + state.times
      const prng = seedrandom(seed)
      const prNumber = Math.floor(prng() * 100)

      state = state.set('number', prNumber)
      state = state.set('times', state.times + 1)

      return state
    }
 
    return state
  }
}

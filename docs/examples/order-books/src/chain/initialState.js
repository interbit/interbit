import Immutable from 'seamless-immutable'
import keys from './keys'

export default Immutable.from({
  orderBook: {
    books: {
      cad: {
        usd: [],
        oil: []
      },
      usd: {
        cad: [],
        oil: []
      },
      oil: {
        usd: [],
        cad: []
      }
    },
    balances: {
      [keys.public]: {
        cad: 100,
        oil: 100
      }
    }
  }
})

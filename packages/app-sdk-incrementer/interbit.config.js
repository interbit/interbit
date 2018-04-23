const path = require('path')

const config = {
  peers: [],
  staticChains: {
    increment: {
      covenant: 'increment'
    }
  },
  covenants: {
    increment: {
      location: path.join(__dirname, 'src/interbit/increment')
    }
  },
  apps: {
    increment: {
      peers: [],
      chains: ['increment'],
      appChain: 'increment',
      indexLocation: path.join(__dirname, 'public/index.html'),
      buildLocation: path.join(__dirname, 'build/')
    }
  }
}

module.exports = config

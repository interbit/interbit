const path = require('path')

const config = {
  peers: [],
  adminValidators: [],
  staticChains: {
    appStore: {
      covenant: 'appStore'
    }
  },
  covenants: {
    appStore: {
      location: path.join(__dirname, 'src/interbit/app-store')
    }
  },
  apps: {
    appStore: {
      peers: [],
      chains: ['appStore'],
      appChain: 'appStore',
      indexLocation: path.join(__dirname, 'public/index.html'),
      buildLocation: path.join(__dirname, 'build/')
    }
  }
}

module.exports = config

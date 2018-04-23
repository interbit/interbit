const path = require('path')
const chainAliases = require('./src/constants/chainAliases')

const config = {
  // peers: ['localhost:5025'], // Running with INTERBIT_PORT set
  peers: [], // If you run projects on it's own: (https://github.com/BlockchainTechLtd/integration/issues/201)
  adminValidators: [],
  staticChains: {
    [chainAliases.MY_PROJECTS]: {
      defaultChain: true,
      covenant: 'app-project_my-projects'
    }
  },
  covenants: {
    'app-project_my-projects': {
      location: path.join(__dirname, 'src/interbit/my-projects')
    },
    'app-project_project': {
      location: path.join(__dirname, 'src/interbit/project')
    }
  },
  apps: {
    project: {
      peers: [],
      chains: [chainAliases.MY_PROJECTS],
      appChain: chainAliases.MY_PROJECTS,
      indexLocation: path.join(__dirname, 'public/index.html'),
      buildLocation: path.join(__dirname, 'build/')
    }
  }
}

module.exports = config

const _ = require('lodash')

const accountConfig = require('../app-account/interbit.prod.config')
const templateConfig = require('../template/interbit.prod.config')

const init = {
  peers: [],
  adminValidators: [],
  staticChains: {},
  covenants: {}
}

const config = [accountConfig, templateConfig].reduce(
  (prev, curr) => ({
    peers: prev.peers.concat(curr.peers),
    adminValidators: prev.adminValidators.concat(curr.adminValidators),
    staticChains: {
      ...prev.staticChains,
      ...curr.staticChains
    },
    covenants: {
      ...prev.covenants,
      ...curr.covenants
    },
    apps: {
      ...prev.apps,
      ...curr.apps
    }
  }),
  init
)

config.peers = _.uniq(config.peers)
console.log(config)

module.exports = config

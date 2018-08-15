const _ = require('lodash')

const accountConfig = require('../app-account/interbit.config')
const templateConfig = require('../interbit-template/interbit.config')

const init = {
  peers: [],
  adminValidators: [],
  staticChains: {},
  covenants: {}
}

const config = [accountConfig, templateConfig].reduce(
  (prev, curr) => ({
    peers: _.uniq(prev.peers.concat(curr.peers)),
    adminValidators: _.uniq(prev.adminValidators.concat(curr.adminValidators)),
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

console.log(JSON.stringify(config, null, 2))

module.exports = config

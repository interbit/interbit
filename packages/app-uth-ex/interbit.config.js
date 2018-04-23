const path = require('path')

const { actionTypes: hubActions } = require('./src/interbit/hub/actions')
const { actionTypes: spokeActions } = require('./src/interbit/spoke/actions')

const chainAlias = {
  HUB: 'hub',
  SPOKE1: 'spoke1',
  SPOKE2: 'spoke2'
}

const covenantAlias = {
  HUB: 'hub',
  SPOKE: 'spoke'
}

const config = {
  peers: [],
  staticChains: {
    [chainAlias.HUB]: {
      covenant: covenantAlias.HUB,
      config: {
        joins: {
          consume: [],
          provide: [],
          receiveActionFrom: [
            {
              alias: chainAlias.SPOKE1,
              authorizedActions: [hubActions.TOKEN_REQUEST]
            },
            {
              alias: chainAlias.SPOKE2,
              authorizedActions: [hubActions.TOKEN_REQUEST]
            }
          ],
          sendActionTo: [
            { alias: chainAlias.SPOKE1 },
            { alias: chainAlias.SPOKE2 }
          ]
        }
      }
    },
    [chainAlias.SPOKE1]: {
      covenant: covenantAlias.SPOKE,
      config: {
        joins: {
          consume: [],
          provide: [],
          receiveActionFrom: [
            {
              alias: chainAlias.HUB,
              authorizedActions: [spokeActions.MOUNT_TOKEN]
            }
          ],
          sendActionTo: [{ alias: chainAlias.HUB }]
        }
      }
    },
    [chainAlias.SPOKE2]: {
      covenant: covenantAlias.SPOKE,
      config: {
        joins: {
          consume: [],
          provide: [],
          receiveActionFrom: [
            {
              alias: chainAlias.HUB,
              authorizedActions: [spokeActions.MOUNT_TOKEN]
            }
          ],
          sendActionTo: [{ alias: chainAlias.HUB }]
        }
      }
    }
  },
  covenants: {
    [covenantAlias.HUB]: {
      location: path.join(__dirname, 'src/interbit/hub')
    },
    [covenantAlias.SPOKE]: {
      location: path.join(__dirname, 'src/interbit/spoke')
    }
  },
  apps: {
    uthEx: {
      peers: [],
      chains: [chainAlias.HUB, chainAlias.SPOKE1, chainAlias.SPOKE2],
      appChain: chainAlias.HUB,
      indexLocation: path.join(__dirname, 'public/index.html'),
      buildLocation: path.join(__dirname, 'build/')
    }
  }
}

module.exports = config

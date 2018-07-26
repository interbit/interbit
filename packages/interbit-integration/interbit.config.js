const path = require('path')
const {
  PUB_KEY,
  FIRST_CHAIN_ALIAS,
  SECOND_CHAIN_ALIAS,
  COVENANT_ALIAS,
  JOIN_NAME
} = require('./constants')

const config = {
  peers: [],
  adminValidators: [PUB_KEY],
  staticChains: {
    [FIRST_CHAIN_ALIAS]: {
      applyInterbuffer: true,
      covenant: COVENANT_ALIAS,
      config: {
        validators: [PUB_KEY],
        joins: {
          provide: [
            {
              alias: SECOND_CHAIN_ALIAS,
              path: ['shared'],
              joinName: `${JOIN_NAME}1`
            },
            {
              alias: SECOND_CHAIN_ALIAS,
              path: ['shared'],
              joinName: `${JOIN_NAME}2`
            }
          ]
        }
      }
    },
    [SECOND_CHAIN_ALIAS]: {
      covenant: COVENANT_ALIAS,
      config: {
        validators: [PUB_KEY],
        joins: {
          consume: [
            {
              alias: FIRST_CHAIN_ALIAS,
              path: ['sharedWithMe', '0'],
              joinName: `${JOIN_NAME}1`
            },
            {
              alias: FIRST_CHAIN_ALIAS,
              path: ['sharedWithMe', '1'],
              joinName: `${JOIN_NAME}2`
            }
          ]
        }
      }
    }
  },
  covenants: {
    [COVENANT_ALIAS]: {
      location: path.join(__dirname, 'covenant')
    }
  }
}

module.exports = config

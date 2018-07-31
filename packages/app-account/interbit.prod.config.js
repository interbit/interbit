const path = require('path')
const chainAliases = require('./src/constants/chainAliases')
const { controlActionTypes } = require('./src/constants/actionTypes')

const PUB_KEY =
  'xk0EWxXLXgEB/1ZDEin4DMhsR9XN3PzYqVbyf7YsOXoF1E5ZEn2jTrh9e6kU8+zLfiaysPc4PntHAzDHWB2DjJv8+if8nTvTyGEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbFcteBgsJBwgDAgkQeEalLevEq6kEFQgKAgMWAgEC\nGQECGwMCHgEAAI60Af9FavirDL2L6pl6iywR9RV1qLrEgEtN/eMOKVj+3Tzt\n00dE12onmnWw2rcl1Amc0ZmM87vwGWYxoiRBt8tqqEbfzk0EWxXLXgECAMO+\nizeYvgWINZAtqSbn6k55j8xN9b7hVBmCrIr0PBUmg//rFCqYuelAGuEbkW+K\nv/pQki59N2lU9xucR9MhxSsAEQEAAcJfBBgBCAATBQJbFcteCRB4RqUt68Sr\nqQIbDAAAq9cB/Ax+0dq+pQN8lnkpqvQQKzUxHaiNsPbinU1XqcA51V/sGCiv\nuuOMrvm+y6jSf10lDNP7u/rGQRwSjTQ77rn5b5Q='
const WEB_AUTH_PUB_KEY =
  'xk0EWxXMKAECAI+weRG4JyZaoxsFX8TQDQtQXVYk2gabygm7as4+f+0+py+FErkKIbz8m0r6A+UrmKYaD/fksj2DGRKn/7Ohv7EAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbFcwoBgsJBwgDAgkQmTQy2zEs+JUEFQgKAgMWAgEC\nGQECGwMCHgEAAOr4Af4sl2I7QkkJvdTSMPeUJNKtj45ArxBHmbLjpYuVTpnM\nLr2DJmlNFiYgZlZkExYEI5Gm3CxyHJeq/elBSe5V613Ozk0EWxXMKAEB/3LI\nfXPVHtBtHKVE+Zveb29bmDK/l6t0w+UYIw0qpJekjaFrrLtHm5ML9BwJCBei\nea1VCL/SGTf478lZZ7My+K0AEQEAAcJfBBgBCAATBQJbFcwoCRCZNDLbMSz4\nlQIbDAAA7U8B/iloThYXFYC7IU45OqWcr5uT72ZlSaUmxKcktcjA9DRH4GVg\nZysmi4/kjUvb+qoA9GIoc7MfXxw32zkNL8YjW9c='

const config = {
  peers: [
    'citizens-master.interbit.io:443',
    'citizens-web-auth.interbit.io:443'
  ],
  adminValidators: [PUB_KEY, WEB_AUTH_PUB_KEY],
  staticChains: {
    [chainAliases.CONTROL]: {
      covenant: 'app-account-control',
      config: {
        validators: [PUB_KEY, WEB_AUTH_PUB_KEY],
        joins: {
          provide: [
            {
              alias: chainAliases.PUBLIC,
              path: ['privateChainHosting', 'shared'],
              joinName: 'HOSTING_SPONSOR'
            },
            {
              alias: chainAliases.GITHUB,
              path: ['interbit', 'chainId'],
              joinName: 'CONTROL_CHAIN_ID'
            }
          ],
          receiveActionFrom: [
            {
              alias: chainAliases.GITHUB,
              authorizedActions: [controlActionTypes.ADD_KEY_TO_SPONSORED_CHAIN]
            }
          ]
        }
      }
    },
    [chainAliases.PUBLIC]: {
      covenant: 'app-account-public',
      config: {
        validators: [PUB_KEY],
        joins: {
          consume: [
            {
              alias: chainAliases.GITHUB,
              path: ['identityProviders', 'oauth', 'gitHub'],
              joinName: 'OAUTH-CONFIG-GITHUB'
            },
            {
              alias: chainAliases.CONTROL,
              path: ['privateChainHosting'],
              joinName: 'HOSTING_SPONSOR'
            }
          ]
        }
      }
    },
    [chainAliases.GITHUB]: {
      covenant: 'app-account-github-kyc',
      config: {
        validators: [PUB_KEY, WEB_AUTH_PUB_KEY],
        joins: {
          consume: [
            {
              alias: chainAliases.CONTROL,
              path: ['controlChainId'],
              joinName: 'CONTROL_CHAIN_ID'
            }
          ],
          provide: [
            {
              alias: chainAliases.PUBLIC,
              path: ['oAuth', 'shared'],
              joinName: 'OAUTH-CONFIG-GITHUB'
            }
          ],
          sendActionTo: [{ alias: chainAliases.CONTROL }]
        }
      }
    }
  },
  covenants: {
    'app-account-my-account': {
      location: path.join(__dirname, 'src/interbit/my-account')
    },
    'app-account-public': {
      location: path.join(__dirname, 'src/interbit/public')
    },
    'app-account-control': {
      location: path.join(__dirname, 'src/interbit/control')
    },
    'app-account-github-kyc': {
      location: path.join(__dirname, 'src/interbit/github-kyc')
    }
  },
  apps: {
    account: {
      peers: ['citizens-master.interbit.io'], // the peers the browser should connect to
      chains: [chainAliases.PUBLIC], // the chains that need to load in the browser
      appChain: chainAliases.PUBLIC, // The chain that the static page is loaded on
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build/') // the location of the finished build to update
    }
  }
}

module.exports = config

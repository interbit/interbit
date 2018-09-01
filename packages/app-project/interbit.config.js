const path = require('path')
const chainAliases = require('./src/constants/chainAliases')
const covenantAliases = require('./src/constants/covenantAliases')

const PUBLIC_KEY =
  'xk0EWxXLXgEB/1ZDEin4DMhsR9XN3PzYqVbyf7YsOXoF1E5ZEn2jTrh9e6kU8+zLfiaysPc4PntHAzDHWB2DjJv8+if8nTvTyGEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbFcteBgsJBwgDAgkQeEalLevEq6kEFQgKAgMWAgEC\nGQECGwMCHgEAAI60Af9FavirDL2L6pl6iywR9RV1qLrEgEtN/eMOKVj+3Tzt\n00dE12onmnWw2rcl1Amc0ZmM87vwGWYxoiRBt8tqqEbfzk0EWxXLXgECAMO+\nizeYvgWINZAtqSbn6k55j8xN9b7hVBmCrIr0PBUmg//rFCqYuelAGuEbkW+K\nv/pQki59N2lU9xucR9MhxSsAEQEAAcJfBBgBCAATBQJbFcteCRB4RqUt68Sr\nqQIbDAAAq9cB/Ax+0dq+pQN8lnkpqvQQKzUxHaiNsPbinU1XqcA51V/sGCiv\nuuOMrvm+y6jSf10lDNP7u/rGQRwSjTQ77rn5b5Q='

const config = {
  peers: [],
  adminValidators: [PUBLIC_KEY],
  staticChains: {
    [chainAliases.PUBLIC]: {
      covenant: covenantAliases.PUBLIC,
      config: {
        validators: [PUBLIC_KEY],
        joins: {
          consume: [
            {
              alias: chainAliases.CONTROL,
              path: ['interbitServices'],
              joinName: 'INTERBIT_SERVICES'
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
    [chainAliases.CONTROL]: {
      applyInterbuffer: true,
      covenant: covenantAliases.CONTROL,
      config: {
        validators: [PUBLIC_KEY],
        joins: {
          provide: [
            {
              alias: chainAliases.PUBLIC,
              path: ['interbitServices', 'shared'],
              joinName: 'INTERBIT_SERVICES'
            },
            {
              alias: chainAliases.PUBLIC,
              path: ['privateChainHosting', 'shared'],
              joinName: 'HOSTING_SPONSOR'
            }
          ]
        }
      }
    }
  },
  covenants: {
    [covenantAliases.PUBLIC]: {
      location: path.join(__dirname, 'src/interbit/public')
    },
    [covenantAliases.CONTROL]: {
      location: path.join(__dirname, 'src/interbit/control')
    },
    [covenantAliases.PRIVATE]: {
      location: path.join(__dirname, 'src/interbit/my-projects')
    },
    [covenantAliases.PRIVATE_PROJECT]: {
      location: path.join(__dirname, 'src/interbit/project')
    }
  },
  apps: {
    project: {
      peers: ['localhost:5035'], // the peers the browser should connect to
      chains: [chainAliases.PUBLIC], // the chains that need to load in the browser
      appChain: chainAliases.PUBLIC, // The chain that the static page is loaded on
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build/') // the location of the finished build to update
    }
  }
}

module.exports = config

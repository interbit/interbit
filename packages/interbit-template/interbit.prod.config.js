const path = require('path')
const chainAliases = require('./src/constants/chainAliases')

const PUBLIC_KEY =
  'xk0EWxXLXgEB/1ZDEin4DMhsR9XN3PzYqVbyf7YsOXoF1E5ZEn2jTrh9e6kU8+zLfiaysPc4PntHAzDHWB2DjJv8+if8nTvTyGEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbFcteBgsJBwgDAgkQeEalLevEq6kEFQgKAgMWAgEC\nGQECGwMCHgEAAI60Af9FavirDL2L6pl6iywR9RV1qLrEgEtN/eMOKVj+3Tzt\n00dE12onmnWw2rcl1Amc0ZmM87vwGWYxoiRBt8tqqEbfzk0EWxXLXgECAMO+\nizeYvgWINZAtqSbn6k55j8xN9b7hVBmCrIr0PBUmg//rFCqYuelAGuEbkW+K\nv/pQki59N2lU9xucR9MhxSsAEQEAAcJfBBgBCAATBQJbFcteCRB4RqUt68Sr\nqQIbDAAAq9cB/Ax+0dq+pQN8lnkpqvQQKzUxHaiNsPbinU1XqcA51V/sGCiv\nuuOMrvm+y6jSf10lDNP7u/rGQRwSjTQ77rn5b5Q='

const config = {
  // TODO: Ensure that at least one account chain is set as a peer
  peers: ['ib-stg----master.herokuapp.com:443'],
  adminValidators: [PUBLIC_KEY],
  staticChains: {
    // The public chain runs on the browser and is the entry point for the application
    [chainAliases.PUBLIC]: {
      covenant: 'template-public',
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
    // The control chain may contain sensitive application configuration. It runs
    // on validator nodes, but not on the browser.
    [chainAliases.CONTROL]: {
      applyInterbuffer: true,
      covenant: 'template-control',
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
    // Private chains are created dynamically and is not part of the initial configuration
  },
  covenants: {
    // All covenants used by the application, including covenants for
    // dynamically created chains
    'template-public': {
      location: path.join(__dirname, 'src/interbit/public')
    },
    'template-control': {
      location: path.join(__dirname, 'src/interbit/control')
    },
    'template-private': {
      location: path.join(__dirname, 'src/interbit/private')
    }
  },
  apps: {
    template: {
      peers: ['ib-stg----master.herokuapp.com'], // the peers the browser should connect to
      chains: ['templatePublic'], // the chains that need to load in the browser
      appChain: 'templatePublic', // The chain that the static page is loaded on
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build/') // the location of the finished build to update
    }
  }
}

module.exports = config

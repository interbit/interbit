const path = require('path')
const chainAliases = require('./src/constants/chainAliases')

const PUBLIC_KEY =
  'xsBRBVsO7ooBAAABBwgAg3ZdhBBk3mM+BuZLu+tkA22M+JdCpVwyTqjQs9OPqIRo6GatQ4zU+lHAwdbf1BRXKkkvFunF8ef4XHFQzURf5MkQZBy47zQlsuZy\nogAXzg2WEV5FS9joWdBaGxgBvX1f9d3gEysz9WwEbOttZ6NT9DhvnkgI0HX9\nLMSrz35Khi6QzQ9f2SqPhwyDMoNd9FAgBhNfj2aI5yS4UJzEiFEIO63poSIB\ngL1zweBt5pWKOw7WupNKc8JJZVH3ijeiqf6WAcZfLfLIY/ZX5PNaKfZuoSJq\nQQrMk08VhFnACaY19qDgan35SOmy+q87gUE56UNBXpDSdMmpl2INpi9lWKNR\nSQARAQABzQtpbmZvQGJ0bC5jb8LAkgQQAQgARgUCWw7uigYLCQcIAwIEFQgK\nAgMWAgECGQECGwMCHgciIQVK8GhNqhr+frAPwyAEPfOEY65uCkuSqhWqYzed\nF/7uygMiAQIAACTBB/0dPcOQiMIN6dHzxTessIeLP9fymtEWXhScmMwAQzg+\nh25MXu/wllWfa6K3fR6wnUXyedRYVsCGwQ9GQAxlCw6ppicKnByUfQP0W8z6\nkdFP+4bLbZvUBq40tIeoeFCWsDui9hs7HdgwNH7kzhIXAdLFhhibiGGSa2cS\nnST5IW6NDhfbZyfkSyXxIr01eLYgxlETsb0/0l7rXXujkKOn1oH+Oi5iEPt5\nxzVllVOD0SsOWLq54k4/bcO+7wCgroH65ZbX6J/AKtd84Z3v4NF2Mx27Suhk\nwz3IfMMHjgJCHl/mJEvPXTyhGyNZfGzf+cNaAnNX2x1uYbH0y8CE/9aKNQ3E\nzsBRBVsO7ooBAAABBwgA06ds3G+eTxT0Allu0okvr8aXRmdVtImHqy9EWYLD\nkb0OHN7mb+ZyqLsvo2oOP+nTa4fgxNVQ+tuN/a3rjJ9f+INDtt+2aNkr3pJP\n66pj4UH9sepdtcOTHZCDZSkyn8ClR6/scNQd8QyaxitY+oMvbe3FUQvMdeT+\nqUAzmK18VPciHBBeDY7OCUTZ8XAEc3pc5uf27LemQ8zsN8mcPfauUzDvfDA+\n6xOgko71I60zs6ucu3Ja59IaFt2WS5LyFgOG4aczKREnYi3W/IwErZAzmL03\nywMRO0De5X2KbM/4TDG66fIAr1sKzq0hjKtzPVnp8naux31Tp2A5WxhFESYB\ntQARAQABwsB4BBgBCAAsBQJbDu6KAhsMIiEFSvBoTaoa/n6wD8MgBD3zhGOu\nbgpLkqoVqmM3nRf+7soAAGEUB/93ph/D6yFswwBpTsI8w8eiZIZ+qD/TzYGB\nVnJuDQXPxoAJbtrFlvxx3fvNr6u0mN3/NkT82jGx8FMHRxdfA2JBoMlCyrkV\nAjX5MQzUNen91Ush3g+k0eLM+YzL3ZuNBcITsBO09bY0CEjfBmHFpVx9/Hu/\nYyGZPdx5SPDLrM4uXJlc3RzUOequddjMH8fSMmN90Qr0t8QFMmNq33AlDPf6\nD83QGwG9FXH5jFGc5qELAJweogtaorG4su7K3s2MowWonwvgJf095lGTwB8O\nbICtRYdriZLLH08i4lZuW7buLxhMkTiPXeMslSwBHWf+plNxEJZ4z7e0+dAx\nim9RO0Ao'

const config = {
  // TODO: Ensure that at least one account chain is set as a peer
  peers: ['ib-dev----master.herokuapp.com:443'],
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
      peers: ['ib-dev----master.herokuapp.com'], // the peers the browser should connect to
      chains: ['templatePublic'], // the chains that need to load in the browser
      appChain: 'templatePublic', // The chain that the static page is loaded on
      indexLocation: path.join(__dirname, 'public/index.html'), // the index.html to update with the app info
      buildLocation: path.join(__dirname, 'build/') // the location of the finished build to update
    }
  }
}

module.exports = config

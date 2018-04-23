// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

const actionTypes = {
  SUBMIT_APP: 'SUBMIT_APP',
  BUY_APP: 'BUY_APP'
}

const actionCreators = {
  submitApp: ({ name, data }) => ({
    type: actionTypes.SUBMIT_APP,
    payload: {
      name,
      data
    }
  }),
  buyApp: ({ name }) => ({
    type: actionTypes.BUY_APP,
    payload: { name }
  })
}

const initialState = Immutable.from({
  chainMetadata: {
    chainName: 'Interbit Official App Store'
  },
  apps: {
    // This is more like what the final state for a directory entry will be
    'app-123as-d544s': {
      name: 'ChainedIn',
      price: {
        amt: 10.0,
        type: 'USD'
      },
      description: 'Network with your colleagues or something I guess',
      thumbnail: 'hellokitty',
      author: {
        name: 'Microsoft',
        chainId: 'ds5a4-r3ew87-c46ax8-43e2awr'
      },
      rating: 4.0,
      users: 98435,
      app: {
        type: 'APP',
        covenantHash:
          'fdsa6974fsd563f1cvas98r41qea53sf7c48ad16rea84rf1sa856345eORSOMETHING'
      }
    },
    // The following apps all have really basic JSON data, solely for mocking
    'app-koewrq-d544s': {
      name: 'Interbit Chain Hosting',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description:
        "Host your Interbit Blockchain Applications easily and quickly with Interbit's official hosting provider",
      thumbnail: 'random5',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 5,
      users: 4537
    },
    'app-0k9cvx-d544s': {
      name: 'Interbit Licensing',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Manage your Interbit Blockchain Application licensing fees',
      thumbnail: 'random1',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.7,
      users: 123456
    },
    'app-w4rmkl-d544s': {
      name: 'Interbit Account',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Manage your Interbit account',
      thumbnail: 'random2',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.8,
      users: 12123454
    },
    'app-mvixcop-d544s': {
      name: 'Interbit Exchange',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Exchange tokens traded in the Interbit Ecosystem',
      thumbnail: 'random3',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 45637
    },
    'app-bvixcop-d544s': {
      name: 'BlockOverflow',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Immutable development community help and rep',
      thumbnail: 'random4',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-cvixcop-d544s': {
      name: 'Supply Chain Mgmt',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Cradle to grave for any bean, widget, or piece of data.',
      thumbnail: 'random5',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-dvixcop-d544s': {
      name: 'Reputation Service',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Enabling civil discourse.  Leave the trolls behind.',
      thumbnail: 'random6',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-evixcop-d544s': {
      name: 'OneOffice',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Energy Consortium Trading Platform (Beta)',
      thumbnail: 'random7',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-fvixcop-d544s': {
      name: 'Fleet Routing App',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Routing for corporate fleets',
      thumbnail: 'random8',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-gvixcop-d544s': {
      name: 'Provenance-Tracking Solution',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Where did that component come from? (and who is liable)',
      thumbnail: 'random9',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-hvixcop-d544s': {
      name: 'Tax solution',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description: 'Annual tax calculation where you share none of YOUR data.',
      thumbnail: 'random1',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    },
    'app-ivixcop-d544s': {
      name: 'Election Voting',
      price: {
        amt: 0.0,
        type: 'USD'
      },
      description:
        'Citizen voting on an immutable blockchain, for countries, states, provinces, municipalities.',
      thumbnail: 'random2',
      author: {
        name: 'BTL Group Ltd.'
      },
      rating: 4.2,
      users: 1285637
    }
  }
})

const smartContract = (state = initialState, action) => state

module.exports = {
  initialState,
  actionCreators,
  smartContract,
  reducer: smartContract
}

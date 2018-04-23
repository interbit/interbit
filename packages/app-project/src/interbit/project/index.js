// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  // Shown in list of running chains
  chainMetadata: { chainName: 'Interbit Project Details' },

  // Directory entry for chain, initially in My Projects
  directoryEntry: {
    projectName: undefined,
    description: undefined
  }

  // Project status
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  let nextState = state

  switch (action.type) {
    case actionTypes.UPDATE_PROJECT: {
      console.log('DISPATCH: ', action)
      const { projectName, description, icon, launchUrl } = action.payload

      nextState = nextState.setIn(['chainMetadata', 'chainName'], projectName)
      nextState = nextState.merge({
        directoryEntry: { projectName, description, icon, launchUrl }
      })

      return nextState
    }

    default:
      return state
  }
}

module.exports = {
  actionCreators,
  initialState,
  reducer
}

// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const {
  coreCovenant: {
    redispatch,
    actionCreators: { addToAcl }
  }
} = require('interbit-covenant-tools')

const actionTypes = {
  ADD: 'incrementer/ADD'
}

const actionCreators = {
  add: value => ({
    type: actionTypes.ADD,
    payload: {
      value
    }
  })
}

const initialState = Immutable.from({ sum: 0 })

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD: {
      console.log('DISPATCH: ', action)

      const { value } = action.payload
      return state.set('sum', state.sum + Number(value))
    }

    // This won't work until an update to core allowing any user to dispatch actions to a common chain
    case '@@interbit/DEPLOY': {
      const addToAclAction = addToAcl({
        actionPermissions: { [actionTypes.ADD]: ['public'] },
        roles: { public: ['*'] }
      })

      console.log('REDISPATCH: ', addToAclAction)
      return redispatch(state, addToAclAction)
    }

    default:
      return state
  }
}

const covenant = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}

module.exports = covenant

// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

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

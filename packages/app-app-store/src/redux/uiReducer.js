import Immutable from 'seamless-immutable'

const initialState = {
  selectedApp: null
}

const SELECT_APP = 'UI/SELECT_APP'

export function selectApp(appName) {
  return {
    type: SELECT_APP,
    payload: {
      appName
    }
  }
}

export default function(state = Immutable.from(initialState), action = {}) {
  switch (action.type) {
    case SELECT_APP:
      return {
        selectedApp: action.payload.appName
      }
    default:
      return state
  }
}

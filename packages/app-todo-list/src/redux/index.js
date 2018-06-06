import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as interbitReducer } from 'interbit-ui-tools'
import exploreChainReducer from './exploreChainReducer'
import { reducer as uiReducer } from './uiReducer'

export default combineReducers({
  form: formReducer,
  interbit: interbitReducer,
  exploreChain: exploreChainReducer,
  ui: uiReducer
})

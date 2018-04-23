import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as interbitReducer } from 'interbit-middleware'
import { reducer as uiReducer } from './uiReducer'
import exploreChainReducer from './exploreChainReducer'

export default combineReducers({
  form: formReducer,
  ui: uiReducer,
  interbit: interbitReducer,
  exploreChain: exploreChainReducer
})

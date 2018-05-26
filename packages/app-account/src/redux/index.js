import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as interbitReducer } from 'interbit-ui-tools'
import exploreChainReducer from './exploreChainReducer'
import { reducer as uiReducer } from './uiReducer'
import { reducer as contentReducer } from './contentReducer'

export default combineReducers({
  form: formReducer,
  ui: uiReducer,
  content: contentReducer,
  interbit: interbitReducer,
  exploreChain: exploreChainReducer
})

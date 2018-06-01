import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  reducer as interbitReducer,
  INTERBIT_REDUCER_KEY
} from 'interbit-ui-tools'
import exploreChainReducer from './exploreChainReducer'
import { reducer as uiReducer } from './uiReducer'

export default combineReducers({
  form: formReducer,
  interbit: interbitReducer,
  [INTERBIT_REDUCER_KEY]: interbitReducer,
  exploreChain: exploreChainReducer,
  ui: uiReducer
})

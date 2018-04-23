import { combineReducers } from 'redux'
import uiReducer from './uiReducer'

export default combineReducers({
  ui: uiReducer
})

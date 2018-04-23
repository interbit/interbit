import { combineReducers } from 'redux'
import { reducer as contentReducer } from './contentReducer'

export default combineReducers({
  content: contentReducer
})

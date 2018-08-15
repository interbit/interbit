import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { interbitRedux, blockExplorerRedux } from 'interbit-ui-tools'

export default combineReducers({
  form: formReducer,
  interbit: interbitRedux.reducer,
  blockExplorer: blockExplorerRedux.reducer
})

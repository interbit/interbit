AppBucket example:
```js
const {BrowserRouter} = require('react-router-dom')
const { Provider } = require('react-redux')
const { createStore, combineReducers } =require('redux')
const AppBar = require('@material-ui/core/AppBar').default;

const initialState = {
  isVisible: false
}

const appBucket = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_APP_BUCKET':
       return Object.assign({}, state, {isVisible: !state.isVisible})
    default:
      return state
  }
}

const store = createStore(combineReducers({appBucket}))

;
<Provider store={store}>
<BrowserRouter>
<div style={{ flexGrow: 1 }}>
 <AppBar position="static">
  <AppBucket 
    items={[
      {
        label:'First App', 
        icon:'https://via.placeholder.com/64x64',
        to: '/app-1',
        clickHandler: () => { alert('First App Clicked'); }
      },
      {
        label:'Second App', 
        icon:'https://via.placeholder.com/64x64',
        to: '/app-2'
      },
      {
        label:'Third App', 
        icon:'https://via.placeholder.com/64x64',
        to: '/app-3'
      },
      {
        label:'Fourth App', 
        icon:'https://via.placeholder.com/64x64',
        to: '/app-4'
      },
    ]}
  />
  </AppBar>
  </div>
</BrowserRouter>
</Provider>

```

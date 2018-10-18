AppBucket example:
```js
const {BrowserRouter} = require('react-router-dom')
const { Provider } = require('react-redux')
const { createStore, combineReducers } =require('redux')
const AppBar = require('@material-ui/core/AppBar').default
const Toolbar = require('@material-ui/core/Toolbar').default
const Typography = require('@material-ui/core/Typography').default
const Apps = require('@material-ui/icons/Apps').default
const IconButton = require('@material-ui/core/IconButton').default

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
         <Toolbar>
           <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
             AppBucket Example
           </Typography>  
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
           >
             <IconButton aria-haspopup="true" color="inherit">
               <Apps />
             </IconButton>
           </AppBucket>
         </Toolbar>
       </AppBar>
    </div>
  </BrowserRouter>
</Provider>
```

  AppBucket example with none-right align:
  
  ```js
  const {BrowserRouter} = require('react-router-dom')
  const { Provider } = require('react-redux')
  const { createStore, combineReducers } =require('redux')
  const AppBar = require('@material-ui/core/AppBar').default
  const Toolbar = require('@material-ui/core/Toolbar').default
  const Typography = require('@material-ui/core/Typography').default
  const Apps = require('@material-ui/icons/Apps').default
  const IconButton = require('@material-ui/core/IconButton').default
  
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
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
              AppBucket Example
            </Typography>  
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
            >
              <IconButton aria-haspopup="true" color="inherit">
                <Apps />
              </IconButton>
            </AppBucket>
            <Typography color="inherit" style={{flexGrow: 1}}>
              More Fake Element(s)
            </Typography>
          </Toolbar>
        </AppBar>
     </div>
   </BrowserRouter>
 </Provider>
```

import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Welcome, Navigation } from '../../src'
import ConnectedCovenant from './ConnectedCovenant'
import chainReducer from './testCovenant'
import ConnectedBlockExplorer from './ConnectedBlockExplorer'
import blockExplorerReducer from './testBlockExplorerReducer'
import '../../src/css/index.css'

const reducers = combineReducers({
  chainState: chainReducer.smartContract,
  blockExplorer: blockExplorerReducer,
  form: formReducer
})

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class Demo extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navigation
              account={{
                userAlias: 'John Smith',
                to: 'https://accounts.google.com'
              }}
              navItems={[
                {
                  title: 'DEMO',
                  eventKey: 'home'
                },
                {
                  title: 'BLOCKCHAIN',
                  eventKey: 'block-explorer'
                },
                {
                  title: 'COVENANT',
                  eventKey: 'covenant'
                },
                {
                  title: 'GOOGLE',
                  eventKey: 'google',
                  to: 'https://google.com'
                },
                {
                  title: 'three',
                  eventKey: 'three',
                  isHidden: true
                }
              ]}
            />
            <h1>lib-react-interbit Demo</h1>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/home" component={Welcome} />
              <Route exact path="/covenant" component={ConnectedCovenant} />
              <Route
                exact
                path="/block-explorer"
                component={ConnectedBlockExplorer}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))

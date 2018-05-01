// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { middleware as interbitMiddleware } from 'interbit-ui-tools'
import { BrowserRouter } from 'react-router-dom'

import 'interbit-ui-components/src/css/index.css'
import 'interbit-ui-components/src/css/interbit.css'

import App from './App'

import registerServiceWorker from './registerServiceWorker'
import { setSelectedChain } from './redux/exploreChainReducer'

import reducers from './redux'

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(interbitMiddleware))
)
store.dispatch(setSelectedChain('hub'))

// eslint-disable-next-line react/no-render-return-value
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

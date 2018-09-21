// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
import queryString from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { interbitRedux } from 'interbit-ui-tools'

import 'interbit-ui-components/dist/css/interbit.css'

import App from './App'

import { PUBLIC, PRIVATE } from './constants/chainAliases'
import reducers from './redux'

const { browserChainId: sponsoredChainId, privateChainId } = queryString.parse(
  window.location.search
)

const interbitMiddleware = interbitRedux.createMiddleware({
  publicChainAlias: PUBLIC,
  privateChainAlias: PRIVATE,
  sponsoredChainId,
  privateChainId
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(interbitMiddleware, sagaMiddleware))
)
sagaMiddleware.run(interbitRedux.rootSaga)

// eslint-disable-next-line react/no-render-return-value
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

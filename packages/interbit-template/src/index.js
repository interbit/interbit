// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import {
  createMiddleware as createInterbitMiddleware,
  rootSaga as interbitSaga
} from 'interbit-ui-tools'

import 'interbit-ui-components/src/css/index.css'
import 'interbit-ui-components/src/css/interbit.css'

import App from './App'

import { PUBLIC, PRIVATE } from './constants/chainAliases'
import registerServiceWorker from './registerServiceWorker'
import { setSelectedChain } from './redux/exploreChainReducer'
import reducers from './redux'

const interbitMiddleware = createInterbitMiddleware({
  publicChainAlias: PUBLIC,
  privateChainAlias: PRIVATE
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(interbitMiddleware, sagaMiddleware))
)
sagaMiddleware.run(interbitSaga)

// BlockExplorer will monitor the public chain
store.dispatch(setSelectedChain(PRIVATE))

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

// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { interbitRedux } from 'interbit-ui-tools'

import 'interbit-ui-components/src/css/index.css'
import 'interbit-ui-components/src/css/interbit.css'

import App from './App'

import reducers from './redux'

// TODO: Provide public/private chain arguments to createMiddleware
const interbitMiddleware = interbitRedux.createMiddleware()

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

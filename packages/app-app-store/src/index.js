// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'

import 'interbit-ui-components/src/css/index.css'
import 'interbit-ui-components/src/css/interbit.css'

import App from './App'

import registerServiceWorker from './registerServiceWorker'
import reducers from './redux'

const store = createStore(reducers, composeWithDevTools())

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

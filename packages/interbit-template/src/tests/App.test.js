import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import reducers from '../redux'

describe('Rendering Tests', () => {
  it('renders without crashing', () => {
    const store = createStore(reducers, composeWithDevTools())
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.createElement('div')
    )
  })
})

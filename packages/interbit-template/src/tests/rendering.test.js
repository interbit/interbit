import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import ConnectedRequestCAuth, { RequestCAuth } from '../containers/RequestCAuth'
import ConnectedCompleteCAuth, {
  CompleteCAuth
} from '../containers/CompleteCAuth'
import NotFound from '../containers/NotFoundPage'
import reducers from '../redux'

const renderWithContext = component => {
  const store = createStore(reducers, composeWithDevTools())
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>,
    document.createElement('div')
  )
}

describe('Rendering Tests', () => {
  it('renders without crashing', () => {
    renderWithContext(<App />)
  })

  it('NotFound', () => {
    renderWithContext(<NotFound />)
  })
  it('ConnectedRequestCAuth', () => {
    renderWithContext(<ConnectedRequestCAuth />)
  })
  it('RequestCAuth when a chain has loaded', () => {
    const props = {
      isChainLoaded: true
    }
    renderWithContext(<RequestCAuth {...props} />)
  })
  it('ConnectedCompleteCAuth', () => {
    const props = {
      location: {
        search: {
          params: ''
        }
      }
    }
    renderWithContext(<ConnectedCompleteCAuth {...props} />)
  })
  it('CompleteCAuth when a chain has loaded', () => {
    const props = {
      isChainLoaded: true
    }
    renderWithContext(<CompleteCAuth {...props} />)
  })
  it('CompleteCAuth when a chain has loaded', () => {
    const props = {
      error: true,
      isChainLoaded: true
    }
    renderWithContext(<CompleteCAuth {...props} />)
  })
})

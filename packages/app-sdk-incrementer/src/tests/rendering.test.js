import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import { InteractiveChains } from '../containers/InteractiveChains'
import { ExploreChain } from '../containers/ExploreChain'
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

describe('Renders without crashing:', () => {
  it('App', () => {
    renderWithContext(<App />)
  })

  describe('containers:', () => {
    it('InteractiveChains with chain data', () => {
      const props = {
        exploreChain: {
          chains: {
            hub: {
              chainId: '1234',
              name: 'Hub chain',
              state: {
                chainMetadata: { chainName: 'Hub' }
              }
            },
            spoke1: {
              chainId: '4567',
              name: 'Spoke chain',
              state: {}
            },
            spoke2: {
              chainId: '',
              name: '',
              state: {}
            },
            spoke3: {}
          }
        },
        selectedChain: {
          chainId: '12345',
          state: {}
        },
        blockchainDispatch: () => {},
        resetForm: () => {}
      }
      renderWithContext(<InteractiveChains {...props} />)
    })

    it('ExploreChain', () => {
      const props = {
        selectedChain: {
          name: 'A chain',
          state: {},
          interbit: {},
          blocks: [],
          actionCreators: {},
          chainDispatch: () => {}
        },
        doToggleRawData: () => {},
        doSetSelectedBlockHash: () => {}
      }
      renderWithContext(<ExploreChain {...props} />)
    })
  })
})

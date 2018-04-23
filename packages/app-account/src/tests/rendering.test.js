import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import NotFoundPage from '../containers/NotFoundPage'
import Home from '../containers/Home'
import { Account } from '../containers/Account'
import { ChainConnect } from '../containers/ChainConnect'
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
    it('NotFound', () => {
      renderWithContext(<NotFoundPage />)
    })

    it('Account', () => {
      const contentBar = {
        title: 'title',
        image: 'image',
        content: 'content',
        callToAction: {
          text: 'cta'
        }
      }
      const props = {
        content: {
          title: 'Title',
          intro: 'Intro',
          apps: {
            title: 'apps',
            content: 'app content'
          }
        },
        contentBars: {
          appStore: contentBar,
          appHosting: contentBar,
          attention: contentBar
        },
        modals: {
          title: 'modal',
          content: 'content'
        }
      }
      renderWithContext(<Account {...props} />)
    })

    it('ChainConnect', () => {
      renderWithContext(<ChainConnect />)
    })

    it('Home', () => {
      renderWithContext(<Home />)
    })
  })
})

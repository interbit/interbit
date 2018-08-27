import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import NotFoundPage from '../containers/NotFoundPage'
import Home from '../containers/Home'
import PageContainer from '../containers/PageContainer'
import { Account } from '../containers/Account'
import { ChainConnect } from '../containers/ChainConnect'
import { EmailSuccess } from '../containers/EmailSuccess'
import { CreateAccount } from '../containers/CreateAccount'
import { InteractiveChains } from '../containers/InteractiveChains'
import { Profile } from '../containers/Profile'
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
          attentionMoreInfo: {
            title: 'modal',
            content: 'content'
          }
        }
      }
      renderWithContext(<Account {...props} />)
    })

    it('ChainConnect', () => {
      renderWithContext(<ChainConnect />)
    })

    it('ChainConnect', () => {
      renderWithContext(<ChainConnect mode={0} />)
    })

    it('ChainConnect', () => {
      renderWithContext(<ChainConnect mode={1} />)
    })

    it('Home', () => {
      renderWithContext(<Home />)
    })

    it('Home', () => {
      renderWithContext(<Home isLoggedIn />)
    })

    it('EmailSuccess', () => {
      renderWithContext(<EmailSuccess />)
    })

    it('CreateAccount', () => {
      const props = {
        content: {
          intro: 'meow',
          signIn: {
            content: 'neigh'
          }
        },
        contentBars: {
          gitHubCreateAccount: {
            buttonText: 'bacon',
            image: 'burger'
          },
          gitHubSignIn: {
            buttonText: 'salami',
            image: 'sandwich'
          },
          attention: {
            title: 'woof',
            image: 'dog',
            content: 'pomsky',
            callToAction: {}
          }
        },
        modals: {
          attentionMoreInfo: {
            title: 'pickles',
            content: 'cucumbers'
          },
          attention: {
            title: 'horchata',
            content: 'rice',
            checkbox: 'it is delicious',
            moreInfo: 'more'
          }
        },
        toggleButtonFunction: () => false,
        toggleModalFunction: () => false
      }
      renderWithContext(<CreateAccount {...props} />)
    })

    it('PageContainer', () => {
      renderWithContext(<PageContainer />)
    })

    // TODO: Issue #638 - write rendering test for Profile component
    it.skip('Profile', () => {
      renderWithContext(<Profile />)
    })

    it('InteractiveChains', () => {
      const props = {
        selectedChain: {
          chainAlias: 'iAmAChain',
          state: {}
        },
        resetForm: () => false,
        blockchainDispatch: () => () => {}
      }
      renderWithContext(<InteractiveChains {...props} />)
    })
  })
})

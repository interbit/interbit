import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import Contact from '../containers/Contact'
import DevelopersArchitecture from '../containers/Developers/Architecture'
import DevelopersExampleApps from '../containers/Developers/ExampleApps'
import DevelopersOverview from '../containers/Developers/Overview'
import DevelopersPlatformFeatures from '../containers/Developers/PlatformFeatures'
import DevelopersSupport from '../containers/Developers/Support'
import DevelopersResources from '../containers/Developers/Resources'
import InterbitForBusiness from '../containers/Platform/InterbitForBusiness'
import Platform from '../containers/Platform/Platform'
import Roadmap from '../containers/Platform/Roadmap'
import Pricing from '../containers/Pricing'
import Privacy from '../containers/Policies/Privacy'
import TermsOfService from '../containers/Policies/TermsOfService'
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

  describe('Containers', () => {
    it('Contact', () => {
      renderWithContext(<Contact />)
    })
    it('Dev Chain Architecture', () => {
      renderWithContext(<DevelopersArchitecture />)
    })
    it('Dev Example Apps', () => {
      renderWithContext(<DevelopersExampleApps />)
    })
    it('Dev Overview', () => {
      renderWithContext(<DevelopersOverview />)
    })
    it('Dev Platform Features', () => {
      renderWithContext(<DevelopersPlatformFeatures />)
    })
    it('Dev Resources', () => {
      renderWithContext(<DevelopersResources />)
    })
    it('Dev Support', () => {
      renderWithContext(<DevelopersSupport />)
    })

    it('Platform', () => {
      renderWithContext(<Platform />)
    })
    it('Platform Interbit for Business', () => {
      renderWithContext(<InterbitForBusiness />)
    })
    it('Pricing', () => {
      renderWithContext(<Pricing />)
    })
    it('Product Roadmap', () => {
      renderWithContext(<Roadmap />)
    })

    it('Privacy Policy', () => {
      renderWithContext(<Privacy />)
    })
    it('Terms of Service', () => {
      renderWithContext(<TermsOfService />)
    })
  })
})

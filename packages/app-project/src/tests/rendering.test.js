import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from '../App'
import NotFoundPage from '../containers/NotFoundPage'
import ChainConnect from '../containers/ChainConnect'
import ExploreChain from '../containers/ExploreChain'
import InteractiveChains from '../containers/InteractiveChains'
import { ProjectDetails } from '../containers/ProjectDetails'
import { ProjectList } from '../containers/ProjectList'
import { NewProject } from '../containers/NewProject'
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
    it('ProjectDetails', () => {
      const props = {
        project: undefined,
        history: {},
        blockchainDispatch: () => {}
      }
      renderWithContext(<ProjectDetails {...props} />)
    })

    it('ProjectDetails with a project', () => {
      const props = {
        project: {
          name: 'Bob',
          description: 'asd',
          faIcon: 'fa-lemon'
        },
        history: {},
        blockchainDispatch: () => {}
      }
      renderWithContext(<ProjectDetails {...props} />)
    })

    it('ProjectList', () => {
      const props = {
        projects: [],
        connectUrl: undefined
      }
      renderWithContext(<ProjectList {...props} />)
    })

    it('ProjectList with list', () => {
      const props = {
        projects: [
          {
            name: 'Bob',
            description: 'asd',
            faIcon: 'fa-lemon'
          }
        ],
        connectUrl: undefined
      }
      renderWithContext(<ProjectList {...props} />)
    })

    it('404', () => {
      renderWithContext(<NotFoundPage />)
    })

    it('InteractiveChains', () => {
      const props = {
        location: {
          search: ''
        }
      }
      renderWithContext(<InteractiveChains {...props} />)
    })

    it('ExploreChain', () => {
      const props = {
        location: {
          search: ''
        }
      }
      renderWithContext(<ExploreChain {...props} />)
    })

    it('ChainConnect', () => {
      const props = {
        location: {}
      }
      renderWithContext(<ChainConnect {...props} />)
    })

    it('NewProject', () => {
      const props = {
        blockchainDispatch: () => {}
      }
      renderWithContext(<NewProject {...props} />)
    })
  })
})

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { selectors } from 'interbit-ui-tools'

import PageContainer from './containers/PageContainer'
import PageContainerNoNav from './containers/PageContainerNoNav'

import CHAIN_ALIASES from './constants/chainAliases'
import paths from './constants/paths'
import './config/amplitude'
import './css/App.css'

let firstButtonClicked = false
let startAuthButtonClicked = false
let continueButtonClicked = false

function MTTFOptimizer({ isChainLoaded, isLoggedIn, state }) {
  if (
    isChainLoaded &&
    !isLoggedIn &&
    !window.location.pathname.startsWith('/account/oauth/gitHub')
  ) {
    if (['', '/'].includes(window.location.pathname) && !firstButtonClicked) {
      const firstButton = document.getElementById('ib-test-create-account')
      if (firstButton) {
        console.log('Clicking first button')
        firstButtonClicked = true
        setTimeout(() => firstButton.click(), 300)
      }
    } else if (!startAuthButtonClicked) {
      const startAuthButton = document.getElementById('ib-test-github-create')
      if (startAuthButton) {
        console.log('Clicking start auth')
        startAuthButtonClicked = true
        setTimeout(() => startAuthButton.click(), 300)
      }
    } else if (state.ui.modals.attention && !continueButtonClicked) {
      const continueButton = document.getElementsByName('continue')[0]
      if (continueButton) {
        console.log('Clicking continue')
        continueButtonClicked = true
        setTimeout(() => continueButton.click(), 300)
      }
    }
  } else if (
    isChainLoaded &&
    isLoggedIn &&
    window.location.pathname.startsWith('/account/oauth/gitHub')
  ) {
    window.localStorage.clear()
    window.indexedDB.deleteDatabase('IDBWrapper-interbit')
    window.location = '/'
  }
}

const mapStateToProps = state => {
  const chainAlias = CHAIN_ALIASES.PRIVATE
  const isChainLoaded = selectors.isChainLoaded(state, { chainAlias })

  const chainState = isChainLoaded
    ? selectors.getChain(state, { chainAlias })
    : {}
  const isLoggedIn = isChainLoaded && !!chainState.profile['gitHub-identity']

  MTTFOptimizer({ isChainLoaded, isLoggedIn, state })

  const gitHubUsername =
    isLoggedIn && chainState.profile['gitHub-identity'].login

  return {
    userName: gitHubUsername || '',
    isChainLoaded,
    isLoggedIn
  }
}

export class App extends Component {
  static propTypes = {
    userName: PropTypes.string,
    isChainLoaded: PropTypes.bool,
    isLoggedIn: PropTypes.bool
  }

  static defaultProps = {
    userName: '',
    isChainLoaded: false,
    isLoggedIn: false
  }

  render() {
    const { isChainLoaded } = this.props

    return (
      <div className="App ibweb app-account">
        {isChainLoaded ? (
          <Switch>
            <Route
              path={paths.CONNECT}
              render={() => <PageContainerNoNav {...this.props} />}
              isLoggedIn
            />
            <Route render={() => <PageContainer {...this.props} />} />
          </Switch>
        ) : (
          <Route render={() => <PageContainerNoNav {...this.props} />} />
        )}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App))

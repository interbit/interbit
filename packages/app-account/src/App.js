import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { selectors } from 'interbit-ui-tools'

import PageContainer from './containers/PageContainer'
import PageContainerNoNav from './containers/PageContainerNoNav'

import CHAIN_ALIASES from './constants/chainAliases'
// import { PRIVATE_CHAIN_PATHS } from './constants/chainStatePaths'
import paths from './constants/paths'
import './config/amplitude'
import './css/App.css'

const mapStateToProps = state => {
  const chainAlias = CHAIN_ALIASES.PRIVATE
  const isChainLoaded = selectors.isChainLoaded(state, { chainAlias })
  // const userName = isChainLoaded
  //   ? selectors
  //       .getChain(state, { chainAlias })
  //       .getIn(PRIVATE_CHAIN_PATHS.USERNAME)
  //   : undefined

  const chainState = isChainLoaded
    ? selectors.getChain(state, { chainAlias })
    : {}
  const isLoggedIn = isChainLoaded && !!chainState.profile['gitHub-identity']
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

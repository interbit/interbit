import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'

import { selectors } from 'interbit-ui-tools'

import PageContainer from './containers/PageContainer'
import PageContainerNoNav from './containers/PageContainerNoNav'

import CHAIN_ALIASES from './constants/chainAliases'
import { PRIVATE_CHAIN_PATHS } from './constants/chainStatePaths'
import paths from './constants/paths'
import './config/amplitude'
import './css/App.css'

const mapStateToProps = state => {
  const chainAlias = CHAIN_ALIASES.PRIVATE
  const isChainLoaded = selectors.isChainLoaded(state, { chainAlias })
  const userName = isChainLoaded
    ? selectors
        .getChain(state, { chainAlias })
        .getIn(PRIVATE_CHAIN_PATHS.USERNAME)
    : undefined

  const chainState = isChainLoaded
    ? selectors.getChain(state, { chainAlias })
    : {}
  const isLoggedIn = isChainLoaded && !!chainState.profile['gitHub-identity']

  return {
    userName,
    isLoggedIn
  }
}

export class App extends Component {
  static propTypes = {
    userName: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }

  static defaultProps = {
    userName: '',
    isLoggedIn: false
  }

  render() {
    return (
      <div className="App ibweb app-account">
        <Switch>
          <Route
            path={paths.CONNECT}
            render={() => <PageContainerNoNav {...this.props} />}
            isLoggedIn
          />
          <Route render={() => <PageContainer {...this.props} />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App))

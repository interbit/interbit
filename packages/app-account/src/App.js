import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Header, Footer } from 'interbit-ui-components'

import { selectors } from 'interbit-ui-tools'

import Account from './containers/Account'
import Home from './containers/Home'
import NotFoundPage from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'
import ChainConnect from './containers/ChainConnect'
import CreateAccount from './containers/CreateAcount'

import LogoAccount from './components/LogoAccounts'
import CHAIN_ALIASES from './constants/chainAliases'
import { PRIVATE_CHAIN_PATHS } from './constants/chainStatePaths'
import paths from './constants/paths'
import urls from './constants/urls'
import navigation from './constants/navigation'
import './css/App.css'

const mapStateToProps = state => {
  const chainAlias = CHAIN_ALIASES.PRIVATE
  const userName = selectors.isChainLoaded(state, { chainAlias })
    ? selectors
        .getChain(state, { chainAlias })
        .getIn(PRIVATE_CHAIN_PATHS.USERNAME)
    : undefined

  return {
    userName,
    // TODO: Require authentication
    isLoggedIn: true
  }
}

export class App extends Component {
  static propTypes = {
    userName: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }

  static defaultProps = {
    userName: 'anonymous user',
    isLoggedIn: false
  }

  render() {
    const { userName, isLoggedIn } = this.props

    const headerTextNav = [
      {
        content: (
          <div className="username">
            {userName} <span>(Signed in)</span>
          </div>
        ),
        key: 'username'
      }
    ]

    return (
      <div className="App ibweb app-account">
        <Header
          className="nav-main-menu"
          logo={<LogoAccount />}
          navItems={
            isLoggedIn ? navigation.headerNav : navigation.headerNavLoggedOut
          }
          textNavItems={headerTextNav}
        />

        <Grid>
          <Switch>
            <Route exact path={paths.HOME} component={Home} />
            <Route
              exact
              path="/account/oauth/:oAuthProvider"
              component={Account}
            />
            <Route path={paths.ACCOUNT} component={Account} />
            <Route path={paths.CONNECT} component={ChainConnect} />
            <Route exact path={paths.CHAINS} component={InteractiveChains} />
            <Route path={paths.BLOCK_EXPLORER} component={ExploreChain} />
            <Route
              exact
              path={paths.CREATE_ACCOUNT}
              component={CreateAccount}
            />
            <Route component={NotFoundPage} />
          </Switch>

          <Footer
            sections={navigation.footerNav}
            isInline
            logoUrl={urls.APP_IB_IO}
            bottomLinks={navigation.footerBottomLinks}
          />
        </Grid>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { Header, Footer } from 'interbit-ui-components'

import Account from '../containers/Account'
import Home from '../containers/Home'
import NotFoundPage from '../containers/NotFoundPage'
import InteractiveChains from '../containers/InteractiveChains'
import ExploreChain from '../containers/ExploreChain'
import CreateAccount from '../containers/CreateAcount'

import LogoAccount from '../components/LogoAccounts'
import navigation from '../constants/navigation'
import paths from '../constants/paths'
import urls from '../constants/urls'

export default class PageContainer extends Component {
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

    const redirectToSignIn = renderComponent =>
      isLoggedIn ? renderComponent : <Redirect to={paths.CREATE_ACCOUNT} />

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
      <div>
        <Header
          className="nav-main-menu"
          logo={<LogoAccount />}
          navItems={
            isLoggedIn ? navigation.headerNav : navigation.headerNavLoggedOut
          }
          textNavItems={isLoggedIn && headerTextNav}
        />

        <Grid>
          <Switch>
            <Route
              exact
              path={paths.HOME}
              render={() => <Home isLoggedIn={isLoggedIn} />}
            />
            <Route
              exact
              path={paths.CREATE_ACCOUNT}
              component={CreateAccount}
            />
            <Route
              exact
              path="/account/oauth/:oAuthProvider"
              component={Account}
            />
            <Route
              path={paths.ACCOUNT}
              render={() => redirectToSignIn(<Account {...this.props} />)}
            />
            <Route
              path={paths.BLOCK_EXPLORER}
              render={() => redirectToSignIn(<ExploreChain {...this.props} />)}
            />
            <Route
              exact
              path={paths.CHAINS}
              render={() =>
                redirectToSignIn(<InteractiveChains {...this.props} />)
              }
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

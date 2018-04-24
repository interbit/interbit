import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Navigation, Footer } from 'lib-react-interbit'

import { selectors } from 'interbit-middleware'

import Account from './containers/Account'
import Home from './containers/Home'
import NotFoundPage from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'
import ChainConnect from './containers/ChainConnect'
import CreateAccount from './containers/CreateAcount'

import LogoAccount from './components/LogoAccounts'
import { PRIVATE } from './constants/chainAliases'
import paths from './constants/paths'
import urls from './constants/urls'
import './css/App.css'

const mapStateToProps = state => {
  const chainAlias = PRIVATE
  const userName = selectors.isChainLoaded(state, { chainAlias })
    ? selectors.getChain(state, { chainAlias }).getIn(['profie', 'name'])
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

    const headerNav = [
      {
        title: 'My Account',
        eventKey: 'account'
      },
      {
        title: 'Block Explorer',
        eventKey: 'explore'
      }
    ]

    const headerNavLoggedOut = [
      {
        title: 'Create Account / Sign-in',
        eventKey: 'create-account'
      }
    ]

    const footerNav = [
      {
        title: 'Accounts',
        items: [
          {
            text: 'Your Account',
            to: paths.ACCOUNT
          },
          {
            text: 'Support',
            to: urls.APP_IB_IO_DEVELOPERS_SUPPORT
          }
        ]
      },
      {
        title: 'Services',
        items: [
          {
            text: 'Accounts',
            to: paths.HOME
          },
          {
            text: 'Store',
            to: urls.APP_STORE
          }
        ]
      }
    ]

    const footerBottomLinks = [
      {
        text: 'Privacy Policy',
        to: urls.APP_IB_IO_POLICY_PRIVACY
      },
      {
        text: 'Terms of Use',
        to: urls.APP_IB_IO_POLICY_TOS
      }
    ]

    return (
      <div className="App ibweb app-account">
        <div className="ibweb-navbar-container">
          <Grid>
            <Row>
              <Col lg={10} md={9} sm={12}>
                <Navigation
                  className="nav-main-menu"
                  logo={<LogoAccount />}
                  navItems={isLoggedIn ? headerNav : headerNavLoggedOut}
                  username={userName}
                />
              </Col>
            </Row>
          </Grid>
        </div>

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
            sections={footerNav}
            isInline
            logoUrl={urls.APP_IB_IO}
            bottomLinks={footerBottomLinks}
          />
        </Grid>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(App))

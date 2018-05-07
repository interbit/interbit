import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { Header } from 'interbit-ui-components'

import ChainConnect from '../containers/ChainConnect'
import LogoAccount from '../components/LogoAccounts'
import paths from '../constants/paths'

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
          textNavItems={isLoggedIn && headerTextNav}
          disableLogoLink
        />

        <Grid>
          <Switch>
            <Route path={paths.CONNECT} component={ChainConnect} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

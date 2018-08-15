import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { HeaderGrid } from 'interbit-ui-components'

import ChainConnect from '../containers/ChainConnect'
import Connecting from '../containers/Connecting'
import LogoAccount from '../components/LogoAccounts'
import navigation from '../constants/navigation'
import paths from '../constants/paths'

export default class PageContainer extends Component {
  static propTypes = {
    isChainLoaded: PropTypes.bool,
    isLoggedIn: PropTypes.bool
  }

  static defaultProps = {
    isChainLoaded: false,
    isLoggedIn: false
  }

  render() {
    const { isLoggedIn, isChainLoaded } = this.props

    const logo = {
      logoEl: <LogoAccount />,
      to: '/',
      isDisabled: true
    }

    return (
      <div>
        <HeaderGrid
          logo={logo}
          rightNavItems={isLoggedIn ? navigation.headerRightNav : []}
        />

        <Grid>
          <Switch>
            {isChainLoaded && (
              <Route path={paths.CONNECT} component={ChainConnect} />
            )}
            <Route component={Connecting} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

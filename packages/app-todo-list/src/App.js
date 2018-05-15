import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Header, Logo, IBIcon } from 'interbit-ui-components'
import { Switch, Route } from 'react-router-dom'

import NotFound from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'
import RequestCAuth from './containers/RequestCAuth'
import CompleteCAuth from './containers/CompleteCAuth'

import './css/App.css'
import navigation from './constants/navigation'
import paths from './constants/paths'

export default class App extends Component {
  render() {
    return (
      <div className="App ibweb app-interbit-io">
        <Header
          navItems={navigation.headerNav}
          logo={<Logo className="sm hidden-xs" />}
          logoSm={<IBIcon className="visible-xs hidden-sm" />}
        />
        <Grid>
          <Switch>
            <Route exact path={paths.HOME} component={InteractiveChains} />
            <Route exact path={paths.CHAINS} component={InteractiveChains} />
            <Route exact path={paths.CAUTH_REQUEST} component={RequestCAuth} />
            <Route
              exact
              path={paths.CAUTH_COMPLETE}
              component={CompleteCAuth}
            />
            <Route exact path={paths.CONNECT} component={CompleteCAuth} />
            <Route path={paths.BLOCK_EXPLORER} component={ExploreChain} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Navigation } from 'lib-react-interbit'
import { Switch, Route } from 'react-router-dom'

import NotFound from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'
import RequestCAuth from './containers/RequestCAuth'
import CompleteCAuth from './containers/CompleteCAuth'

import './css/App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation
          navItems={[
            {
              title: 'PRIVATE CHAIN',
              eventKey: 'chains'
            },
            {
              title: 'BLOCK EXPLORER',
              eventKey: 'explore'
            },
            {
              title: 'CONNECT TO MY PROFILE',
              eventKey: 'cauth/request'
            }
          ]}
        />
        <Grid>
          <Switch>
            <Route exact path="/" component={InteractiveChains} />
            <Route exact path="/chains" component={InteractiveChains} />
            <Route exact path="/cauth/request" component={RequestCAuth} />
            <Route exact path="/cauth/complete" component={CompleteCAuth} />
            <Route exact path="/connect" component={CompleteCAuth} />
            <Route path="/explore" component={ExploreChain} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

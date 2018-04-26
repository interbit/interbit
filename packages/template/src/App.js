import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Navigation } from 'lib-react-interbit'
import { Switch, Route } from 'react-router-dom'

import NotFound from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'

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
            }
          ]}
        />
        <Grid>
          <Switch>
            <Route exact path="/" component={InteractiveChains} />
            <Route exact path="/chains" component={InteractiveChains} />
            <Route path="/explore" component={ExploreChain} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </div>
    )
  }
}

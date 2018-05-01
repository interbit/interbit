import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { Header } from 'interbit-ui-components'
import { Switch, Route } from 'react-router-dom'

import NotFound from './containers/NotFound'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'

import profilePic from './img/profilePic.png'
import './css/App.css'

export default class App extends Component {
  render() {
    const userProfile = (
      <div className="Logged-in-user">
        <img className="Profile-pic" src={profilePic} alt="profile" />
        <span>JohnSmith</span>
      </div>
    )

    return (
      <div className="App">
        <Header
          userAlias={userProfile}
          navItems={[
            {
              text: 'INTERACTIVE CHAINS',
              to: '/chains',
              eventKey: 'chains'
            },
            {
              text: 'BLOCK EXPLORER',
              to: '/explore',
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

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { Header, Footer, Logo, IBIcon } from 'interbit-ui-components'

import constants from './constants'
import Home from './containers/Home'
import Contact from './containers/Contact'
import Platform from './containers/Platform/Platform'
import PlatformInterbitForBusiness from './containers/Platform/InterbitForBusiness'
import PlatformRoadmap from './containers/Platform/Roadmap'
import Pricing from './containers/Pricing'
import NotFound from './containers/NotFound'
import DevPageContainer from './containers/Developers/PageContainer'
import PolicyPageContainer from './containers/Policies/PageContainer'

import './css/App.css'

class App extends Component {
  render() {
    return (
      <div className="App ibweb app-interbit-io">
        <Header
          navItems={constants.navigation.headerNav}
          rightNavItems={constants.navigation.headerRightNav}
          logo={<Logo className="sm hidden-xs" />}
          logoSm={<IBIcon className="visible-xs hidden-sm" />}
        />

        <Grid>
          <Switch>
            <Route exact path={constants.paths.HOME} component={Home} />
            <Route exact path={constants.paths.CONTACT} component={Contact} />
            <Route exact path={constants.paths.PLATFORM} component={Platform} />
            <Route
              exact
              path={constants.paths.PLATFORM_INTERBIT_FOR_BUSINESS}
              component={PlatformInterbitForBusiness}
            />
            <Route
              exact
              path={constants.paths.PLATFORM_ROADMAP}
              component={PlatformRoadmap}
            />
            <Route exact path={constants.paths.PRICING} component={Pricing} />
            <Route
              path={constants.paths.DEVELOPERS}
              component={DevPageContainer}
            />
            <Route
              path={constants.paths.POLICY}
              component={PolicyPageContainer}
            />

            <Route component={NotFound} />
          </Switch>

          <Footer
            sections={constants.navigation.footerNav}
            isInline={false}
            bottomLinks={constants.navigation.footerBottomLinks}
          />
        </Grid>
      </div>
    )
  }
}

export default App

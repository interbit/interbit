import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { HeaderNav, Footer } from 'lib-react-interbit'

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
    const accountsUrl = constants.urls.APP_ACCOUNT
    const userIcon = <a href={accountsUrl}>Go to Accounts</a>

    return (
      <div className="App ibweb app-interbit-io">
        {/* TODO: move page-level classnames down to ,ibweb-page level */}
        <HeaderNav
          headerNavItems={constants.navigation.headerNav}
          account={{ userIcon }}
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
            <Route
              path={constants.paths.DEVELOPERS}
              component={DevPageContainer}
            />
            <Route
              path={constants.paths.POLICY}
              component={PolicyPageContainer}
            />
            <Route exact path={constants.paths.PRICING} component={Pricing} />

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

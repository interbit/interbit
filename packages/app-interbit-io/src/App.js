import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'react-bootstrap'
import { HeaderNav, Footer } from 'lib-react-interbit'

import constants from './constants'
import Home from './containers/Home'
import Contact from './containers/Contact'
import Platform from './containers/Platform/Platform'
import DevelopersArchitecture from './containers/Developers/Architecture'
import DevelopersExampleApps from './containers/Developers/ExampleApps'
import DevelopersOverview from './containers/Developers/Overview'
import DevelopersPlatformFeatures from './containers/Developers/PlatformFeatures'
import DevelopersResources from './containers/Developers/Resources'
import DevelopersSupport from './containers/Developers/Support'
import PlatformInterbitForBusiness from './containers/Platform/InterbitForBusiness'
import PlatformCaseStudy from './containers/Platform/CaseStudy'
import PlatformRoadmap from './containers/Platform/Roadmap'
import Pricing from './containers/Pricing'
import Privacy from './containers/Policies/Privacy'
import AcceptableUse from './containers/Policies/AcceptableUse'
import TermsOfService from './containers/Policies/TermsOfService'
import Trademark from './containers/Policies/Trademark'
import NotFound from './containers/NotFound'

import './css/App.css'

class App extends Component {
  render() {
    const accountsUrl = constants.urls.APP_ACCOUNT
    const userIcon = <a href={accountsUrl}>Go to Accounts</a>

    return (
      <div className="App ibweb">
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
              path={constants.paths.PLATFORM_CASE_STUDY}
              component={PlatformCaseStudy}
            />
            <Route
              exact
              path={constants.paths.PLATFORM_ROADMAP}
              component={PlatformRoadmap}
            />

            <Route
              exact
              path={constants.paths.DEVELOPERS}
              component={DevelopersOverview}
            />
            <Route
              exact
              path={constants.paths.DEVELOPERS_ARCHITECTURE}
              component={DevelopersArchitecture}
            />
            <Route
              exact
              path={constants.paths.DEVELOPERS_EXAMPLES}
              component={DevelopersExampleApps}
            />
            <Route
              exact
              path={constants.paths.DEVELOPERS_PLATFORM_FEATURES}
              component={DevelopersPlatformFeatures}
            />
            <Route
              exact
              path={constants.paths.DEVELOPERS_RESOURCES}
              component={DevelopersResources}
            />
            <Route
              exact
              path={constants.paths.DEVELOPERS_SUPPORT}
              component={DevelopersSupport}
            />
            <Route exact path={constants.paths.PRICING} component={Pricing} />
            <Route
              exact
              path={constants.paths.POLICY_ACCEPTABLE_USE}
              component={AcceptableUse}
            />
            <Route
              exact
              path={constants.paths.POLICY_PRIVACY}
              component={Privacy}
            />
            <Route
              exact
              path={constants.paths.POLICY_TOS}
              component={TermsOfService}
            />
            <Route
              exact
              path={constants.paths.POLICY_TRADEMARK}
              component={Trademark}
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

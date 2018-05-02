import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { LaunchPadRow, Sidebar } from 'interbit-ui-components'

import Architecture from './Architecture'
import ExampleApps from './ExampleApps'
import PlatformFeatures from './PlatformFeatures'
import Resources from './Resources'
import Overview from './Overview'
import Support from './Support'
import constants from '../../constants'

const mapStateToProps = state => ({
  launchPads: state.content.developers.launchPads,
  sidebarNav: state.content.developers.sidebar
})

class DevContainer extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { launchPads, sidebarNav } = this.props
    return (
      <div>
        <LaunchPadRow buttonLinks={launchPads} />
        <Row>
          <Col lg={2} md={12}>
            <Sidebar contents={sidebarNav} />
          </Col>
          <Col lg={8} md={12}>
            <Switch>
              <Route
                exact
                path={constants.paths.DEVELOPERS}
                component={Overview}
              />
              <Route
                exact
                path={constants.paths.DEVELOPERS_ARCHITECTURE}
                component={Architecture}
              />
              <Route
                exact
                path={constants.paths.DEVELOPERS_EXAMPLES}
                component={ExampleApps}
              />
              <Route
                exact
                path={constants.paths.DEVELOPERS_PLATFORM_FEATURES}
                component={PlatformFeatures}
              />
              <Route
                exact
                path={constants.paths.DEVELOPERS_RESOURCES}
                component={Resources}
              />
              <Route
                exact
                path={constants.paths.DEVELOPERS_SUPPORT}
                component={Support}
              />
            </Switch>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevContainer)

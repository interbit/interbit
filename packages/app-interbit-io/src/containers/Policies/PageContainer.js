import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { Sidebar } from 'interbit-ui-components'

import AcceptableUse from './AcceptableUse'
import Privacy from './Privacy'
import TermsOfService from './TermsOfService'
import Trademark from './Trademark'
import constants from '../../constants'

const mapStateToProps = state => ({
  sidebarNav: state.content.policies.sidebar
})

class DevContainer extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { sidebarNav } = this.props
    return (
      <Row className="ibweb-page policy">
        <Col lg={2} md={12}>
          <Sidebar contents={sidebarNav} />
        </Col>
        <Col lg={8} md={12}>
          <Switch>
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
          </Switch>
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps)(DevContainer)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Col, Row, Nav, NavItem, Tab } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Helmet from 'react-helmet'

import TabPanel from './TabPanel'

// @connect(
//   state => ({
//     path: state.routing.locationBeforeTransitions.pathname
//   }),
//   {}
// )

/**
 * Renders a list of tabs
 */
export default class Layout extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        eventKey: PropTypes.string,
        content: PropTypes.node
      })
    ).isRequired
  }

  render() {
    const { path, heading, tabs } = this.props
    const defaultActiveKey = path.substring(1)
    const baseUrl = ''
    return (
      <div>
        <TabPanel heading={heading} />
        <Tab.Container id="app-tabs" defaultActiveKey={defaultActiveKey}>
          <Row className="clearfix">
            <Col xs={12} sm={3} lg={2}>
              <Nav bsStyle="pills" stacked>
                {tabs.map(t => (
                  <LinkContainer
                    key={t.eventKey}
                    to={`${baseUrl}/${t.eventKey}`}>
                    <NavItem eventKey={t.eventKey}>{t.title}</NavItem>
                  </LinkContainer>
                ))}
              </Nav>
            </Col>
            <Col xs={12} sm={9} lg={10}>
              <Tab.Content animation={false} mountOnEnter unmountOnExit>
                {tabs.map(t => (
                  <Tab.Pane key={t.eventKey} eventKey={t.eventKey}>
                    <Helmet title={t.title} />
                    {t.content}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

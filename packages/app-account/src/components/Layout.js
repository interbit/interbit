import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Layout extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        eventKey: PropTypes.string
      })
    ).isRequired,
    component: PropTypes.element.isRequired
  }

  render() {
    const { tabs, component } = this.props

    return (
      <Grid>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={tabs[0].eventKey}>
          <Row className="clearfix">
            <Col sm={3} lg={2} className="Account-sidebar">
              <h4>Account</h4>
              <Nav bsStyle="pills" stacked>
                {tabs.map(navItem => (
                  <LinkContainer
                    key={navItem.eventKey}
                    to={`/${navItem.eventKey}`}>
                    <NavItem eventKey={navItem.eventKey}>
                      {navItem.title}
                    </NavItem>
                  </LinkContainer>
                ))}
              </Nav>
            </Col>
            <Col sm={9} lg={10}>
              <Tab.Content animation>
                {tabs.map(navItem => (
                  <Tab.Pane key={navItem.eventKey} eventKey={navItem.eventKey}>
                    {component}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Grid>
    )
  }
}

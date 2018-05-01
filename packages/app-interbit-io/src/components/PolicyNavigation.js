import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { SideBarNav } from 'interbit-ui-components'
import Navigation from './Navigation'

export default class PolicyNavigation extends Component {
  static propTypes = {
    sideBar: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            to: PropTypes.string
          })
        ).isRequired
      })
    ),
    component: PropTypes.element
  }

  static defaultProps = {
    sideBar: [],
    component: <div />
  }

  render() {
    const { sideBar, component } = this.props

    const policyNavigation = (
      <Row>
        <Col lg={2} md={12}>
          <SideBarNav contents={sideBar} />
        </Col>
        <Col lg={8} md={12}>
          {component}
        </Col>
      </Row>
    )

    return (
      <Navigation
        container={policyNavigation}
        className="app-interbit-io policy"
      />
    )
  }
}

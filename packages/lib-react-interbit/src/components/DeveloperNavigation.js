import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

import LaunchPadRow from '../components/UIKit/LaunchPadRow'
import SideBarNav from './UIKit/SideBarNav'

export default class DeveloperNavigation extends Component {
  static propTypes = {
    launchPads: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        to: PropTypes.string
      })
    ),
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
    launchPads: [],
    sideBar: [],
    component: <div />
  }

  render() {
    const { launchPads, sideBar, component } = this.props
    return (
      <div>
        <LaunchPadRow buttonLinks={launchPads} />
        <Row>
          <Col lg={2} md={12}>
            <SideBarNav contents={sideBar} />
          </Col>
          <Col lg={8} md={12}>
            {component}
          </Col>
        </Row>
      </div>
    )
  }
}

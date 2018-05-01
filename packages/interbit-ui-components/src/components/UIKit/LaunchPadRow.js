import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import LaunchPad from './LaunchPad'

export default class LaunchPadRow extends Component {
  static propTypes = {
    buttonLinks: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        to: PropTypes.string,
        clickHandler: PropTypes.func
      })
    )
  }

  static defaultProps = {
    buttonLinks: []
  }

  render() {
    const { buttonLinks } = this.props
    return (
      <Row className="ibweb-launchpad-row">
        <Row>
          <Col lg={2} md={0} />
          <Col lg={4} md={6}>
            <LaunchPad {...buttonLinks[0]} />
          </Col>
          <Col lg={4} md={6}>
            <LaunchPad {...buttonLinks[1]} />
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={0} />
          <Col lg={4} md={6}>
            <LaunchPad {...buttonLinks[2]} />
          </Col>
          <Col lg={4} md={6}>
            <LaunchPad {...buttonLinks[3]} />
          </Col>
        </Row>
      </Row>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'

import SlackIcon from './Icons/SlackIcon'

export default class LinkBarSlack extends Component {
  static propTypes = {
    to: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    to: '#',
    className: ''
  }

  render() {
    const { to, className } = this.props
    return (
      <a
        href={to}
        className={`ibweb-link-bar slack ${className}`}
        target="_blank">
        <Media>
          <Media.Left>
            <SlackIcon />
          </Media.Left>
          <Media.Body>
            <h3>Join our Slack community for support</h3>
            <p>
              Get access to Interbit developers for technical discussions,
              questions, and issues relating to developing Interbit-powered
              apps.
            </p>
          </Media.Body>
        </Media>
      </a>
    )
  }
}

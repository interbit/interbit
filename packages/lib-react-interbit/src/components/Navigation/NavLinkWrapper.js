import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavItem } from 'react-bootstrap'

export default class NavLinkWrapper extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    eventKey: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { to, text, className, eventKey } = this.props
    const isExternalLink = /^https?:\/\//.test(to)

    return isExternalLink ? (
      <NavItem href={to} className={className} eventKey={eventKey}>
        {text}
      </NavItem>
    ) : (
      <li role="presentation">
        <NavLink to={to} className={className}>
          {text}
        </NavLink>
      </li>
    )
  }
}

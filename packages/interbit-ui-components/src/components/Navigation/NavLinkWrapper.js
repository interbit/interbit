import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavItem } from 'react-bootstrap'

export default class NavLinkWrapper extends Component {
  static propTypes = {
    to: PropTypes.string,
    text: PropTypes.string.isRequired,
    eventKey: PropTypes.string.isRequired,
    className: PropTypes.string,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    to: '#',
    isDisabled: false
  }

  render() {
    const { to, text, className, eventKey, isDisabled } = this.props
    const isExternalLink = /^https?:\/\//.test(to)

    return isExternalLink || isDisabled ? (
      <NavItem
        href={to}
        className={className}
        eventKey={eventKey}
        disabled={isDisabled}>
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

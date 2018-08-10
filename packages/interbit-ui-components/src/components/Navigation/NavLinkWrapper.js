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
    id: PropTypes.string,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    id: '',
    to: '#',
    isDisabled: false
  }

  render() {
    const { to, text, className, id, eventKey, isDisabled } = this.props
    const isExternalLink = /^https?:\/\//.test(to)

    return isExternalLink || isDisabled ? (
      <NavItem
        href={to}
        className={className}
        id={id}
        eventKey={eventKey}
        disabled={isDisabled}>
        {text}
      </NavItem>
    ) : (
      <li role="presentation">
        <NavLink to={to} className={className} id={id}>
          {text}
        </NavLink>
      </li>
    )
  }
}

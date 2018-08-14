import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink, matchPath } from 'react-router-dom'
import { NavItem } from 'react-bootstrap'

export default class NavLinkWrapper extends Component {
  static propTypes = {
    to: PropTypes.string,
    text: PropTypes.string.isRequired,
    eventKey: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    location: PropTypes.shape({})
  }

  static defaultProps = {
    className: '',
    id: '',
    to: '#',
    isDisabled: false,
    location: {}
  }

  render() {
    const {
      to,
      text,
      className,
      id,
      eventKey,
      isDisabled,
      location
    } = this.props

    const isExternalLink = /^https?:\/\//.test(to)
    const match = matchPath(location.pathname, {
      path: to,
      exact: true
    })
    const isActive = match && match.isExact

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
        <NavLink
          to={to}
          className={className + (isActive && ` active`)}
          id={id}
          match={match}>
          {text}
        </NavLink>
      </li>
    )
  }
}

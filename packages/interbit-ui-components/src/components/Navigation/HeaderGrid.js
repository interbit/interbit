import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'

export default class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    logo: PropTypes.shape({
      logoEl: PropTypes.element,
      to: PropTypes.string,
      isDisabled: PropTypes.bool
    }),
    leftNavItems: PropTypes.arrayOf(
      PropTypes.shape({
        eventKey: PropTypes.string,
        to: PropTypes.string,
        text: PropTypes.string,
        isHidden: PropTypes.bool
      })
    ),
    rightNavItems: PropTypes.arrayOf(
      PropTypes.shape({
        eventKey: PropTypes.string,
        to: PropTypes.string,
        text: PropTypes.string,
        isHidden: PropTypes.bool,
        className: PropTypes.string,
        id: PropTypes.string
      })
    )
  }

  static defaultProps = {
    className: '',
    logo: {
      logoEl: <Logo className="sm hidden-xs" />,
      to: '',
      isDisabled: false
    },
    leftNavItems: [],
    rightNavItems: []
  }

  render() {
    const { leftNavItems, rightNavItems, logo, className } = this.props

    return (
      <div className={`ibweb-header ${className}`}>
        <div className="grid-cont">
          <div className="logo">
            {logo.isDisabled ? (
              /* TODO: adjust wordmark visibility based on new grid widths */
              logo.logoEl
            ) : (
              <LinkWrapper to={logo.to}>{logo.logoEl}</LinkWrapper>
            )}
          </div>

          <Nav className="left-navbar">
            {leftNavItems.map(
              navItem =>
                !navItem.isHidden && (
                  <NavLinkWrapper key={navItem.eventKey} {...navItem} />
                )
            )}
          </Nav>

          <Nav className="right-navbar">
            {rightNavItems.map(
              navItem =>
                !navItem.isHidden && (
                  <NavLinkWrapper key={navItem.eventKey} {...navItem} />
                )
            )}
          </Nav>
        </div>
      </div>
    )
  }
}

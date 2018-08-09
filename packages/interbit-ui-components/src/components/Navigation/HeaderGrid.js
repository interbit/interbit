import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav, Navbar } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'

export default class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
    logo: PropTypes.shape({
      logoLg: PropTypes.element,
      logoSm: PropTypes.element,
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
      logoLg: <Logo className="sm hidden-xs" />,
      logoSm: <div />,
      to: '',
      isDisabled: false
    },
    leftNavItems: [],
    rightNavItems: []
  }

  render() {
    const { leftNavItems, rightNavItems, logo, className } = this.props

    // TODO: adjust visibility based on new grid widths
    const logoMarkup = (
      <div>
        {logo.logoLg}
        {logo.logoSm}
      </div>
    )

    return (
      <div className={`ibweb-header ${className}`}>
        <div className="grid-cont">
          <div className="logo">
            {logo.isDisabled ? (
              logoMarkup
            ) : (
              <LinkWrapper to={logo.to}>{logoMarkup}</LinkWrapper>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'

export default class HeaderGrid extends Component {
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
    ),
    location: PropTypes.shape({})
  }

  static defaultProps = {
    className: '',
    logo: {
      logoEl: <Logo className="sm hidden-xs" />,
      to: '',
      isDisabled: false
    },
    leftNavItems: [],
    rightNavItems: [],
    location: {}
  }

  render() {
    const {
      leftNavItems,
      rightNavItems,
      logo,
      className,
      location
    } = this.props

    return (
      <div className={`ibweb-header ${className}`}>
        <div className="grid-cont">
          <div className="logo">
            {logo.isDisabled ? (
              logo.logoEl
            ) : (
              <LinkWrapper to={logo.to}>{logo.logoEl}</LinkWrapper>
            )}
          </div>

          <Nav className="left-navbar">
            {leftNavItems.map(
              navItem =>
                !navItem.isHidden && (
                  <NavLinkWrapper
                    key={navItem.eventKey}
                    {...navItem}
                    location={location}
                  />
                )
            )}
          </Nav>

          <Nav className="right-navbar">
            {rightNavItems.map(
              navItem =>
                !navItem.isHidden && (
                  <NavLinkWrapper
                    key={navItem.eventKey}
                    {...navItem}
                    location={location}
                  />
                )
            )}
          </Nav>
        </div>
      </div>
    )
  }
}

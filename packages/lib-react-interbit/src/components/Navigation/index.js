import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavWrap from '../NavWrap'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'

export default class Navigation extends Component {
  static propTypes = {
    navItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        eventKey: PropTypes.string,
        to: PropTypes.string,
        isHidden: PropTypes.bool
      })
    ),
    logo: PropTypes.element,
    logoUrl: PropTypes.string,
    username: PropTypes.string
  }

  static defaultProps = {
    navItems: [],
    logo: <Logo className="sm" />,
    logoUrl: '/',
    username: ''
  }

  render() {
    const { navItems, logo, logoUrl, username } = this.props

    const renderNavItem = navItem => {
      if (navItem.to) {
        return (
          <NavWrap key={navItem.eventKey} className="Nav-link">
            <a href={navItem.to}>{navItem.title}</a>
          </NavWrap>
        )
      }

      return (
        <LinkContainer to={`/${navItem.eventKey}`} key={navItem.eventKey}>
          <NavItem className="Nav-link" eventKey={navItem.eventKey} href="#">
            {navItem.title}
          </NavItem>
        </LinkContainer>
      )
    }

    return (
      <Navbar collapseOnSelect className="ibweb-navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <LinkWrapper to={logoUrl}>{logo}</LinkWrapper>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="Nav-group nav-main-menu">
            {navItems.map(
              navItem => !navItem.isHidden && renderNavItem(navItem)
            )}
          </Nav>
          {username && (
            <div className="username">
              {username} <span>(Signed in)</span>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

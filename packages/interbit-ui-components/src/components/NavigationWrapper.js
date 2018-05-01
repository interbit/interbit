import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import NavWrap from './NavWrap'
import Footer from './Footer'
import Logo from './UIKit/Logo'
import IBIcon from './UIKit/IBIcon'

export default class NavigationWrapper extends Component {
  static propTypes = {
    account: PropTypes.shape({
      userIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      to: PropTypes.string,
      logout: PropTypes.string
    }),
    headerNavItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        eventKey: PropTypes.string,
        to: PropTypes.string,
        isHidden: PropTypes.bool
      })
    ),
    footerNavItems: PropTypes.arrayOf(PropTypes.shape({})), // TODO: Define the shape
    footerBottomLinks: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        text: PropTypes.string
      })
    ),
    container: PropTypes.element.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    account: {
      userIcon: '',
      accountTo: '#',
      logout: '#'
    },
    headerNavItems: [],
    footerNavItems: [],
    footerBottomLinks: [],
    className: ''
  }

  render() {
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

    const {
      container,
      headerNavItems,
      footerNavItems,
      footerBottomLinks,
      account,
      className
    } = this.props

    return (
      <div className={`ibweb ${className}`}>
        <div className="ibweb-navbar-container">
          <Grid>
            <Row>
              <Col lg={10} md={9} sm={12}>
                <Navbar collapseOnSelect className="ibweb-navbar">
                  <Navbar.Header>
                    <Navbar.Brand>
                      <a href="/">
                        <Logo className="sm hidden-xs" />
                        <IBIcon className="visible-xs hidden-sm" />
                      </a>
                    </Navbar.Brand>
                  </Navbar.Header>
                  <Nav className="nav-main-menu">
                    {headerNavItems.map(
                      navItem => !navItem.isHidden && renderNavItem(navItem)
                    )}
                  </Nav>
                </Navbar>
              </Col>
              <Col lg={2} md={3} sm={12} className="accounts-link">
                {account.userIcon}
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid className="ibweb-container">
          {container}
          {footerNavItems && (
            <Footer sections={footerNavItems} bottomLinks={footerBottomLinks} />
          )}
        </Grid>
      </div>
    )
  }
}

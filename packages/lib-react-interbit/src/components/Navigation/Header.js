// Header component for app-interbit.io
// TODO: refactor and combine with other apps' header nav

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Navbar, Nav } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'
import IBIcon from '../UIKit/IBIcon'

export default class Header extends Component {
  static propTypes = {
    navItems: PropTypes.arrayOf(
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
        isHidden: PropTypes.bool
      })
    ),
    className: PropTypes.string
  }

  static defaultProps = {
    navItems: [],
    rightNavItems: [],
    className: ''
  }

  render() {
    const { navItems, rightNavItems, className } = this.props

    return (
      <div className={`ibweb-navbar-container ${className}`}>
        <Grid>
          <Row>
            <Col lg={10} md={9} sm={12}>
              <Navbar collapseOnSelect className="ibweb-navbar">
                <Navbar.Header>
                  <Navbar.Brand>
                    <LinkWrapper to="/">
                      <Logo className="sm hidden-xs" />
                      <IBIcon className="visible-xs hidden-sm" />
                    </LinkWrapper>
                  </Navbar.Brand>
                </Navbar.Header>

                <Nav className="nav-main-menu">
                  {!!navItems.length &&
                    navItems.map(
                      navItem =>
                        !navItem.isHidden && (
                          <NavLinkWrapper key={navItem.eventKey} {...navItem} />
                        )
                    )}
                </Nav>

                <Nav pullRight>
                  {!!rightNavItems.length &&
                    rightNavItems.map(
                      navItem =>
                        !navItem.isHidden && (
                          <NavLinkWrapper key={navItem.eventKey} {...navItem} />
                        )
                    )}
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

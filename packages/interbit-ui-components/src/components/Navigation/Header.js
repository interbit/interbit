import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Navbar, Nav, NavItem } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'

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
    textNavItems: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.element,
        key: PropTypes.string
      })
    ),
    logo: PropTypes.element,
    logoSm: PropTypes.element,
    logoUrl: PropTypes.string,
    disableLogoLink: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    navItems: [],
    rightNavItems: [],
    textNavItems: [],
    logo: <Logo className="sm hidden-xs" />,
    logoSm: <div />,
    logoUrl: '/',
    disableLogoLink: false,
    className: ''
  }

  render() {
    const {
      navItems,
      rightNavItems,
      textNavItems,
      logo,
      logoSm,
      logoUrl,
      disableLogoLink,
      className
    } = this.props

    return (
      <div className={`ibweb-navbar-container ${className}`}>
        <Grid>
          <Row>
            <Col lg={10} md={9} sm={12}>
              <Navbar collapseOnSelect className="ibweb-navbar">
                <Navbar.Header>
                  <Navbar.Brand>
                    {disableLogoLink ? (
                      <div>
                        {logo}
                        {logoSm}
                      </div>
                    ) : (
                      <LinkWrapper to={logoUrl}>
                        {logo}
                        {logoSm}
                      </LinkWrapper>
                    )}
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

                <Nav className="nav-right-menu" pullRight>
                  {!!rightNavItems.length &&
                    rightNavItems.map(
                      navItem =>
                        !navItem.isHidden && (
                          <NavLinkWrapper key={navItem.eventKey} {...navItem} />
                        )
                    )}

                  {!!textNavItems.length &&
                    textNavItems.map(navItem => (
                      <NavItem key={navItem.key} disabled>
                        {navItem.content}
                      </NavItem>
                    ))}
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

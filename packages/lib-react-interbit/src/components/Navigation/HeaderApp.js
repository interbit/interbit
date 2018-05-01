import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Navbar, Nav } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import LinkWrapper from '../UIKit/LinkWrapper'
import Logo from '../UIKit/Logo'

export default class HeaderApp extends Component {
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
    logo: PropTypes.element,
    logoUrl: PropTypes.string,
    username: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    navItems: [],
    rightNavItems: [],
    logo: <Logo className="sm" />,
    logoUrl: '/',
    username: '',
    className: ''
  }

  render() {
    const {
      navItems,
      rightNavItems,
      logo,
      logoUrl,
      username,
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
                    <LinkWrapper to={logoUrl}>{logo}</LinkWrapper>
                  </Navbar.Brand>
                </Navbar.Header>

                <Nav className="Nav-group nav-main-menu">
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

                {username && (
                  <div className="username">
                    {username} <span>(Signed in)</span>
                  </div>
                )}
              </Navbar>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

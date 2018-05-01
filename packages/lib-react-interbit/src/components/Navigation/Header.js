// Header component for app-interbit.io
// TODO: refactor and combine with other apps' header nav

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Navbar, Nav } from 'react-bootstrap'

import NavLinkWrapper from './NavLinkWrapper'
import Logo from '../UIKit/Logo'
import IBIcon from '../UIKit/IBIcon'

export default class Header extends Component {
  static propTypes = {
    headerNavItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        eventKey: PropTypes.string,
        to: PropTypes.string,
        text: PropTypes.string,
        isHidden: PropTypes.bool
      })
    ),
    headerRightNavItems: PropTypes.arrayOf(
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
    headerNavItems: [],
    headerRightNavItems: [],
    className: ''
  }

  render() {
    const { headerNavItems, headerRightNavItems, className } = this.props

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
                    {!!headerNavItems.length &&
                      headerNavItems.map(
                        navItem =>
                          !navItem.isHidden && (
                            <NavLinkWrapper
                              key={navItem.eventKey}
                              {...navItem}
                            />
                          )
                      )}
                  </Nav>

                  <Nav pullRight>
                    {!!headerRightNavItems.length &&
                      headerRightNavItems.map(
                        navItem =>
                          !navItem.isHidden && (
                            <NavLinkWrapper
                              key={navItem.eventKey}
                              {...navItem}
                            />
                          )
                      )}
                  </Nav>
                </Navbar>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Col,
  Grid,
  Image,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap'

// import config from 'config'
// import * as reduxAppModule from '../../redux/modules/app'
// @connect(
//   state => ({
//     chainId: state.chain.params.chainId,
//     githubBaseUrl: config.get('identity.oAuth.gitHub.baseURL'),
//     githubClientId: config.get('identity.oAuth.gitHub.client'),
//     githubScope: config.get('identity.oAuth.gitHub.scope'),
//     isConnected: !!state.chain.state.app.chainMetadata
//   }),
//   {
//     doShowAbout: reduxAppModule.showAbout,
//     doShowProfile: reduxAppModule.showProfile
//   }
// )

export default class TabPanel extends Component {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    styles: PropTypes.objectOf(PropTypes.string).isRequired,
    logoSrc: PropTypes.string.isRequired,
    // eslint-disable-next-line
    children: PropTypes.node, // .isRequired,
    chainId: PropTypes.string,
    githubBaseUrl: PropTypes.string.isRequired,
    githubClientId: PropTypes.string,
    githubScope: PropTypes.string,
    isConnected: PropTypes.bool.isRequired,
    doShowAbout: PropTypes.func.isRequired,
    doShowProfile: PropTypes.func.isRequired
  }

  static defaultProps = {
    chainId: null,
    githubClientId: null,
    githubScope: ''
  }

  handleShowAbout = () => this.props.doShowAbout()

  handleShowProfile = () => this.props.doShowProfile()

  handleAuthenticate = () => this.doAuthenticate()

  doAuthenticate = () => {
    const {
      isConnected,
      chainId,
      githubBaseUrl,
      githubClientId,
      githubScope
    } = this.props
    if (isConnected) {
      console.log('Authenticating to Github')

      // Encode chain ID and redirect URL in the state
      // TODO: Encrypt the state using the identity chain Public Key
      const encodeState = () => {
        const statePayload = {
          chainId,
          nextUrl: window.location.href
        }
        return Buffer.from(JSON.stringify(statePayload)).toString('base64')
      }

      const params = {
        client_id: githubClientId,
        allow_signup: 'false',
        state: encodeState(),
        scope: githubScope
      }
      const queryString = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')

      const githubAuthUrl = `${githubBaseUrl}?${queryString}`

      console.log(`Redirecting to ${githubAuthUrl}`)
      window.location = githubAuthUrl
    }
  }

  renderUserMenu(styles) {
    const title = <i className="fa fa-user-o" />
    return (
      <NavDropdown
        title={title}
        id="nav-dropdown"
        className={styles.dropdownDir}>
        <MenuItem onClick={this.handleAuthenticate}>
          <i className={`${styles.menuitem_icon} fa fa-github`} /> Authenticate
        </MenuItem>
        <MenuItem onClick={this.handleShowProfile}>
          <i className={`${styles.menuitem_icon} fa fa-user-o`} /> Profile
        </MenuItem>
        <MenuItem onClick={this.handleShowAbout}>
          <i className={`${styles.menuitem_icon} fa fa-info-circle`} /> About
        </MenuItem>
      </NavDropdown>
    )
  }

  render() {
    const { styles, heading, logoSrc } = this.props

    return (
      <div>
        <Navbar fluid className={styles.tabNav}>
          <Col xs={2} sm={2}>
            <Navbar.Header>
              <Image
                src={logoSrc}
                alt="interbit"
                className={styles.interbitBranding}
              />
            </Navbar.Header>
          </Col>
          <Col xs={9} sm={9}>
            <h1>{heading}</h1>
          </Col>
          <Col xs={1} sm={1}>
            <Nav navbar pullRight>
              {this.renderUserMenu(styles)}
            </Nav>
          </Col>
        </Navbar>
        <Grid fluid>{this.props.children}</Grid>
      </div>
    )
  }
}

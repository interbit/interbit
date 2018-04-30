// TODO: Remove this component. The Sign In and Create Account pages are now one and the same
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { chainDispatch } from 'interbit-ui-tools'

import Authentication from '../components/Authentication'
import { getOAuthConfig } from '../interbit/public/selectors'
import { getExploreChainState } from '../redux/exploreChainReducer'
import { PUBLIC, PRIVATE } from '../constants/chainAliases'

const mapStateToProps = state => {
  const { state: chainState } = getExploreChainState(state)
  if (!chainState) {
    return {
      oAuthConfig: {},
      blockchainDispatch: () => {}
    }
  }

  const { state: publicChainState } = getExploreChainState(state, PUBLIC)
  return {
    oAuthConfig: getOAuthConfig(publicChainState)
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action))
})

export class SignIn extends Component {
  static propTypes = {
    // eslint-disable-next-line
    oAuthConfig: PropTypes.object,
    blockchainDispatch: PropTypes.func
  }

  static defaultProps = {
    oAuthConfig: {},
    blockchainDispatch: () => {}
  }

  render() {
    const { oAuthConfig, blockchainDispatch } = this.props

    return (
      <Grid>
        <div className="ibweb-page">
          <Row>
            <Col md={2} />
            <Col md={8}>
              <h1>Sign into your account.</h1>
              <div className="ibweb-intro">
                <p>
                  Sign in with a link sent to your email (no passwordz), or use
                  an authentication provider (Github), sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitaliquip ex ea commodo consequat.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <Authentication
                oAuthConfig={oAuthConfig}
                blockchainDispatch={blockchainDispatch}
              />
            </Col>
          </Row>
        </div>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

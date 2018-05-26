// TODO: Remove this component. The Sign In and Create Account pages are now one and the same
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { chainDispatch, selectors } from 'interbit-ui-tools'

import Authentication from '../components/Authentication'
import { getOAuthConfig } from '../interbit/public/selectors'
import { PUBLIC, PRIVATE } from '../constants/chainAliases'
import oAuthProviders from '../constants/oAuthProviders'

const mapStateToProps = state => {
  const chainState = selectors.getChain(state, { chainAlias: PRIVATE })
  if (!chainState) {
    return {
      contentBars: state.content.contentBars
    }
  }

  const publicChainState = selectors.getChain(state, { chainAlias: PUBLIC })
  return {
    publicKey: selectors.getPublicKey(state),
    consumerChainId: selectors.getChainId(state, { chainAlias: PRIVATE }),
    oAuthConfig: getOAuthConfig(publicChainState),
    contentBars: state.content.contentBars
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action))
})

export class SignIn extends Component {
  static propTypes = {
    consumerChainId: PropTypes.string,
    oAuthConfig: PropTypes.shape({}),
    publicKey: PropTypes.string,
    blockchainDispatch: PropTypes.func,
    contentBars: PropTypes.shape({})
  }

  static defaultProps = {
    consumerChainId: '',
    oAuthConfig: {},
    publicKey: undefined,
    blockchainDispatch: () => {},
    contentBars: {}
  }

  render() {
    const {
      consumerChainId,
      oAuthConfig,
      publicKey,
      blockchainDispatch,
      contentBars
    } = this.props

    const oAuthProps = {
      blockchainDispatch,
      consumerChainId,
      oAuthConfig,
      oAuthProvider: oAuthProviders.GITHUB,
      publicKey
    }

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
                oAuth={oAuthProps}
                {...contentBars.gitHubCreateAccount}
              />
            </Col>
          </Row>
        </div>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

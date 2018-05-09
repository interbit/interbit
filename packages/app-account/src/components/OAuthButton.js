/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import uuid from 'uuid'
import { IconButton } from 'interbit-ui-components'
import { actionCreators } from '../interbit/my-account'

const authenticationHandler = ({
  consumerChainId,
  oAuthProvider,
  oAuthConfig,
  blockchainDispatch
}) => async () => {
  const providerConfig = oAuthConfig[oAuthProvider] || {}
  const { serviceEndPoint, params } = providerConfig

  console.log(oAuthProvider, oAuthConfig)

  if (serviceEndPoint) {
    const queryOpts = { ...params, state: consumerChainId }
    const queryParams = queryString.stringify(queryOpts)

    const connectUrl = `${serviceEndPoint}?${queryParams}`
    const action = actionCreators.startAuthentication({
      oAuthProvider,
      requestId: consumerChainId
    })
    await blockchainDispatch(action)
    window.location = connectUrl
  }
}

export default class OAuthButton extends Component {
  static propTypes = {
    consumerChainId: PropTypes.string,
    oAuthProvider: PropTypes.string,
    // eslint-disable-next-line
    oAuthConfig: PropTypes.object,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string,
    blockchainDispatch: PropTypes.func
  }

  static defaultProps = {
    consumerChainId: '',
    oAuthProvider: 'gitHub',
    oAuthConfig: {},
    icon: '',
    image: '',
    className: '',
    blockchainDispatch: () => {}
  }

  render() {
    const {
      icon,
      text,
      image,
      className,
      consumerChainId,
      oAuthProvider,
      oAuthConfig,
      blockchainDispatch
    } = this.props

    return (
      <IconButton
        onClick={authenticationHandler({
          consumerChainId,
          oAuthProvider,
          oAuthConfig,
          blockchainDispatch
        })}
        icon={icon}
        text={text}
        image={image}
        className={className}
      />
    )
  }
}

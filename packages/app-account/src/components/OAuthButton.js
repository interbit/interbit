/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import uuid from 'uuid'
import amplitude from 'amplitude-js'
import { IconButton } from 'interbit-ui-components'
import { queryParams } from 'interbit-ui-tools'
import { actionCreators } from '../interbit/my-account'

const authenticationHandler = ({
  oAuth: {
    blockChainDispatch,
    consumerChainId,
    oAuthConfig,
    oAuthProvider,
    publicKey,
    redirectUrl = window.location.href
  } = {}
}) => async () => {
  const providerConfig = oAuthConfig[oAuthProvider] || {}
  const { serviceEndPoint, params } = providerConfig

  console.log(oAuthProvider, providerConfig)
  amplitude.getInstance().logEvent('INITIATE_GITHUB_OAUTH')

  if (serviceEndPoint && blockChainDispatch) {
    const requestId = uuid.v4()
    const state = queryParams.packState({
      requestId,
      consumerChainId,
      publicKey,
      redirectUrl
    })
    const oAuthQueryParams = queryString.stringify({ ...params, state })

    const connectUrl = `${serviceEndPoint}?${oAuthQueryParams}`
    const action = actionCreators.startAuthentication({
      oAuthProvider,
      requestId
    })
    await blockChainDispatch(action)
    window.location = connectUrl
  }
}

export default class OAuthButton extends Component {
  static propTypes = {
    oAuth: PropTypes.shape({}),
    text: PropTypes.string.isRequired,
    icon: PropTypes.string,
    image: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    oAuth: {},
    icon: '',
    image: '',
    className: ''
  }

  render() {
    const { icon, text, image, className, oAuth, ...rest } = this.props

    return (
      <IconButton
        clickHandler={authenticationHandler({
          oAuth
        })}
        icon={icon}
        text={text}
        image={image}
        className={className}
        {...rest}
      />
    )
  }
}

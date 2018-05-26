/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import uuid from 'uuid'
import amplitude from 'amplitude-js'
import { IconButton } from 'interbit-ui-components'
import { actionCreators } from '../interbit/my-account'

const authenticationHandler = ({
  oAuth: {
    consumerChainId,
    blockChainDispatch,
    oAuthConfig,
    oAuthProvider
  } = {}
}) => async () => {
  const providerConfig = oAuthConfig[oAuthProvider] || {}
  const { serviceEndPoint, params } = providerConfig

  console.log(oAuthProvider, providerConfig)
  amplitude.getInstance().logEvent('INITIATE_GITHUB_OAUTH')

  if (serviceEndPoint && blockChainDispatch) {
    const queryOpts = { ...params, state: consumerChainId }
    const queryParams = queryString.stringify(queryOpts)

    const connectUrl = `${serviceEndPoint}?${queryParams}`
    const action = actionCreators.startAuthentication({
      oAuthProvider,
      requestId: consumerChainId
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

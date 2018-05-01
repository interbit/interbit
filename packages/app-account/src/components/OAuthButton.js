/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import queryString from 'query-string'
// import uuid from 'uuid'
import { IconButton } from 'interbit-ui-components'

import { generateChainTemplate } from 'interbit-ui-tools'

// const authenticationHandler = ({
//   oAuthProvider,
//   oAuthConfig,
//   blockchainDispatch
// }) => async () => {
//   const providerConfig = oAuthConfig[oAuthProvider] || {}
//   const { serviceEndPoint, params } = providerConfig

//   console.log(oAuthProvider, oAuthConfig)

//   if (serviceEndPoint) {
//     const requestId = uuid.v4()
//     const queryOpts = { ...params, state: requestId }
//     const queryParams = queryString.stringify(queryOpts)

//     const connectUrl = `${serviceEndPoint}?${queryParams}`
//     // const action = actionCreators.startAuthentication({
//     //   oAuthProvider,
//     //   requestId
//     // })
//     // await blockchainDispatch(action)
//     // window.location = connectUrl
//     const sponsorAction = reducer.generateChainTemplate(PRIVATE)
//   }
// }

export default class OAuthButton extends Component {
  static propTypes = {
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
      oAuthProvider,
      oAuthConfig,
      blockchainDispatch
    } = this.props

    return (
      <IconButton
        // onClick={authenticationHandler({
        //   oAuthProvider,
        //   oAuthConfig,
        //   blockchainDispatch
        // })}
        icon={icon}
        text={text}
        image={image}
        className={className}
      />
    )
  }
}

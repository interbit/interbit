import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContentBar, Divider } from 'lib-react-interbit'

import OAuthButton from './OAuthButton'

export default class Authentication extends Component {
  static propTypes = {
    // eslint-disable-next-line
    oAuthConfig: PropTypes.object,
    blockchainDispatch: PropTypes.func,
    sponsorChainDispatch: PropTypes.func,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    content: PropTypes.string
    // error: PropTypes.string
  }

  static defaultProps = {
    oAuthConfig: {},
    blockchainDispatch: () => {},
    sponsorChainDispatch: () => {},
    buttonText: '',
    content: ''
    // error: ''
  }

  render() {
    const {
      oAuthConfig,
      blockchainDispatch,
      sponsorChainDispatch,
      title,
      image,
      buttonText,
      content
      // error
    } = this.props

    return (
      <div>
        <ContentBar image={image} className="image-sm github" title={title}>
          <p>{content}</p>

          {/* TODO: only show error message if github auth fails
          <p className="error">{error}</p>
          */}

          <Divider />

          <OAuthButton
            text={buttonText}
            oAuthProvider="gitHub"
            oAuthConfig={oAuthConfig}
            blockchainDispatch={blockchainDispatch}
            sponsorChainDispatch={sponsorChainDispatch}
          />
        </ContentBar>
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContentBar, Divider } from 'interbit-ui-components'

import OAuthButton from './OAuthButton'

export default class Authentication extends Component {
  static propTypes = {
    oAuth: PropTypes.shape({}),
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    content: PropTypes.string
    // error: PropTypes.string
  }

  static defaultProps = {
    oAuth: {},
    buttonText: '',
    content: ''
    // error: ''
  }

  render() {
    const {
      oAuth,
      title,
      image,
      buttonText,
      content
      // error
    } = this.props

    return (
      <ContentBar image={image} className="image-sm github" title={title}>
        <p>{content}</p>

        {/* TODO: only show error message if github auth fails
          <p className="error">{error}</p>
          */}

        <Divider />

        <OAuthButton text={buttonText} oAuth={oAuth} />
      </ContentBar>
    )
  }
}

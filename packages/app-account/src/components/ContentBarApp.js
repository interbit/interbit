import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContentBar, Divider, LinkWrapper } from 'interbit-ui-components'

export default class ContentBarApp extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    callToAction: PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string
    }).isRequired
  }

  render() {
    const { title, content, image, callToAction } = this.props

    return (
      <ContentBar image={image} title={title} className="image-sm in-progress">
        <p>{content}</p>
        <Divider />
        {callToAction.to ? (
          <LinkWrapper to={callToAction.to}>{callToAction.text}</LinkWrapper>
        ) : (
          <p>{callToAction.text}</p>
        )}
      </ContentBar>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from '../Markdown'
import ContentBar from './ContentBar'

export default class ContentBarDefault extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    status: PropTypes.shape({
      type: PropTypes.string,
      text: PropTypes.string
    }),
    callToAction: PropTypes.shape({
      type: PropTypes.string,
      to: PropTypes.string,
      text: PropTypes.string.isRequired
    })
  }

  static defaultProps = {
    status: undefined,
    callToAction: undefined,
    className: ''
  }

  render() {
    const {
      title,
      content,
      image,
      callToAction,
      className,
      status
    } = this.props
    return (
      <ContentBar className={className} image={image} title={title}>
        <Markdown markdown={content} />
        {status && <span className={status.type}>{status.text}</span>}
        {callToAction && <a href={callToAction.to}>{callToAction.text}</a>}
      </ContentBar>
    )
  }
}

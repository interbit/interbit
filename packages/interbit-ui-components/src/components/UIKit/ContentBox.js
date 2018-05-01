import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CallToAction from '../UIKit/CallToAction'
import Markdown from '../Markdown'

export default class ContentBox extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
    callToAction: PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string.isRequired,
      to: PropTypes.string
    })
  }

  static defaultProps = {
    className: '',
    callToAction: undefined
  }

  render() {
    const { title, content, callToAction, className } = this.props

    return (
      <div className={`ibweb-content-box ${className}`}>
        <h2>{title}</h2>
        <Markdown markdown={content} />
        {callToAction && (
          <CallToAction {...callToAction}>{callToAction}</CallToAction>
        )}
      </div>
    )
  }
}

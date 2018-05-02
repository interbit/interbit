import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

export default class Markdown extends Component {
  static propTypes = {
    markdown: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { className, markdown } = this.props

    // NOTE: skipHtml turns off dangerouslySetInnerHTML. DO NOT REMOVE
    return <ReactMarkdown className={className} source={markdown} skipHtml />
  }
}

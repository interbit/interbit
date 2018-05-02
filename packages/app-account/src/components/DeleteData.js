import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Markdown } from 'interbit-ui-components'

export default class DeleteData extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    buttonText: PropTypes.string.isRequired
  }

  static defaultProps = {
    title: '',
    content: ''
  }

  render() {
    const { title, content, buttonText } = this.props

    return (
      <div>
        <h3>{title}</h3>
        <Markdown markdown={content} className="ibweb-mg-sm" />
        <IconButton text={buttonText} className="disabled" />
      </div>
    )
  }
}

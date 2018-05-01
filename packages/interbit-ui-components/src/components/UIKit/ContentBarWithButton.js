import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from '../Markdown'
import Divider from './Divider'
import IconButton from './IconButton'
import ContentBar from './ContentBar'

export default class ContentBarWithButton extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    callToAction: PropTypes.shape({
      icon: PropTypes.string,
      image: PropTypes.string,
      type: PropTypes.string,
      to: PropTypes.string,
      text: PropTypes.string.isRequired,
      btnType: PropTypes.string
    })
  }

  static defaultProps = {
    callToAction: undefined,
    className: ''
  }

  render() {
    const { title, content, image, callToAction, className } = this.props
    return (
      <ContentBar className={className} image={image} title={title}>
        <Markdown markdown={content} />
        <Divider />
        <IconButton {...callToAction} />
      </ContentBar>
    )
  }
}

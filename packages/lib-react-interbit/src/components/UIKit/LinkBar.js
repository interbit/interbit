import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Markdown from '../Markdown'

export default class LinkBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string,
    isMailto: PropTypes.bool,
    clickHandler: PropTypes.func
  }

  static defaultProps = {
    image: '',
    to: '#',
    className: '',
    isMailto: false,
    clickHandler: undefined
  }

  render() {
    const {
      title,
      content,
      image,
      to,
      className,
      isMailto,
      clickHandler
    } = this.props

    const isExternalLink = /^https?:\/\//.test(to)
    const linkBarContent = (
      <Media>
        <Media.Left>
          <img width={64} height={64} src={image} alt={title} />
        </Media.Left>
        <Media.Body>
          <h3>{title}</h3>
          <Markdown markdown={content} />
        </Media.Body>
      </Media>
    )

    return isExternalLink || isMailto ? (
      <a
        href={to}
        className={`ibweb-link-bar ${className}`}
        onClick={clickHandler}>
        {linkBarContent}
      </a>
    ) : (
      <Link
        to={to}
        className={`ibweb-link-bar ${className}`}
        onClick={clickHandler}>
        {linkBarContent}
      </Link>
    )
  }
}

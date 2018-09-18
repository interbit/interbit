import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Markdown from '../Markdown'

/**
 * A call-to-action UI component. It functions as an `<a>` tag or `<Link>` component from `react-router-dom`, together with some additional presentational information (title, description, and image).
 */
export default class LinkBar extends Component {
  static propTypes = {
    /**
     * A short title describing the call-to-action for LinkBar
     */
    title: PropTypes.string.isRequired,
    /**
     * A description of the call-to-action for LinkBar
     */
    content: PropTypes.string.isRequired,
    /**
     * An image
     */
    image: PropTypes.string,
    /**
     * A URL, relative path, or mailto link. E.g. `https://interbit.io`,  `/pages/foo`, or `mailto:foo@interbit.io`
     */
    to: PropTypes.string,
    /**
     * CSS classes to be applied to the component
     */
    className: PropTypes.string,
    /**
     * A flag. Set to `true` if the `to` property is a `mailto:` link
     */
    isMailto: PropTypes.bool,
    /**
     * A function that is fired when a user clicks on the LinkBar
     */
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
      clickHandler,
      ...rest
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
        onClick={clickHandler}
        {...rest}>
        {linkBarContent}
      </a>
    ) : (
      <Link
        to={to}
        className={`ibweb-link-bar ${className}`}
        onClick={clickHandler}
        {...rest}>
        {linkBarContent}
      </Link>
    )
  }
}

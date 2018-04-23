import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class LinkWrapper extends Component {
  static propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    // eslint-disable-next-line
    children: PropTypes.node // .isRequired,
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { className, children, to } = this.props
    const isExternalLink = /^https?:\/\//.test(to)

    return isExternalLink ? (
      <a href={to} className={className}>
        {children}
      </a>
    ) : (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }
}

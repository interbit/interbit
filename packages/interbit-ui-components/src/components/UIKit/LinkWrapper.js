import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class LinkWrapper extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
    // eslint-disable-next-line
    children: PropTypes.node // .isRequired,
  }

  static defaultProps = {
    clickHandler: undefined,
    className: ''
  }

  render() {
    const { className, children, to, clickHandler } = this.props
    const isExternalLink = /^https?:\/\//.test(to)

    return isExternalLink ? (
      <a
        href={to}
        className={className}
        onClick={() => {
          clickHandler && clickHandler()
        }}>
        {children}
      </a>
    ) : (
      <Link
        to={to}
        className={className}
        onClick={() => {
          clickHandler && clickHandler()
        }}>
        {children}
      </Link>
    )
  }
}

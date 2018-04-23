import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NavWrap extends Component {
  static propTypes = {
    // This could be any shape...
    // eslint-disable-next-line
    children: PropTypes.object
  }

  render() {
    const {
      // Eat these props as they are - no validation or defaults
      // eslint-disable-next-line
      active, activeKey, activeHref, onSelect,
      children,

      ...otherProps
    } = this.props
    return (
      <li role="presentation" {...otherProps}>
        {children}
      </li>
    )
  }
}

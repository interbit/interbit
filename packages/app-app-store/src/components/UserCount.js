import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserCount extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired
  }

  render() {
    const { count } = this.props

    return (
      <div className="User-count">
        {count} <i className="fa fa-user" />
      </div>
    )
  }
}

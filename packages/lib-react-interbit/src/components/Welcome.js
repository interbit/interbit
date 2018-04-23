import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Welcome extends Component {
  static propTypes = {
    message: PropTypes.string
  }

  static defaultProps = {
    message: ''
  }

  render() {
    return (
      <div>
        <h2>{this.props.message || 'Welcome to React components'}</h2>
      </div>
    )
  }
}

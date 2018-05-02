import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from './IconButton'

export default class ButtonLink extends Component {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string.isRequired,
    to: PropTypes.string
  }

  static defaultProps = {
    icon: '',
    to: '#'
  }

  render() {
    const { icon, text, to } = this.props
    return <IconButton icon={icon} text={text} to={to} />
  }
}

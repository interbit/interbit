import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonLink from './ButtonLink'

export const callToActionTypes = {
  BUTTON: 'button',
  LINK: 'link'
}

export default class CallToAction extends Component {
  static propTypes = {
    type: PropTypes.oneOf([callToActionTypes.BUTTON, callToActionTypes.LINK]),
    to: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    type: callToActionTypes.LINK,
    to: '#'
  }

  render() {
    const { type, to, text } = this.props

    switch (type) {
      case callToActionTypes.BUTTON:
        return <ButtonLink {...this.props} />
      case callToActionTypes.LINK:
      default:
        return <a href={to}>{text}</a>
    }
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LinkWrapper from './LinkWrapper'

export default class LaunchPad extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    to: PropTypes.string
  }

  static defaultProps = {
    to: '#'
  }

  render() {
    const { text, to, title, image } = this.props
    return (
      <LinkWrapper className="ibweb-launchpad" to={to}>
        <div>
          <img src={image} alt={title} />
          <h3>{title}</h3>
          {text}
        </div>
      </LinkWrapper>
    )
  }
}

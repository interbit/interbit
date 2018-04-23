import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class ContentBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    titleTo: PropTypes.string,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    // eslint-disable-next-line
    children: PropTypes.node // .isRequired,
  }

  static defaultProps = {
    titleTo: '',
    className: ''
  }

  render() {
    const { title, titleTo, image, className } = this.props
    return (
      <Media className={`ibweb-content-bar ${className}`}>
        <Media.Left>
          <img src={image} alt={title} />
        </Media.Left>
        <Media.Body>
          {titleTo ? (
            <a href={titleTo}>
              <h3>{title}</h3>
            </a>
          ) : (
            <h3>{title}</h3>
          )}
          {this.props.children}
        </Media.Body>
      </Media>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string.isRequired,
    to: PropTypes.string,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
    onClick: PropTypes.func
  }

  static defaultProps = {
    icon: '',
    image: '',
    to: '#',
    className: '',
    clickHandler: undefined,
    onClick: undefined
  }

  render() {
    const {
      icon,
      text,
      to,
      image,
      className,
      onClick,
      clickHandler
    } = this.props
    return (
      <Button
        className={`ibweb-button ${image && 'img '}${className}`}
        href={onClick ? undefined : to}
        onClick={clickHandler}>
        {image && <img alt="" width={32} height={32} src={image} />}
        {icon && <i className={`fa ${icon}`} />}
        {text}
      </Button>
    )
  }
}

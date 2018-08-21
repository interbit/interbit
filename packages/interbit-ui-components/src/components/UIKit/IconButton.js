import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

export default class IconButton extends Component {
  static propTypes = {
    image: PropTypes.string,
    text: PropTypes.string.isRequired,
    to: PropTypes.string,
    className: PropTypes.string,
    clickHandler: PropTypes.func
  }

  static defaultProps = {
    image: '',
    to: '#',
    className: '',
    clickHandler: undefined
  }

  render() {
    const { text, to, image, className, clickHandler, ...rest } = this.props
    return (
      <Button
        className={`ibweb-button pill reset ${image && 'img '}${className}`}
        href={clickHandler ? undefined : to}
        onClick={clickHandler}
        {...rest}>
        {image && <img alt="" width={32} height={32} src={image} />}
        {text}
      </Button>
    )
  }
}

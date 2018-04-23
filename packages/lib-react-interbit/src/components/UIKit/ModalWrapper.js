import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class ModalWrapper extends Component {
  static propTypes = {
    header: PropTypes.element,
    body: PropTypes.element.isRequired,
    footer: PropTypes.element,
    className: PropTypes.string,
    show: PropTypes.bool,
    // eslint-disable-next-line
    children: PropTypes.node // .isRequired,
  }

  static defaultProps = {
    header: undefined,
    footer: undefined,
    className: '',
    show: false
  }

  render() {
    const { header, body, footer, className, show } = this.props
    return (
      <Modal className={`ibweb-modal-wrapper ibweb ${className}`} show={show}>
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Body>{body}</Modal.Body>
        {footer && <Modal.Footer>{footer}</Modal.Footer>}
      </Modal>
    )
  }
}

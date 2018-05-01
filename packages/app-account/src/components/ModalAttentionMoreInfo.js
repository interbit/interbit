import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Markdown, ModalWrapper } from 'interbit-ui-components'

import modalNames from '../constants/modalNames'

export default class ModalAttentionMoreInfo extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    show: PropTypes.bool
  }

  static defaultProps = {
    show: false
  }

  render() {
    const { title, content, toggleModal, show } = this.props

    const header = <h2>{title}</h2>
    const body = <Markdown markdown={content} />
    const footer = (
      <IconButton
        text="Close"
        onClick={() => {
          toggleModal(modalNames.ATTENTION_MORE_INFO_MODAL_NAME)
        }}
      />
    )

    return (
      <ModalWrapper
        header={header}
        body={body}
        footer={footer}
        show={show}
        className="modal-attention"
      />
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'react-bootstrap'
import { IconButton, Markdown, ModalWrapper } from 'interbit-ui-components'

import buttonNames from '../constants/buttonNames'
import modalNames from '../constants/modalNames'

export default class ModalAttention extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    checkbox: PropTypes.string.isRequired,
    moreInfo: PropTypes.string.isRequired,
    toggleButton: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool,
    show: PropTypes.bool
  }

  static defaultProps = {
    isEnabled: false,
    show: false
  }

  render() {
    const {
      title,
      content,
      checkbox,
      moreInfo,
      toggleButton,
      toggleModal,
      isEnabled,
      show
    } = this.props

    const header = <h2>{title}</h2>
    const body = <Markdown markdown={content} />
    const footer = (
      <div>
        <Checkbox
          onClick={e => {
            toggleButton(buttonNames.DISCLAIMER_BUTTON_NAME, e.target.checked)
          }}>
          {checkbox}
        </Checkbox>
        <Markdown markdown={moreInfo} />
        <IconButton text="Continue" className={isEnabled ? '' : 'disabled'} />
        <IconButton
          text="Cancel"
          className="secondary"
          onClick={() => {
            toggleModal(modalNames.ATTENTION_MODAL_NAME)
          }}
        />
      </div>
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

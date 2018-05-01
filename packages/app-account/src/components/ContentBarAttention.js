import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { ContentBar } from 'interbit-ui-components'
import modalNames from '../constants/modalNames'

export default class ContentBarAttention extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    callToAction: PropTypes.shape({
      text: PropTypes.string
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const {
      title,
      image,
      content,
      callToAction,
      className,
      toggleModal
    } = this.props

    return (
      <ContentBar title={title} image={image} className={className}>
        <p>{content}</p>
        <p>
          <Button
            className="text-button"
            onClick={() => {
              toggleModal(modalNames.ATTENTION_MORE_INFO_MODAL_NAME)
            }}>
            {callToAction.text}
          </Button>
        </p>
      </ContentBar>
    )
  }
}

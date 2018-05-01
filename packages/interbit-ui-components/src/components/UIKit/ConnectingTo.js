import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class ConnectingTo extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    spinner: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    image: undefined,
    spinner: undefined,
    className: ''
  }

  render() {
    const { title, content, image, spinner, className } = this.props

    return (
      <div className={`ibweb-connecting-to ${className}`}>
        <Row>
          <Col md={4} mdOffset={4}>
            {image && <img src={image} alt={title} />}
            {spinner && (
              <div className="spinner">
                <img src={spinner} alt="Loading" />
              </div>
            )}
            <h3>{title}</h3>
            <p>{content}</p>
          </Col>
        </Row>
      </div>
    )
  }
}

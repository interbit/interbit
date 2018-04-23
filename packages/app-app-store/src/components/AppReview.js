import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Well, Row, Col } from 'react-bootstrap'
import FiveStarRating from './FiveStarRating'

export default class AppReview extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    reviewText: PropTypes.string.isRequired
  }

  render() {
    const { rating, reviewText } = this.props
    return (
      <Well>
        <Row>
          <Col sm={3}>
            <div className="User-rating">{rating}</div>
            <FiveStarRating rating={rating} />
          </Col>
          <Col sm={8}>{reviewText}</Col>
        </Row>
      </Well>
    )
  }
}

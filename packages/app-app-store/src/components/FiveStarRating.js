import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'

export default class FiveStarRating extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired
  }

  render() {
    const { rating } = this.props

    return (
      <StarRatings
        rating={rating}
        isSelectable={false}
        isAggregateRating
        numOfStars={5}
        starWidthAndHeight="15px"
        starSpacing="0px"
        starRatedColor="#333"
        starEmptyColor="919191"
      />
    )
  }
}

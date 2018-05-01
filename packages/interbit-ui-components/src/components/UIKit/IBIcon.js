import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class IBIcon extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { className } = this.props

    return (
      <div className={`ibweb-ib-icon ${className}`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="28"
            viewBox="0 0 29 44">
            <g fill="none" fillRule="nonzero">
              <path
                fill="#FFAD1D"
                d="M27.09 21.887a5.917 5.917 0 1 1-11.833.004 5.917 5.917 0 0 1 11.834-.004z"
              />
              <path
                fill="#22D6D6"
                d="M7.737 29.411a5.917 5.917 0 1 0 0 11.834 5.917 5.917 0 0 0 0-11.834z"
              />
              <path
                fill="#111"
                d="M21.176 14.152a7.74 7.74 0 0 0-7.683 8.656v.066c.27 2.773.838 3.716-.11 4.664-.95.949-1.936.35-4.79.099a7.308 7.308 0 0 0-.471-.038h-.385a7.737 7.737 0 1 0 7.74 7.735 7.653 7.653 0 0 0-.053-.866c-.251-2.85-.845-3.826.1-4.783.944-.957 1.918-.364 4.772-.1l.481.042h.399a7.737 7.737 0 0 0 0-15.475zM7.737 40.949a5.62 5.62 0 1 1 5.621-5.623 5.639 5.639 0 0 1-5.62 5.623zm7.816-19.062a5.62 5.62 0 1 1 5.623 5.623 5.627 5.627 0 0 1-5.623-5.623z"
              />
              <path
                fill="#FFF"
                d="M13.654 8.453a5.917 5.917 0 1 1-11.833.004 5.917 5.917 0 0 1 11.833-.004z"
              />
              <path
                fill="#111"
                d="M7.737.715a7.737 7.737 0 1 0 7.74 7.738A7.745 7.745 0 0 0 7.737.715zm5.621 7.738a5.62 5.62 0 1 1-11.241 0 5.62 5.62 0 0 1 11.241 0z"
              />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

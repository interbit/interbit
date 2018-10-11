import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * The *AppBucket* is a React UI component that behaves as a popover-style
menu to navigate between different apps.
 */

export default class AppBucket extends Component {
  static propTypes = {
    /** An array of objects to be displayed in the AppBucket */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /** The app name that is displayed below the icon. */
        label: PropTypes.string.isRequired,
        /** The image source for the app icon. */
        icon: PropTypes.string.isRequired,
        /** The location to link to. */
        to: PropTypes.string.isRequired,
        /** The function that is triggered on click of the icon or app name. */
        clickHandler: PropTypes.func
      })
    ).isRequired,
    /** Is `true` if the `AppBucket` is visible. This `prop` is updated via `mapStateToProps` from `react-redux`. */
    isVisible: PropTypes.bool
  }

  static defaultProps = {
    isVisible: false
  }
  render() {
    return <div>AppBucket</div>
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import appBucket from '../../assets/icons/app-bucket.svg'

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

  constructor(props) {
    super(props)
    this.state = {
      showContent: false
    }
    this.contentRef = null

    this.setContentRef = element => {
      this.contentRef = element
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (this.contentRef && !this.contentRef.contains(event.target)) {
      this.setState({ showContent: false })
    }
  }
  showAppBucket = () => {
    this.setState(prevState => ({
      showContent: true
    }))
  }

  render() {
    const { showContent } = this.state
    return (
      <div className="ibweb-app-bucket">
        <img
          className="app-bucket-icon"
          id="icon"
          src={appBucket}
          alt="app-bucket"
          onClick={this.showAppBucket}
        />
        {showContent && (
          <div className="app-bucket-content" ref={this.setContentRef} />
        )}
      </div>
    )
  }
}

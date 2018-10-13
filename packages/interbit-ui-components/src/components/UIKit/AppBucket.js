import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
    isVisible: PropTypes.bool,
    /** The function that is triggered on click outside of the bucket */
    closeAppBucket: PropTypes.func.isRequired,
    /** The function that is triggered when AppBucket icon is clicked to toggle the state of AppBucket */
    toggleAppBucket: PropTypes.func.isRequired
  }

  static defaultProps = {
    isVisible: false
  }

  constructor(props) {
    super(props)

    this.contentRef = null
    this.iconRef = null

    this.setContentRef = element => {
      this.contentRef = element
    }
    this.setIconRef = element => {
      this.iconRef = element
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    if (
      this.contentRef &&
      !this.contentRef.contains(event.target) &&
      this.iconRef &&
      !this.iconRef.contains(event.target)
    ) {
      this.props.closeAppBucket()
    }
  }
  toggleAppBucket = () => {
    this.props.toggleAppBucket()
  }

  render() {
    const { items, isVisible } = this.props
    console.log(this.props)
    return (
      <div className="ibweb-app-bucket">
        <img
          className="ibweb-app-bucket-icon"
          id="icon"
          src={appBucket}
          alt="app-bucket"
          onClick={this.toggleAppBucket}
          ref={this.setIconRef}
        />
        <div
          className={`ibweb-app-bucket-content ${
            isVisible ? 'show-bucket' : 'hide-bucket'
          }`}
          ref={this.setContentRef}>
          <div className="ibweb-app-bucket-content-items">
            {items.map((item, index) => (
              <Link
                to={item.to}
                className="ibweb-app-bucket-content-item"
                key={`${item.label}${index}`}>
                <img
                  src={item.icon}
                  className="ibweb-app-bucket-content-item-icon"
                  alt={`${item.label} icon`}
                  onClick={item.clickHandler}
                />
                <span onClick={item.clickHandler}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

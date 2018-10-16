import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
    /** The element which will be rendered to open AppBucket */
    children: PropTypes.node.isRequired,
    /** Is `true` if the `AppBucket` is visible. This `prop` is updated via `mapStateToProps` from `react-redux`. */
    isVisible: PropTypes.bool,
    /** The function that is triggered on click outside of the bucket */
    closeAppBucket: PropTypes.func.isRequired,
    /** The function that is triggered when AppBucket icon is clicked to toggle the state of AppBucket */
    toggleAppBucket: PropTypes.func.isRequired,
    /** This prop is for applying custom style on AppBucket */
    customStyles: PropTypes.object,
    /** Is `true` if popover position needs to be change */
    changePosition: PropTypes.bool,
    /** The function that changes the position of popover */
    changePopOverPosition: PropTypes.func.isRequired
  }

  static defaultProps = {
    isVisible: false,
    customStyles: {},
    changePosition: false
  }

  constructor(props) {
    super(props)

    this.contentRef = null
    this.iconRef = null
    this.componentRef = null

    this.setContentRef = element => {
      this.contentRef = element
    }
    this.setIconRef = element => {
      this.iconRef = element
    }
    this.setComponentRef = element => {
      this.componentRef = element
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    window.addEventListener('resize', this.positionPopOver)
    this.positionPopOver()
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
    window.addEventListener('resize', this.positionPopOver)
  }
  // Changes the position of popover on the basis of its position(App-Bucket Component)
  // in the parent container
  positionPopOver = () => {
    if (this.componentRef) {
      const parentData = this.componentRef.parentNode.getBoundingClientRect()
      const componentData = this.componentRef.getBoundingClientRect()
      if (
        parentData.width -
          (componentData.x - parentData.x + componentData.width) <
        113
      ) {
        this.props.changePopOverPosition(true)
      }
    }
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
    const {
      items,
      isVisible,
      customStyles,
      changePosition,
      children
    } = this.props
    return (
      <div
        className="ibweb-app-bucket"
        ref={this.setComponentRef}
        style={customStyles}>
        <div
          className="ibweb-app-bucket-icon"
          id="icon"
          onClick={this.toggleAppBucket}
          ref={this.setIconRef}>
          {children}
        </div>
        <div
          className={`${
            isVisible ? 'show-bucket' : 'hide-bucket'
          } ibweb-app-bucket-content 
          ${changePosition && 'position-arrow'}`}
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

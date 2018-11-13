import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import enhanceWithClickOutside from 'react-click-outside'

/**
 * The `AppBucket` is a React UI component that behaves as a popover-style
 * menu to navigate between different apps. If you are familiar with the
 * Gmail web browser interface, the `AppBucket` is similar to the menu in
 * the top-right corner which allows you to open other Google apps such as
 * Account, Mail, Drive, etc.
 * This component uses [Google Material Design](https://material.io/)
 * principles. It is intended be used in the context of an app built with
 * Material Design principles.
 */
export class AppBucket extends React.Component {
  static propTypes = {
    /** An array of objects to be displayed in the `AppBucket`. See each `item.property` below for further information about the object. */
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
    isVisible: PropTypes.bool.isRequired,
    /** history is browser history object passed by withRouter from react-router */
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    /** This action toggle isVisible prop */
    toggleAppBucketAction: PropTypes.func.isRequired,
    /** Element-toggler, App Bucket will shown/hidden by click on it */
    children: PropTypes.node.isRequired
  }

  componentDidMount = () => {
    if (this.appBucketContainer) {
      const parentData = this.appBucketContainer.parentNode.parentNode.getBoundingClientRect()
      const componentData = this.appBucketContainer.getBoundingClientRect()

      if (parentData.right < componentData.right) {
        this.rightAligned = true
      }
    }
  }

  handleClickOutside = () => {
    const { isVisible } = this.props
    if (isVisible) {
      this.toggleAppBucket()
    }
  }

  toggleAppBucket = () => {
    this.props.toggleAppBucketAction()
  }

  handleAppClick = (e, item) => {
    const { to, clickHandler } = item
    if (clickHandler) {
      e.preventDefault()
      clickHandler()
      this.props.history.push(to)
    }
  }

  render = () => {
    const { items, isVisible, children } = this.props

    return (
      <div className="ibweb-app-bucket">
        <div onClick={this.toggleAppBucket}>{children}</div>
        <div
          className={`arrow-up ${isVisible ? 'shown' : 'fade-out'}`}
          ref={iconArrow => {
            this.iconArrow = iconArrow
          }}
        />
        <div
          className={`app-bucket-container ${isVisible ? 'shown' : 'fade-out'}`}
          ref={appBucketContainer => {
            this.appBucketContainer = appBucketContainer
          }}
          style={this.rightAligned && { right: 0 }}>
          <div>
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={e => {
                  this.handleAppClick(e, item)
                }}>
                <div className="app-container">
                  <img src={item.icon} alt="" />
                  <div className="app-label">{item.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isVisible: state.appBucket.isVisible
})

const mapDispatchToProps = dispatch => ({
  toggleAppBucketAction: () => dispatch({ type: 'TOGGLE_APP_BUCKET' })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(enhanceWithClickOutside(AppBucket)))

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import defaultProfileImage from '../../../src/assets/icons/icon_default_profile_picture.png'

/**
 * The ActivityBar is a UI component that illustrates a single change made to a structured piece of data by a user.
 */
class ActivityBar extends React.PureComponent {
  static propTypes = {
    /** The source for the user's avatar image. If none is provided, use the default as specified in the design file. */
    avatar: PropTypes.string,
    /** An array of links showing the hierarchical relationship of the change with respect to the data structure the change belongs to. */
    breadcrumb: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        clickHandler: PropTypes.func.isRequired
      })
    ).isRequired,
    /** An object storing the changed field name, its old value, and its new value. */
    change: PropTypes.shape({
      fieldName: PropTypes.string,
      oldVal: PropTypes.string,
      newVal: PropTypes.string
    }),
    /** A block of text. */
    comment: PropTypes.string,
    /** A Moment.js date time format. */
    dateTimeFormat: PropTypes.string.isRequired,
    /** The first name of the user who made the change. */
    firstName: PropTypes.string.isRequired,
    /** The last name of the user who made the change. */
    lastName: PropTypes.string.isRequired,
    /** A unix timestamp of when the change was made. */
    timestamp: PropTypes.number.isRequired,
    /** The function that is called when a user clicks on the username or avatar. */
    userClickHandler: PropTypes.func.isRequired
  }

  static defaultProps = {
    avatar: undefined,
    change: {},
    comment: ''
  }

  handleBreadcrumbClick = (e, breadcrumb) => {
    e.preventDefault()
    breadcrumb.clickHandler()
  }

  handleUserClick = e => {
    e.preventDefault()
    const { userClickHandler } = this.props
    userClickHandler()
  }

  render = () => {
    const {
      firstName,
      lastName,
      avatar,
      breadcrumb,
      timestamp,
      dateTimeFormat,
      change,
      comment
    } = this.props

    return (
      <div className="ibweb-activity-bar">
        <div className="metadata">
          <div className="breadcrumbs">
            {breadcrumb
              .map(item => (
                <a
                  key={item.title}
                  href="#"
                  onClick={e => this.handleBreadcrumbClick(e, item)}>
                  {item.title}
                </a>
              ))
              .reduce((prev, curr) => [prev, ' > ', curr])}
          </div>
          <div className="date-time">
            {moment.unix(timestamp).format(dateTimeFormat)}
          </div>
        </div>

        <div className="separator" />

        <div className="body">
          <div className="avatar">
            <img src={avatar || defaultProfileImage} alt="" />
          </div>
          <div className="title">
            <a href="#" onClick={() => this.handleUserClick()}>
              {firstName} {lastName}
            </a>
          </div>
          <div className="comment">
            {comment ||
              `Changed (${change.fieldName}) from (${change.oldVal}) to (${
                change.newVal
              })`}
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityBar

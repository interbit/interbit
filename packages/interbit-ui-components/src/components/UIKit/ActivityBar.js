import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

/**
 * The `ActivityBar` displays the following information:
 * - The name of the user who made the change.
 * - An avatar of the user who made the change. If no avatar is provided, a default user icon is displayed.
 * - The nature of the change, e.g. `Changed (field name) from (old value) to (new value)` or a comment as a block of text.
 * - A timestamp of the change, displayed in a user-friendly [Moment.js](https://momentjs.com/) format, specified by the parent component.
 * - Bonus points: implement a solution that displays the timestamp in the user's local timezone
 * - A breadcrumb showing where the changed field exists in the larger context of the structured piece of data, e.g. `UUID > DataFieldName`.
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
          {breadcrumb.map(item => (
            <a
              key={item.title}
              href="#"
              onClick={e => this.handleBreadcrumbClick(e, item)}>
              {item.title}
            </a>
          ))}
          <div className="date-time">
            {moment.unix(timestamp).format(dateTimeFormat)}
          </div>
        </div>
        {avatar ? (
          <img src={avatar} alt="" />
        ) : (
          <img src="default.png" alt="" />
        )}
        <a href="#" className="title" onClick={() => this.handleUserClick()}>
          {firstName} {lastName}
        </a>
        <div className="body">
          {change ? (
            <span className="change">
              Changed {change.fieldName} from {change.oldValue} to{' '}
              {change.newValue}
            </span>
          ) : (
            <span className="comment">{comment}</span>
          )}
        </div>
      </div>
    )
  }
}

export default ActivityBar

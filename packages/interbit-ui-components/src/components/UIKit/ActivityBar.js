import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class ActivityBar extends React.PureComponent {
  static propTypes = {
    avatar: PropTypes.string,
    breadcrumb: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        clickHandler: PropTypes.func.isRequired
      })
    ).isRequired,
    change: PropTypes.arrayOf(
      PropTypes.shape({
        fieldName: PropTypes.string.isRequired,
        oldVal: PropTypes.string.isRequired,
        newVal: PropTypes.string.isRequired
      })
    ),
    comment: PropTypes.string,
    dateTimeFormat: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
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
            <a href="#" onClick={e => this.handleBreadcrumbClick(e, item)}>
              {item.title}
            </a>
          ))}
          <div className="date-time">
            {moment(timestamp).format(dateTimeFormat)}
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
            <span>
              Changed {change.fieldName} from {change.oldValue} to{' '}
              {change.newValue}
            </span>
          ) : (
            { comment }
          )}
        </div>
      </div>
    )
  }
}

export default ActivityBar

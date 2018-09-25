import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Divider from './Divider'
import defaultAvatar from '../../assets/icons/default-avatar.png'

export default class ActivityBar extends Component {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userClickHandler: PropTypes.func.isRequired,
    breadcrumb: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        clickHandler: PropTypes.func
      })
    ).isRequired,
    timestamp: PropTypes.string.isRequired,
    dateTimeFormat: PropTypes.string.isRequired,
    change: PropTypes.shape({
      fieldName: PropTypes.string,
      oldVal: PropTypes.string,
      newVal: PropTypes.string
    }),
    comment: PropTypes.string
  }

  static defaultProps = {
    avatar: undefined,
    comment: ''
  }
  render() {
    const {
      firstName,
      secondName,
      avatar,
      comment,
      timestamp,
      dateTimeFormat,
      change,
      userClickHandler
    } = this.props
    return (
      <div className="ibweb-activity-bar">
        <div className="meta-data">
          <span className="activity-bar-breadcrumb">123457890</span>
          <span className="activity-bar-timestamp">
            {moment(timestamp).format(dateTimeFormat)}
          </span>
        </div>
        <Divider />
        <div className="content">
          <img
            src={avatar || defaultAvatar}
            alt={firstName}
            onClick={userClickHandler}
          />
          <div>
            <div className="name" onClick={userClickHandler}>
              {firstName} {secondName}
            </div>
            <div className="body">
              {change && (
                <div>
                  {`Changed ${change.fieldName} from ${change.oldVal} to ${
                    change.newVal
                  }`}
                </div>
              )}
              {comment && <div>{comment}</div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

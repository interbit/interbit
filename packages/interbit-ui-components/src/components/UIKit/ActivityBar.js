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
    comment: '',
    change: undefined
  }
  render() {
    const {
      firstName,
      secondName,
      avatar,
      breadcrumb,
      comment,
      timestamp,
      dateTimeFormat,
      change,
      userClickHandler
    } = this.props
    return (
      <div className="ibweb-activity-bar">
        <div className="meta-data">
          <ul className="activity-bar-breadcrumb">
            {breadcrumb.map((item, index) => (
              <li key={`item-${index}`}>
                <a onClick={item.clickHandler}>{item.title}</a>
              </li>
            ))}
          </ul>
          <span className="activity-bar-timestamp">
            {moment(new Date(timestamp)).format(dateTimeFormat)}
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
            <span className="name" onClick={userClickHandler}>
              {firstName} {secondName}
            </span>
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

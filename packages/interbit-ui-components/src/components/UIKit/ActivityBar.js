import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import Divider from './Divider'
import defaultAvatar from '../../assets/icons/default-avatar.svg'

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
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
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
    // For displaying timestamp in user's local zone, assuming original date time to be in UTC
    const dateUtc = moment.utc(timestamp)
    const localDate = dateUtc.local()
    const localTimeStamp = localDate.format(dateTimeFormat)
    return (
      <div className="ibweb-activity-bar">
        <div className="meta-data">
          <ul className="activity-bar-breadcrumb">
            {breadcrumb.map((item, index) => (
              <li key={`item-${index}`}>
                <Button onClick={item.clickHandler} bsStyle="link">
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
          <span className="activity-bar-timestamp">{localTimeStamp}</span>
        </div>
        <Divider />
        <div className="content">
          <Button onClick={userClickHandler} bsStyle="link">
            <img src={avatar || defaultAvatar} alt={firstName} />
          </Button>
          <div>
            <Button onClick={userClickHandler} className="name" bsStyle="link">
              {firstName} {secondName}
            </Button>
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

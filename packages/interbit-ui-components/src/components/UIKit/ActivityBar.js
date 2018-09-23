import React from 'react'
import PropTypes from 'prop-types'

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

  render = () => {
    const { firstName, lastName, avatar, userClickHandler, breadcrumb, timestamp, dateTimeFormat, change, comment } = this.props
    return <div />
  }
}

export default ActivityBar

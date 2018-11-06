import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import DataContainer from './DataContainer'

/**
 * The `TimelineStepper` is a React UI component that allows a user to navigate a sequence of discrete changes
 * that have been applied to a set of data. The timeline is a line with evenly spaced dots,
 * where each dot represents the state of the data at a fixed point in time.
 * The leftmost dot represents the initial state of the data, and the rightmost dot represents the most recent state.
 * When the user clicks on a dot on the timeline, the data view updates and displays the data state
 * at the time represented by the dot.
 *
 * For example, let's say the data are moves in a chess game. In our application UI,
 * we have the `TimelineStepper` and a view of the chessboard below. The `TimelineStepper` allows the user
 * to view every move made in the game by clicking on a dot on the timeline.
 * The user clicks on the 2nd dot on timeline, and the board display updates
 * to show where the pieces are after the first move.
 *
 */
export class TimelineStepper extends React.PureComponent {
  static propTypes = {
    /** An array of objects representing the timeline dots. */
    dataPoints: PropTypes.arrayOf(
      PropTypes.shape({
        /** An unique identifier for the state of the data at the `i`th change. */
        id: PropTypes.string,
        /** An unix timestamp in milliseconds of when the `i`th change was made. */
        timestamp: PropTypes.number
      })
    ).isRequired,
    /** A Moment.js date format. */
    dateFormat: PropTypes.string.isRequired,
    /** A Moment.js time format. */
    timeFormat: PropTypes.string.isRequired,
    /** An integer representing the position of the active dot and label on the timeline. */
    currentPosition: PropTypes.number,
    /** An integer representing the position of the hover dot and label on the timeline. */
    hoverPosition: PropTypes.number,
    /** An integer representing the position of the clicked (mouse down) dot and label on the timeline. */
    clickedPosition: PropTypes.number,
    /** Action for switch to new position */
    changeCurrentPositionAction: PropTypes.func.isRequired,
    /** Action for set hover position */
    setHoverPositionAction: PropTypes.func.isRequired,
    setClickedPositionAction: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentPosition: null,
    hoverPosition: null,
    clickedPosition: null
  }

  setClickedPosition = index => {
    this.props.setClickedPositionAction(index)
  }

  handleMouseLeave = index => {
    if (this.props.hoverPosition === index) {
      this.props.setHoverPositionAction()
    }
  }

  changeCurrentPosition = newPosition => {
    this.props.setClickedPositionAction()
    this.props.changeCurrentPositionAction(newPosition)
  }

  mouseLeaveTimeout = null

  handleMouseOver = index => {
    const {
      setHoverPositionAction,
      currentPosition,
      hoverPosition
    } = this.props
    if (index === hoverPosition) {
      clearTimeout(this.mouseLeaveTimeout)
    }
    if (currentPosition !== index) {
      setHoverPositionAction(index)
    }
  }

  PointContainer = (point, index) => {
    const {
      dataPoints,
      currentPosition,
      hoverPosition,
      clickedPosition,
      dateFormat,
      timeFormat
    } = this.props

    const lastPointIndex = dataPoints.length - 1
    let stepClass = 'after-active'

    if (index === currentPosition) {
      stepClass = 'active'
    } else if (index < currentPosition) {
      stepClass = 'before-active'
    }

    const unixMoment = moment.unix(point.timestamp)

    let style = { width: `${100 / lastPointIndex}%` }
    let pointClasses = 'point'
    let stepClasses = 'timeline-step'

    if (index === 0) {
      style = { width: `${50 / lastPointIndex}%` }
      pointClasses += ' first-point'
      stepClass += ' first-step'
      stepClasses += ' first-step'
    } else if (index === lastPointIndex) {
      style = { width: `${50 / lastPointIndex}%` }
      pointClasses += ' last-point'
      stepClass += ' last-step'
      stepClasses += ' last-step'
    }

    if (index !== currentPosition && index === clickedPosition) {
      stepClass += ' clicked'
    } else if (index !== currentPosition && index === hoverPosition) {
      stepClass += ' hovered'
    }

    const tooltipVisibility =
      (hoverPosition === null && index === currentPosition) ||
      hoverPosition === index
        ? 'show-tooltip'
        : 'hide-tooltip'

    return (
      <div
        key={point.id}
        role="presentation"
        className={`point-container ${stepClass}`}
        onFocus={() => {}}
        onMouseOver={() => this.handleMouseOver(index)}
        onMouseLeave={() => {
          this.mouseLeaveTimeout = setTimeout(() => {
            this.handleMouseLeave(index)
          }, 500)
        }}
        onMouseDown={() => this.setClickedPosition(index)}
        onMouseUp={() => this.changeCurrentPosition(index)}
        style={style}>
        <div className={tooltipVisibility}>
          <div className="point-tooltip">
            <strong>{unixMoment.format(dateFormat)}</strong>
            <br />
            {unixMoment.format(timeFormat)}
          </div>
          <div className="triangle-down" />
          <div className="vertical-stripe" />
          <div className="triangle-up" />
        </div>
        <div className={stepClasses}>
          {index !== 0 && <div className="left-line" />}
          <div className={pointClasses} />
          {index !== lastPointIndex && <div className="right-line" />}
        </div>
      </div>
    )
  }

  render = () => {
    const { dataPoints, currentPosition } = this.props

    const activeDataPoint = dataPoints[currentPosition]
    const sortedDataPoints = dataPoints.sort(
      (a, b) => a.timestamp > b.timestamp
    )

    return (
      <div className="ibweb-timeline-stepper">
        <div className="timeline-container">
          {sortedDataPoints.map((point, index) =>
            this.PointContainer(point, index)
          )}
        </div>
        <div className="controls-container">
          <Button
            className="primary-button left"
            onClick={() => {
              this.changeCurrentPosition(currentPosition - 1)
            }}
            disabled={currentPosition === 0}>
            Back
          </Button>
          <div className="helper">
            Drag from the current state to a new state or click one of the dots
            to jump to that point in time.
          </div>
          <Button
            className="primary-button right"
            onClick={() => {
              this.changeCurrentPosition(currentPosition + 1)
            }}
            disabled={currentPosition === dataPoints.length - 1}>
            Next
          </Button>
        </div>
        {activeDataPoint && (
          <DataContainer
            timestamp={activeDataPoint.timestamp}
            dataStatePosition={currentPosition}
            id={activeDataPoint.id}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { timelineStepper } = state
  const {
    dataPoints,
    currentPosition,
    hoverPosition,
    clickedPosition
  } = timelineStepper

  return {
    dataPoints,
    currentPosition:
      currentPosition === undefined ? dataPoints.length - 1 : currentPosition,
    hoverPosition,
    clickedPosition
  }
}

const mapDispatchToProps = dispatch => ({
  changeCurrentPositionAction: newIndex =>
    dispatch({ type: 'CHANGE_CURRENT_POSITION', newIndex }),
  setHoverPositionAction: index =>
    dispatch({ type: 'SET_HOVER_POSITION', index }),
  setClickedPositionAction: index =>
    dispatch({ type: 'SET_CLICKED_POSITION', index })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineStepper)

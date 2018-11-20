import React from 'react'
import { configure, shallow, render, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'

import { timelineStepper } from './reducer'
import TimelineStepperContainer, { TimelineStepper } from './TimelineStepper'

configure({ adapter: new Adapter() })
const dataPoints = [
  {
    id: 'Some-Id-1',
    timestamp: 1540729513
  },
  {
    id: 'Some-Id-2',
    timestamp: 1540643113
  },
  {
    id: 'Some-Id-3',
    timestamp: 1540556713
  },
  {
    id: 'Some-Id-4',
    timestamp: 1540470313
  },
  {
    id: 'Some-Id-5',
    timestamp: 1540383913
  },
  {
    id: 'Some-Id-6',
    timestamp: 1540297513
  },
  {
    id: 'Some-Id-7',
    timestamp: 1540211113
  }
]
describe('<TimelineStepper/>', () => {
  const mockStore = configureStore()

  const initialState = {
    timelineStepper: {
      dataPoints
    }
  }
  const store = mockStore(initialState)

  const props = {
    dataPoints,
    dateFormat: 'dddd, MMMM Do YYYY',
    timeFormat: 'h:mm:ss a',
    changeCurrentPositionAction: () => {},
    setHoverPositionAction: () => {},
    setClickedPositionAction: () => {}
  }

  it('For the initial state, `currentPosition` is `dataPoints.length - 1`', () => {
    const container = mount(
      <TimelineStepperContainer store={store} dateFormat="" timeFormat="" />
    )

    expect(container.find(TimelineStepper).length).toEqual(1)
    expect(container.find(TimelineStepper).props().currentPosition).toEqual(
      dataPoints.length - 1
    )
  })

  it('renders `dataPoints.length` dots', () => {
    const dummy = shallow(<TimelineStepper {...props} />)

    expect(dummy.find('div.point').length).toBe(props.dataPoints.length)
  })

  it('set the label in the `i`th position and displays the date and time for that data point when currentPosition === i', () => {
    const dummy = shallow(<TimelineStepper {...props} currentPosition={3} />)

    expect(dummy.find('div.point-container.active').length).toBe(1)
    expect(
      dummy
        .find('div.point-container.active')
        .first()
        .key()
    ).toBe('Some-Id-4')
  })

  it('displays DataContainer with `i`, `dataPoints[i].id`, and `dataPoints[i].timestamp` values when currentPosition === i', () => {
    const dummy = render(<TimelineStepper {...props} currentPosition={3} />)

    expect(
      dummy
        .find('.data-container')
        .first()
        .text()
    ).toBe('3 | Some-Id-4 | 1540470313')
  })

  it('the Back button is disabled when the `currentPosition` is `0`', () => {
    const dummy = shallow(<TimelineStepper {...props} currentPosition={0} />)
    expect(
      dummy
        .find('.primary-button.left')
        .first()
        .prop('disabled')
    ).toBe(true)
  })

  it('The Next button is disabled when the `currentPosition` is `dataPoints.length - 1`', () => {
    const dummy = shallow(<TimelineStepper {...props} currentPosition={6} />)
    expect(
      dummy
        .find('.primary-button.right')
        .first()
        .prop('disabled')
    ).toBe(true)
  })

  it('When a user clicks off the `TimelineStepper`, the `TimelineStepper` view remains the same', () => {})

  it('When a user clicks off the `TimelineStepper`, the `DataContainer` view remains the same', () => {})
})

describe('TimelineStepper reducer', () => {
  it('The reducer does nothing if `currentPosition` is not a valid input, i.e. not an integer between `0` and `dataPoints.length - 1`', () => {
    expect(
      timelineStepper(
        { dataPoints, currentPosition: 2 },
        { type: 'CHANGE_CURRENT_POSITION', newIndex: null }
      ).currentPosition
    ).toEqual(2)

    expect(
      timelineStepper(
        { dataPoints, currentPosition: 2 },
        { type: 'CHANGE_CURRENT_POSITION', newIndex: 'foo' }
      ).currentPosition
    ).toEqual(2)

    expect(
      timelineStepper(
        { dataPoints, currentPosition: 2 },
        { type: 'CHANGE_CURRENT_POSITION', newIndex: 'false' }
      ).currentPosition
    ).toEqual(2)
  })

  it('When an action is dispatched to select the `i`th dot, `currentPosition` is updated to `i`', () => {
    expect(
      timelineStepper(
        { dataPoints, currentPosition: 1 },
        { type: 'CHANGE_CURRENT_POSITION', newIndex: 2 }
      ).currentPosition
    ).toEqual(2)
  })
})

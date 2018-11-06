TimelineStepper example:
```js
const { createStore, combineReducers } =require('redux')
const { Provider } = require('react-redux')
const {timelineStepper} = require('./reducer')

const initialState = {
    timelineStepper: {
      dataPoints: [
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
    }
  }
  
const store = createStore(combineReducers({timelineStepper}), initialState)

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
  },
]

;
<Provider store={store}>
  <TimelineStepper
    // dataPoints={dataPoints}
    dateFormat="dddd, MMMM Do YYYY"
    timeFormat="h:mm:ss a"
  />
</Provider>

```

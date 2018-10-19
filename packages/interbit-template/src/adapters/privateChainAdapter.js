const {
  actionCreators: covenantActionCreators
} = require('../interbit/private/actions')

export const covenantName = 'Interbit Template Private Chain'

const memoActionLabel = 'Record your thoughts'
const textParamLabel = 'Enter some text'

const addActionLabel = 'Add-up some numbers'
const numberParamLabel = 'Enter a number'

const setTimestampLabel = 'Enter a timestamp explicitly'
const timestampParamLabel = 'Enter milliseconds since Unix epoch'

const setTimestampActionCreatorLabel = 'Get timestamp from the action creator'

const currentTimestampLabel = 'Get timestamp from a saga side-effect'

export const actionCreators = {
  memo: () => ({
    type: memoActionLabel,
    arguments: {
      [textParamLabel]: ''
    },
    invoke: ({ [textParamLabel]: text }) => covenantActionCreators.memo(text)
  }),

  add: () => ({
    type: addActionLabel,
    arguments: {
      [numberParamLabel]: ''
    },
    invoke: ({ [numberParamLabel]: number }) =>
      covenantActionCreators.add(number)
  }),

  setTimestamp: () => ({
    type: setTimestampLabel,
    arguments: {
      [timestampParamLabel]: ''
    },
    invoke: ({ [timestampParamLabel]: timestamp }) =>
      covenantActionCreators.setTimestamp(timestamp)
  }),

  setCurrentTimestampInActionCreator: () => ({
    type: setTimestampActionCreatorLabel,
    invoke: () => covenantActionCreators.setCurrentTimestampInActionCreator()
  }),

  currentTimestampSaga: () => ({
    type: currentTimestampLabel,
    invoke: () => covenantActionCreators.currentTimestampSaga()
  })
}

const Immutable = require('seamless-immutable')
const hashObject = require('object-hash')
const { PATHS } = require('../constants')

const prefix = '@@FILELAYER'

const actionTypes = {
  // Insert file to temp space
  REQUEST_ADD_FILE: `${prefix}/REQUEST_ADD_FILE`,
  // Insert file into file layer storage
  DO_ADD_FILE: `${prefix}/DO_ADD_FILE`
}

const actionCreators = {}

const initialState = Immutable.from({}).setIn(PATHS.FILE_LAYER, {})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_ADD_FILE: {
      const { binary } = action.payload
      const hash = hashObject(binary)
      return state.setIn([...PATHS.FILE_LAYER_TEMP_SPACE, hash], binary)
    }

    case actionTypes.DO_ADD_FILE: {
      const { hash, filePath } = action.payload
      // TODO check request makes logical sense
      return state
        .setIn([...PATHS.FILE_LAYER_DIRECTORY, ...filePath], hash)
        .setIn(
          [...PATHS.FILE_LAYER_CONTENT, hash],
          state.getIn([...PATHS.FILE_LAYER_TEMP_SPACE, hash])
        )
        .updateIn(PATHS.FILE_LAYER_TEMP_SPACE, Immutable.without, hash)
    }

    default:
      return state
  }
}

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}

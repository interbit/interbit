import Immutable from 'seamless-immutable'

const TOGGLE_MODAL = 'UI/TOGGLE_MODAL'

export const toggleModal = modalName => ({
  type: TOGGLE_MODAL,
  payload: {
    modalName
  }
})

const initialState = {
  modals: {}
}

export const reducer = (state = Immutable.from(initialState), action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      const { modalName } = action.payload
      return state.setIn(['modals', modalName], !state.modals[modalName])
    }

    default:
      return state
  }
}

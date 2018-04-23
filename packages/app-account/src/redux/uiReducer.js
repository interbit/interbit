import Immutable from 'seamless-immutable'

const TOGGLE_BUTTON = 'UI/TOGGLE_BUTTON'
const TOGGLE_FORM = 'UI/TOGGLE_FORM'
const TOGGLE_MODAL = 'UI/TOGGLE_MODAL'

export const toggleButton = (buttonName, buttonState) => ({
  type: TOGGLE_BUTTON,
  payload: {
    buttonName,
    buttonState
  }
})

export const toggleForm = formName => ({
  type: TOGGLE_FORM,
  payload: {
    formName
  }
})

export const toggleModal = modalName => ({
  type: TOGGLE_MODAL,
  payload: {
    modalName
  }
})

const initialState = {
  buttons: {},
  editableForms: {},
  modals: {}
}

export const reducer = (state = Immutable.from(initialState), action) => {
  switch (action.type) {
    case TOGGLE_BUTTON: {
      const { buttonName, buttonState } = action.payload
      return state.setIn(['buttons', buttonName], buttonState)
    }

    case TOGGLE_FORM: {
      const { formName } = action.payload
      return state.setIn(
        ['editableForms', formName],
        !state.editableForms[formName]
      )
    }

    case TOGGLE_MODAL: {
      const { modalName } = action.payload
      return state.setIn(['modals', modalName], !state.modals[modalName])
    }

    default:
      return state
  }
}

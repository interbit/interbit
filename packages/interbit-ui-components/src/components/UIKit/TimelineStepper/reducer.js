export const timelineStepper = (state = {}, action) => {
  const { newIndex } = action

  switch (action.type) {
    case 'CHANGE_CURRENT_POSITION':
      if (
        Number.isInteger(newIndex) &&
        newIndex >= 0 &&
        newIndex <= state.dataPoints.length - 1
      ) {
        return Object.assign({}, state, { currentPosition: newIndex })
      }
      return state
    case 'SET_HOVER_POSITION':
      return Object.assign({}, state, { hoverPosition: action.index })
    case 'SET_CLICKED_POSITION':
      return Object.assign({}, state, { clickedPosition: action.index })
    default:
      return state
  }
}

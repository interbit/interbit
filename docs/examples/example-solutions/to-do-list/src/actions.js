let actions = {
  ADD_ITEM: 'ADD_ITEM',
  addItem: (id, label, description) => {
    return {
      type: actions.ADD_ITEM,
      payload: {
        id,
        label,
        description
      }
    }
  },
  EDIT_ITEM: 'EDIT_ITEM',
  editItem: (id, label, description, isDone) => {
    return {
      type: actions.EDIT_ITEM,
      payload: {
        id,
        label,
        description,
        isDone
      }
    }
  },
  TOGGLE_ITEM: 'TOGGLE_ITEM',
  toggleItem: (id) => {
    return {
      type: actions.TOGGLE_ITEM,
      payload: {
        id
      }
    }
  }
}

export default actions

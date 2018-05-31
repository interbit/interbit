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
  }

  // TODO
  // ... add more action types and creators

}

export default actions

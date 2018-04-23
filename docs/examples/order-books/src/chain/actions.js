const actions = {
  PLACE_ORDER: 'PLACE_ORDER',
  placeOrder: ({ bidFlavour = 'cad', askFlavour = 'oil', price = 1, bidAmount = 10, conditions, orderId }) => ({
    type: actions.PLACE_ORDER,
    payload: {
      bidFlavour, askFlavour, price, bidAmount, conditions, orderId
    }
  }),
  CANCEL_ORDER: 'CANCEL_ORDER',
  cancelOrder: ({ orderId }) => ({
    type: actions.CANCEL_ORDER,
    payload: {
      orderId
    }
  })
}

export default actions

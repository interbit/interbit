import _ from 'lodash'
import Immutable from 'seamless-immutable'
import actions from './actions'
import initialState from './initialState'
import uuid from 'uuid'

export default {
  orderBook: (state = Immutable.from(initialState.orderBook), action) => {
    console.log(action)
    switch (action.type) {
      case actions.CANCEL_ORDER:
        return cancelOrder(state, action)

      case actions.PLACE_ORDER:
        return placeOrder(state, action)

      default:
        return state
    }
  }
}

const cancelOrder = (state, action) => {
  const accountId = action.signature.publicKey
  Object.keys(state.books).forEach(bidFlavour => {
    Object.keys(state.books[bidFlavour]).forEach(askFlavour => {
      const flavouredBooks = state.books[bidFlavour][askFlavour]
      const foundOrderIndex = findOrderIndex(flavouredBooks, action)
      const isOrderInBooks = foundOrderIndex !== -1
      if (isOrderInBooks) {
        const order = flavouredBooks[foundOrderIndex]
        const orderAmount = parseFloat(order.bidAmount)
        const existingBalance = parseFloat(state.balances[accountId][order.bidFlavour])
        state = state.setIn(['balances', accountId, bidFlavour], existingBalance + orderAmount)

        const updatedBooks = immutableRemove(flavouredBooks, foundOrderIndex)
        state = state.setIn(['books', bidFlavour, askFlavour], updatedBooks)
      }
    })
  })
  return state
}

const placeOrder = (state, action) => {
  const { bidFlavour, bidAmount, askFlavour } = action.payload
  const accountId = action.signature.publicKey
  const availableFlavours = Object.keys(state.books)
  const isFlavourInBooks = availableFlavours.indexOf(bidFlavour) !== -1 && availableFlavours.indexOf(askFlavour) !== -1
  if (!isFlavourInBooks) {
    return state
  }
  const balances = state.balances[accountId]
  if (!balances || !balances[bidFlavour]) {
    state = state.setIn(['balances', accountId, bidFlavour], 0)
  }
  const isFunded = state.balances[accountId][bidFlavour] >= bidAmount
  if (isFunded) {
    state = state.setIn(['balances', accountId, bidFlavour], state.balances[accountId][bidFlavour] - bidAmount)
    state = fillThenPlaceOrders(state, action)
    state = removeFilledOrders(state, action.payload)
  }
  return state
}

const fillThenPlaceOrders = (state, action) => {
  const placedOrder = action.payload
  const accountId = action.signature.publicKey
  const book = state.books[placedOrder.askFlavour][placedOrder.bidFlavour]
  let amountToFill = placedOrder.bidAmount

  book.some((bookOrder, bookIndex) => {
    const isProfitable = (bookOrder.price - 1 / placedOrder.price) <= 0
    if (!isProfitable) {
      return true
    }

    const filledAmount = calculateFilledAmount(bookOrder, amountToFill)

    const newBookAmount = bookOrder.bidAmount - filledAmount / bookOrder.price
    state = state.setIn(['books', placedOrder.askFlavour, placedOrder.bidFlavour, bookIndex, 'bidAmount'], newBookAmount)

    const newPlacerBalance = state.balances[accountId][placedOrder.askFlavour] + filledAmount * bookOrder.price
    state = state.setIn(['balances', accountId, placedOrder.askFlavour], newPlacerBalance)
    const newPlaceeBalance = state.balances[bookOrder.accountId][placedOrder.bidFlavour] + filledAmount
    state = state.setIn(['balances', bookOrder.accountId, placedOrder.bidFlavour], newPlaceeBalance)

    amountToFill -= filledAmount
    const isOrderFull = amountToFill <= 0
    if (isOrderFull) {
      return true
    }
    return false
  })

  state = addPlacedOrder(state, action, amountToFill)
  return state
}

const calculateFilledAmount = (bookOrder, amountToFill) => {
  const bookAmount = bookOrder.bidAmount * bookOrder.price
  if (amountToFill < bookAmount) {
    return amountToFill
  }
  return bookAmount
}

const removeFilledOrders = (state, placedOrder) => {
  const filledOrdersRemoved = state.books[placedOrder.askFlavour][placedOrder.bidFlavour].filter(bookOrder => {
    return bookOrder.bidAmount > 0
  })
  state = state.setIn(['books', placedOrder.askFlavour, placedOrder.bidFlavour], filledOrdersRemoved)
  return state
}

const addPlacedOrder = (state, action, amountToFill) => {
  const isPlacedOrderFilled = amountToFill <= 0
  if (!isPlacedOrderFilled) {
    let order = {
      ...action.payload,
      orderId: uuid.v4(),
      accountId: action.signature.publicKey,
      bidAmount: amountToFill
    }
    state = _orderedInsert(state, order)
  }
  return state
}

const _orderedInsert = (state, order) => {
  const books = state.books[order.bidFlavour][order.askFlavour]
  const insertIndex = _.sortedIndexBy(books, order, (order) => { return parseFloat(order.price) })
  const ordered = immutableInsert(books, order, insertIndex)
  return state.setIn(['books', order.bidFlavour, order.askFlavour], ordered)
}

const findOrderIndex = (books, action) => {
  const accountId = action.signature.publicKey
  const orderId = action.payload.orderId
  const removeIndex = _.findIndex(books, order => {
    return order.orderId === orderId && order.accountId === accountId
  })
  return removeIndex
}

const immutableInsert = (list, item, index) => {
  return list.slice(0, index).concat([item]).concat(list.slice(index))
}

const immutableRemove = (list, index) => {
  return list.slice(0, index).concat(list.slice(index + 1))
}

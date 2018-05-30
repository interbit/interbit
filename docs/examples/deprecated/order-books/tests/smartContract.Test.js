import smartContract from '../src/chain/smartContract'
import initialState from '../src/chain/initialState'
import actions from '../src/chain/actions'
import should from 'should'

describe('smart contract', function () {
  it('does not PLACE_ORDER if account does not have sufficient balance', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 0 } })
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      price: 1,
      askFlavour: 'oil',
      bidAmount: 10
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(0, newState.books.cad.oil.length)
  })

  it('adds order with new orderId to books on PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 10 } })
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      price: 1,
      askFlavour: 'oil',
      bidAmount: 10
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(1, newState.books.cad.oil.length)
    should.equal(1, newState.books.cad.oil[0].accountId)
  })

  it('does not add orders with invalid askFlavour', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 10 } })
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      price: 1,
      askFlavour: 'meowmeowmeow',
      bidAmount: 10
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(0, newState.books.cad.oil.length)
  })

  it('generates a new orderId on each PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 100 } })
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      price: 1,
      askFlavour: 'oil',
      bidAmount: 10
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)
    newState = smartContract.orderBook(newState, action)
    newState = smartContract.orderBook(newState, action)

    should.ok(newState)
    const newBooks = newState.books.cad.oil
    should.equal(3, newBooks.length)
    should.notEqual(newBooks[0].orderId, newBooks[1].orderId)
    should.notEqual(newBooks[0].orderId, newBooks[2].orderId)
    should.notEqual(newBooks[1].orderId, newBooks[2].orderId)
  })

  it('keeps orders sorted by price on PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 10 } })
    state = state.setIn(['books', 'cad', 'oil'], [
      { price: 1 },
      { price: 10 }
    ])
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      price: 5,
      askFlavour: 'oil',
      bidAmount: 1
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(3, newState.books.cad.oil.length)
    should.equal(1, newState.books.cad.oil[1].accountId)
  })

  it('subtracts balance from account on PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 10 } })
    let action = actions.placeOrder({
      bidFlavour: 'cad',
      bidAmount: 10,
      price: 1,
      askFlavour: 'oil'
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(0, newState.balances[1].cad)
  })

  it('uses as many full or partial orders as needed to fill orders on PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 10, oil: 20 }, 2: { oil: 10 } })
    state = state.setIn(['books', 'cad', 'oil'], [
      {
        bidAmount: 10,
        price: 1,
        accountId: 2
      },
      {
        bidAmount: 20,
        price: 2,
        accountId: 2
      }
    ])
    let action = actions.placeOrder({
      bidFlavour: 'oil',
      askFlavour: 'cad',
      bidAmount: 20,
      price: 0.5
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(1, newState.books.cad.oil.length)
    should.equal(15, newState.books.cad.oil[0].bidAmount)
  })

  it('only partially fills book eating orders and leaves remainder in books on PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 100, oil: 100 }, 2: { oil: 100 } })
    state = state.setIn(['books', 'cad', 'oil'], [
      {
        bidAmount: 15,
        price: 2,
        accountId: 2
      }
    ])
    let action = actions.placeOrder({
      bidFlavour: 'oil',
      askFlavour: 'cad',
      bidAmount: 40,
      price: 0.5
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)
    should.ok(newState)
    should.equal(0, newState.books.cad.oil.length)
    should.equal(1, newState.books.oil.cad.length)
    should.equal(10, newState.books.oil.cad[0].bidAmount)
  })

  it('adds order to books and does not use bad prices to fill on PLACE_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 100, oil: 100 }, 2: { oil: 100 } })
    state = state.setIn(['books', 'cad', 'oil'], [
      {
        bidAmount: 15,
        price: 2,
        accountId: 2
      }
    ])
    let action = actions.placeOrder({
      bidFlavour: 'oil',
      askFlavour: 'cad',
      bidAmount: 10,
      price: 1
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(1, newState.books.cad.oil.length)
    should.equal(15, newState.books.cad.oil[0].bidAmount)
    should.equal(1, newState.books.oil.cad.length)
    should.equal(10, newState.books.oil.cad[0].bidAmount)
  })

  it('removes order from books on CANCEL_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 0 } })
    state = state.setIn(['books', 'cad', 'oil'], [{
      accountId: 1,
      orderId: 'abc123',
      price: 1,
      bidAmount: 10,
      bidFlavour: 'cad',
      askFlavour: 'oil'
    }])
    let action = actions.cancelOrder({
      orderId: 'abc123'
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(0, newState.books.cad.oil.length)
  })

  it('reimburses bid amount to account balance on CANCEL_ORDER', function () {
    let state = initialState.orderBook
    state = state.setIn(['balances'], { 1: { cad: 0 } })
    state = state.setIn(['books', 'cad', 'oil'], [{
      accountId: 1,
      orderId: 'abc123',
      price: 1,
      bidAmount: 10,
      bidFlavour: 'cad',
      askFlavour: 'oil'
    }])
    let action = actions.cancelOrder({
      orderId: 'abc123'
    })
    action.signature = { publicKey: 1 }

    let newState = smartContract.orderBook(state, action)

    should.ok(newState)
    should.equal(10, newState.balances[1].cad)
  })
})

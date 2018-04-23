// External dependencies
import * as Interbit from 'interbit-core-alpha'

// Internal dependencies
import keys from './src/keys'
import initialState from './src/initialState'
import actions from './src/actions'
import smartContracts from './src/smartContracts'

// Chain config minimum details
const chainConfig = {
  name: 'to-do-list',
  description: 'Sample To-Do list application in Interbit',
  network: {},
  consensus: {
    type: 'PoW|Federated|PoC',
    validators: [keys.todo.public]
  }
}

const crypto = Interbit.Crypto(keys.todo.public, keys.todo.private)
const baseChain = Interbit.initBaseChain({initialState, actions, reducers: smartContracts, chainConfig, crypto})
const chainId = Interbit.createGenesis(baseChain)
const chainPromise = Interbit.animateChain({ baseChain, crypto, isCreator: true, chainId })

chainPromise.then(animatedChain => {  
  console.log('\r\nTo Do list example\r\n')
  console.log('Adding items...')

  let previousItems
  animatedChain.subscribe(() => {
    const appState = animatedChain.getState()

    if (previousItems !== appState.items) {
      console.log('\r\nCurrent To Do list:')
      appState.items.forEach((item, index) => {
        const isDoneLabel = item.isDone ? 'Done' : '    '
        console.log(' ' + isDoneLabel + ' | ' + item.label + ': ' + item.description)
      })
      console.log('\r\n')
      
      previousItems = appState.items
    }
  })

  // Add some items to the To Do list
  const addAction1 = actions.addItem(1, 'Buy groceries', '')
  const addAction2 = actions.addItem(2, 'Renew passport', '')
  const addAction3 = actions.addItem(3, 'Plan vacation', '')
  const addAction4 = actions.addItem(4, 'Get haircut', 'Downtown salon')
  const editAction = actions.editItem(1, 'Groceries', 'Bakery, Butcher, Supermarket', false)
  const toggleAction = actions.toggleItem(2)
  const actionsToTake = [].concat(addAction1, addAction2, addAction3, addAction4, editAction, toggleAction)

  let currentAction = 0
  const interval = setInterval(() => {
    if (currentAction >= actionsToTake.length) {
      return clearInterval(interval)
    }
    animatedChain.dispatch(actionsToTake[currentAction])
    currentAction++
  }, 2500)
})
.catch(error => {
  console.log('ERROR', error)
})

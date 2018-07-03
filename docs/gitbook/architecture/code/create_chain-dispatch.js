const {
  coreCovenant: {
    actionCreators: {
      startConsumeState,
      startProvideState
    }
  }
} = require('interbit-covenant-tools')

const chainAChainID = '6cffd9f24329c49d3a5047aa187c805e20e39923a15d7f9c427bc659225c08d2'
const chainBChainID = '32b9365f325da189439f6d453593cf4e0a5a06ead7e6bbecc1d0814c578df452'

const chainAInterface = cli.loadChain(chainAChainID)
const chainBInterface = cli.loadChain(chainBChainID)

const consumeAction = startConsumeState({
  provider: chainAChainID,
  mount: ['state', 'to', 'share'],
  joinName: 'MeowMeowMeow'
})
chainBInterface.dispatch(consumeAction)


const provideAction = startProvideState({
  consumer: chainBChainID,
  statePath: ['chainA', 'state'],
  joinName: 'MeowMeowMeow' // The same join name - this must match
})
chainAInterface.dispatch(provideAction)

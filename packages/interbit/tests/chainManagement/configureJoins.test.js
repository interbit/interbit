const assert = require('assert')
const configureJoins = require('../../src/chainManagement/configureJoins')

const mockChainInterface = assertionCallback => ({
  dispatch: action => assertionCallback(action)
})

const manifest = {
  chains: {
    banhmi: '0392rjeko0i9urfj0ow9siurj40pqw2ru9oserid3',
    pho: '09ifr0p9sweur5w30o9ruj590oowirju40po239qwiu4',
    lemongrasschicken: '930iurj49o0w3rijmuws3sujr40qp23eik9oq',
    springroll: '09opwir3pk0pw39ir4kq20p9o3ujemio98e4ju32',
    bbt: 'u09w3rujsrike3w2aps0o9rike43w20o9urjj4ew32',
    coldcoffee: 'js0sp9roif0wp29oriekd40q2pwo9ike34w2q0p'
  }
}

describe('configureJoins(chainInterface, joins, manifest)', () => {
  it('dispatches an "@@interbit/START_PROVIDE_STATE" for provide joins', () => {
    const joins = {
      provide: [
        {
          alias: 'banhmi',
          path: ['cucumber', 'daikonPickles', 'cilantro'],
          joinName: 'superdelicious'
        }
      ]
    }

    const expectedAction = {
      type: '@@interbit/START_PROVIDE_STATE',
      payload: {
        consumer: manifest.chains.banhmi,
        statePath: joins.provide[0].path,
        joinName: joins.provide[0].joinName
      }
    }

    const chainInterface = mockChainInterface(action => {
      assert.deepEqual(action, expectedAction)
    })

    configureJoins(chainInterface, joins, manifest)
  })

  it('dispatches an "@@interbit/START_CONSUME_STATE" for consume joins', () => {
    const joins = {
      consume: [
        {
          alias: 'pho',
          path: ['noodles', 'basil', 'broth'],
          joinName: 'ultratasty'
        }
      ]
    }

    const expectedAction = {
      type: '@@interbit/START_CONSUME_STATE',
      payload: {
        provider: manifest.chains.pho,
        mount: joins.consume[0].path,
        joinName: joins.consume[0].joinName
      }
    }

    const chainInterface = mockChainInterface(action => {
      assert.deepEqual(action, expectedAction)
    })

    configureJoins(chainInterface, joins, manifest)
  })

  it('dispatches an "@@interbit/AUTHORIZE_RECEIVE_ACTIONS" for provide joins', () => {
    const joins = {
      receiveActionFrom: [
        {
          alias: 'lemongrasschicken',
          authorizedActions: ['marinate', 'grill', 'munch']
        }
      ]
    }

    const expectedAction = {
      type: '@@interbit/AUTHORIZE_RECEIVE_ACTIONS',
      payload: {
        senderChainId: manifest.chains.lemongrasschicken,
        permittedActions: joins.receiveActionFrom[0].path
      }
    }

    const chainInterface = mockChainInterface(action => {
      assert.deepEqual(action, expectedAction)
    })

    configureJoins(chainInterface, joins, manifest)
  })

  it('dispatches an "@@interbit/AUTHORIZE_SEND_ACTIONS" for provide joins', () => {
    const joins = {
      sendActionTo: [
        {
          alias: 'springroll'
        }
      ]
    }

    const expectedAction = {
      type: '@@interbit/AUTHORIZE_SEND_ACTIONS',
      payload: {
        receiverChainId: manifest.chains.springroll
      }
    }

    const chainInterface = mockChainInterface(action => {
      assert.deepEqual(action, expectedAction)
    })

    configureJoins(chainInterface, joins, manifest)
  })
})

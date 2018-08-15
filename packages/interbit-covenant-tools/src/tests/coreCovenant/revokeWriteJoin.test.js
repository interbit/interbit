const assert = require('assert')
const Immutable = require('seamless-immutable')

const { PATHS } = require('../../coreCovenant/constants')
const {
  consuming: getConsuming,
  providing: getProviding,
  roles: getRoles,
  actionPermissions: getActionPermissions
} = require('../../coreCovenant/selectors')
const {
  revokeReceiveActions,
  revokeSendActions
} = require('../../coreCovenant/helpers/revokeJoin')

const CHAIN_ID =
  '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551'
const ACTION_TYPE = 'underTheHood/spoke/MOUNT_TOKEN'

const initialState = Immutable.from({
  interbit: {
    config: {
      consensus: 'PoA',
      providing: [
        {
          consumer:
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
          statePath: [
            'interbit',
            'received-actions',
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
            'action-status'
          ],
          joinName: 'WRITE-JOIN-ACTION-STATUS'
        },
        {
          consumer:
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
          statePath: [
            'interbit',
            'sent-actions',
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
            'pending-actions'
          ],
          joinName: 'WRITE-JOIN-PENDING-ACTIONS'
        }
      ],
      consuming: [
        {
          provider:
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
          mount: [
            'interbit',
            'received-actions',
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
            'pending-actions'
          ],
          joinName: 'WRITE-JOIN-PENDING-ACTIONS'
        },
        {
          provider:
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
          mount: [
            'interbit',
            'sent-actions',
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551',
            'action-status'
          ],
          joinName: 'WRITE-JOIN-ACTION-STATUS'
        }
      ],
      acl: {
        roles: {
          root: [
            'xk0EW198SwECAIDtQI5AZQk4tCKu12afQS7Rp8HPKTgE5rGfPHC+cp5Q9eH2ZTyUHvRMzaAGxfPbkIKxGd6GhebKpGUHhHt1yqMAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbX3xLBgsJBwgDAgkQCRUI9vYI998EFQgKAgMWAgEC\nGQECGwMCHgEAAH2/Af9uqS+6oaqIXZTiIDREUjsImdgDbDlCn+bt37lQrVNp\n7BqSLG/NkQXi/kduYTcai0shhrahM9WCQ8RyQ6LFZn94zk0EW198SwECAJlq\n5R0zoldewbftZOv23ys8CoMKYQ+0lxXIq8Tf9N9H4pd8f/aZEEITWoKTi4Y/\n9stsguxdpXY0GB22kg66+ncAEQEAAcJfBBgBCAATBQJbX3xLCRAJFQj29gj3\n3wIbDAAAZrQB/2CK3kBHmV7fF5WSJHW4p0vvg8xLcwjDxbn1J+dtbRKLCz1m\nu2f3tRYP9E2C5C7Eto5mUf4oqarp8zy9rIA18tE='
          ],
          'chain-4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551': [
            '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551'
          ]
        },
        actionPermissions: {
          '*': ['root'],
          'underTheHood/spoke/MOUNT_TOKEN': [
            'chain-4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551'
          ],
          '@@interbit/REMOVE_JOIN_CONFIG': [
            'chain-4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551'
          ]
        }
      },
      blockMaster:
        'xk0EW198SwECAIDtQI5AZQk4tCKu12afQS7Rp8HPKTgE5rGfPHC+cp5Q9eH2ZTyUHvRMzaAGxfPbkIKxGd6GhebKpGUHhHt1yqMAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbX3xLBgsJBwgDAgkQCRUI9vYI998EFQgKAgMWAgEC\nGQECGwMCHgEAAH2/Af9uqS+6oaqIXZTiIDREUjsImdgDbDlCn+bt37lQrVNp\n7BqSLG/NkQXi/kduYTcai0shhrahM9WCQ8RyQ6LFZn94zk0EW198SwECAJlq\n5R0zoldewbftZOv23ys8CoMKYQ+0lxXIq8Tf9N9H4pd8f/aZEEITWoKTi4Y/\n9stsguxdpXY0GB22kg66+ncAEQEAAcJfBBgBCAATBQJbX3xLCRAJFQj29gj3\n3wIbDAAAZrQB/2CK3kBHmV7fF5WSJHW4p0vvg8xLcwjDxbn1J+dtbRKLCz1m\nu2f3tRYP9E2C5C7Eto5mUf4oqarp8zy9rIA18tE=',
      covenantHash:
        '39b7ea8686af795ed509da1712396e97d2bf249490b62de25edb7892c0916c30'
    },
    chainId: 'd57adec5d408b2bdcbdcd46671bdf598fbe03baf2b78db584422c1193b4de58b',
    'received-actions': {
      '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551': {
        'pending-actions': {},
        'action-status': {}
      }
    },
    'sent-actions': {
      '4a733bc88e40ca97073a8620abaad200318ae11ea7312e5f41eae3c36c56f551': {
        'action-status': {},
        'pending-actions': {}
      }
    }
  },
  chainMetadata: {
    covenant: 'Interbit Under-the-Hood token consumer'
  },
  privateTokens: {},
  tokenRequests: {},
  providerTokens: {}
})

describe('revokeReceiveAction(state, chainId, actionType', () => {
  it('revokes receive actions for chain, leaves other joins alone', () => {
    const expectedActionPermissions = getActionPermissions(
      initialState
    ).without(ACTION_TYPE)

    const expectedState = initialState
      .setIn(PATHS.CONSUMING, [getConsuming(initialState)[1]])
      .setIn(PATHS.PROVIDING, [getProviding(initialState)[1]])
      .setIn(PATHS.ACTION_PERMISSIONS, expectedActionPermissions)

    const nextState = revokeReceiveActions(initialState, CHAIN_ID, ACTION_TYPE)

    assert.deepEqual(nextState, expectedState)
  })

  it('revokes ability to REMOVE_JOIN_CONFIG if this is the only join', () => {
    const state = initialState
      .setIn(PATHS.CONSUMING, [getConsuming(initialState)[0]])
      .setIn(PATHS.PROVIDING, [getProviding(initialState)[0]])

    const expectedActionPermissions = getActionPermissions(state)
      .without('@@interbit/REMOVE_JOIN_CONFIG')
      .without(ACTION_TYPE)

    const expectedState = state
      .setIn(PATHS.ACTION_PERMISSIONS, expectedActionPermissions)
      .setIn(PATHS.ROLES, getRoles(state).without(`chain-${CHAIN_ID}`))
      .setIn(PATHS.CONSUMING, [])
      .setIn(PATHS.PROVIDING, [])

    const nextState = revokeReceiveActions(state, CHAIN_ID, ACTION_TYPE)

    assert.deepEqual(nextState, expectedState)
  })
})

describe('revokeSendActions(chainId)', () => {
  it('revokes own ability to sendActions to a chain, leaves other join', () => {
    const expectedState = initialState
      .setIn(PATHS.CONSUMING, [getConsuming(initialState)[0]])
      .setIn(PATHS.PROVIDING, [getProviding(initialState)[0]])

    const nextState = revokeSendActions(initialState, CHAIN_ID)

    assert.deepEqual(nextState, expectedState)
  })

  it('revokes ability to REMOVE_JOIN_CONFIG if this is the only join', () => {
    const state = initialState
      .setIn(PATHS.CONSUMING, [getConsuming(initialState)[1]])
      .setIn(PATHS.PROVIDING, [getProviding(initialState)[1]])
      .setIn(
        PATHS.ACTION_PERMISSIONS,
        getActionPermissions(initialState).without(ACTION_TYPE)
      )

    const expectedActionPermissions = getActionPermissions(state).without(
      '@@interbit/REMOVE_JOIN_CONFIG'
    )
    const expectedState = state
      .setIn(PATHS.ACTION_PERMISSIONS, expectedActionPermissions)
      .setIn(PATHS.ROLES, getRoles(state).without(`chain-${CHAIN_ID}`))
      .setIn(PATHS.CONSUMING, [])
      .setIn(PATHS.PROVIDING, [])

    const nextState = revokeSendActions(state, CHAIN_ID)

    assert.deepEqual(nextState, expectedState)
  })
})

const assert = require('assert')
const Immutable = require('seamless-immutable')
const { revokeReadJoin } = require('../../coreCovenant/helpers/revokeJoin')
const {
  paths,
  actionPermissions,
  roles
} = require('../../coreCovenant/selectors')

// const WRITE_JOIN_NAME = 'WRITE_JOIN'
const READ_JOIN_NAME = 'READ_JOIN'
const OTHER_JOIN_NAME = 'DONT_REMOVE'

const initialState = Immutable.from({
  interbit: {
    config: {
      consensus: 'PoA',
      providing: [],
      consuming: [
        {
          provider:
            'e7d049846f5b4cf521d4508db4ed4321f09b36d98645a67e4e4445b02aca92ce',
          mount: ['sharedWithMe', READ_JOIN_NAME],
          joinName: READ_JOIN_NAME
        }
      ],
      acl: {
        roles: {
          root: [
            'xk0EW1eewQECALi0wWrtZhtPcE/g8YMWsQqA0JRyVNuO0pvMcoJ9M2jr8jebWOWRo1f/4WPcCe5DsXLE/Ktkm8oNgyKKsqlC+rcAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbV57BBgsJBwgDAgkQdLf8sHGij/MEFQgKAgMWAgEC\nGQECGwMCHgEAANr5Af4qOJcNCj9PqdgUsnJ32pSMv0agrdQ8aDaEm9ARyH6V\nSQUhynbF41zp9MJ4J+iWh5wbgvl+LItgQ45PfsPiDJPczk0EW1eewQECAJJm\n3dkcwu+NJ3AjIk0w/qffmVR/n2Wi2phQZbXxc7IH/Hy8RGI/ONU34kYVroo2\n/E7EaHW6PgCJJJO/HOyCCDEAEQEAAcJfBBgBCAATBQJbV57BCRB0t/ywcaKP\n8wIbDAAAdYECAJcpgSbcun7Iy2UvS/OIzsk/Tgky69Y+TU/j5SUrVGKPlhGK\nuOsZxIutsU1F56h8r+VBwVnQP9IDqSyrV6PVMTo='
          ],
          'chain-e7d049846f5b4cf521d4508db4ed4321f09b36d98645a67e4e4445b02aca92ce': [
            'e7d049846f5b4cf521d4508db4ed4321f09b36d98645a67e4e4445b02aca92ce'
          ]
        },
        actionPermissions: {
          '*': ['root'],
          '@@interbit/REMOVE_JOIN_CONFIG': [
            'chain-e7d049846f5b4cf521d4508db4ed4321f09b36d98645a67e4e4445b02aca92ce'
          ]
        }
      },
      blockMaster:
        'xk0EW1eewQECALi0wWrtZhtPcE/g8YMWsQqA0JRyVNuO0pvMcoJ9M2jr8jebWOWRo1f/4WPcCe5DsXLE/Ktkm8oNgyKKsqlC+rcAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJbV57BBgsJBwgDAgkQdLf8sHGij/MEFQgKAgMWAgEC\nGQECGwMCHgEAANr5Af4qOJcNCj9PqdgUsnJ32pSMv0agrdQ8aDaEm9ARyH6V\nSQUhynbF41zp9MJ4J+iWh5wbgvl+LItgQ45PfsPiDJPczk0EW1eewQECAJJm\n3dkcwu+NJ3AjIk0w/qffmVR/n2Wi2phQZbXxc7IH/Hy8RGI/ONU34kYVroo2\n/E7EaHW6PgCJJJO/HOyCCDEAEQEAAcJfBBgBCAATBQJbV57BCRB0t/ywcaKP\n8wIbDAAAdYECAJcpgSbcun7Iy2UvS/OIzsk/Tgky69Y+TU/j5SUrVGKPlhGK\nuOsZxIutsU1F56h8r+VBwVnQP9IDqSyrV6PVMTo=',
      covenantHash:
        '70e55fc52184f26912df7323846b50eab9083472264ce9ce1e5b9b5630709761'
    },
    chainId: 'fb257ab21a6dd10f53f7245219583b09a5efba9b9952532e22efdaacb4f7187f',
    'received-actions': {}
  }
})

describe('revokeReadJoin(state, joinName)', () => {
  it('does nothing if the join does not exist', () => {
    const nextState = revokeReadJoin(initialState, 'PHONY')
    assert.deepEqual(nextState, initialState)
  })

  it('revokes a read join and associated permissions', () => {
    const expectedState = initialState
      .setIn(paths.CONSUMING, [])
      .setIn(
        paths.ROLES,
        roles(initialState).without(
          'chain-e7d049846f5b4cf521d4508db4ed4321f09b36d98645a67e4e4445b02aca92ce'
        )
      )
      .setIn(
        paths.ACTION_PERMISSIONS,
        actionPermissions(initialState).without('@@interbit/REMOVE_JOIN_CONFIG')
      )
    const nextState = revokeReadJoin(initialState, READ_JOIN_NAME)

    assert.deepEqual(nextState, expectedState)
  })

  it('does not revoke permission if joins remain for chain after removing', () => {
    const state = initialState
      .setIn(
        paths.CONSUMING,
        initialState.interbit.config.consuming.concat({
          provider:
            '232a9eacc7029bb2790ced8672f7d5a3eb75df995b172ebb1aa41bb9c2580086',
          mount: ['sharedWithMe', OTHER_JOIN_NAME],
          joinName: OTHER_JOIN_NAME
        })
      )
      .setIn(
        [
          ...paths.ROLES,
          'chain-232a9eacc7029bb2790ced8672f7d5a3eb75df995b172ebb1aa41bb9c2580086'
        ],
        ['232a9eacc7029bb2790ced8672f7d5a3eb75df995b172ebb1aa41bb9c2580086']
      )
      .setIn(
        [...paths.ACTION_PERMISSIONS, '@@interbit/REMOVE_JOIN_CONFIG'],
        actionPermissions(initialState)['@@interbit/REMOVE_JOIN_CONFIG'].concat(
          'chain-232a9eacc7029bb2790ced8672f7d5a3eb75df995b172ebb1aa41bb9c2580086'
        )
      )

    const nextState = revokeReadJoin(state, OTHER_JOIN_NAME)

    assert.deepEqual(initialState, nextState)
  })
})

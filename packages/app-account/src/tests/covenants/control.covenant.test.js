import assert from 'assert'

import covenant from '../../interbit/control'
import { CHAIN_ALIASES, COVENANTS } from '../../interbit/control/constants'

const interbitConfigState = {
  config: {
    blockMaster: 'abc'
  },
  chainId: '123'
}

describe('control covenant reducer ', () => {
  it('sets shared covenant hash using mock manifest', () => {
    const state = covenant.initialState.set('interbit', interbitConfigState)
    const action = {
      type: '@@MANIFEST/SET_MANIFEST',
      payload: {
        manifest: {
          covenants: {
            [COVENANTS.MY_ACCOUNT]: 'hashalicious'
          }
        }
      }
    }

    const actualState = covenant.reducer(state, action)

    assert.ok(actualState)
    assert.equal(
      actualState.getIn([
        'privateChainHosting',
        'shared',
        CHAIN_ALIASES.PRIVATE,
        'covenantHash'
      ]),
      action.payload.manifest.covenants[COVENANTS.MY_ACCOUNT]
    )
  })

  it('sets shared covenant hash using actual manifest')
})

const should = require('should')

const {
  selectors: { pendingActionsForChain }
} = require('../../coreCovenant')
const rootCovenant = require('../../rootCovenant')
const defaultManifest = require('../testManifest.json')

describe('rootCovenant', () => {
  it('unsupported action does nothing', () => {
    const state = rootCovenant.initialState
    const action = {
      type: 'VORPAL',
      payload: {
        goes: 'Snicker snack'
      }
    }

    const nextState = rootCovenant.reducer(state, action)

    should.deepEqual(nextState, state)
  })

  it('SET_MANIFEST updates manifest', () => {
    const state = rootCovenant.initialState.setIn(
      ['interbit', 'chainId'],
      defaultManifest.chains.interbitRoot
    )

    const action = rootCovenant.actionCreators.setManifest(defaultManifest)

    const nextState = rootCovenant.reducer(state, action)

    should.deepEqual(nextState.interbitRoot.manifest, defaultManifest)
  })

  it.skip('SET_MANIFEST throws with incorrect manifest', () => {
    const state = rootCovenant.initialState.setIn(
      ['interbit', 'chainId'],
      defaultManifest.chains.interbitRoot
    )

    const manifest = defaultManifest.manifest.interbitRoot.chains.public
    const action = rootCovenant.actionCreators.setManifest(manifest)
    should.throws(() => {
      rootCovenant.reducer(state, action)
    }, /This chain is not a part of the manifest/)
  })

  it('SET_MANIFEST does nothing when manifest has a bad hash', () => {
    const manifest = {
      ...defaultManifest,
      manifest: {
        ...defaultManifest.manifest,
        hash: 'meowmeowmeowspaghetti'
      }
    }

    const state = rootCovenant.initialState
    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.deepEqual(nextState, state)
  })

  it.skip('SET_MANIFEST remote redispatches a SET_MANIFEST to all the child chains', () => {
    const state = rootCovenant.initialState.setIn(
      ['interbit', 'chainId'],
      defaultManifest.chains.interbitRoot
    )
    const action = rootCovenant.actionCreators.setManifest(defaultManifest)

    const nextState = rootCovenant.reducer(state, action)

    const expectedControlChainId = defaultManifest.chains.control
    const expectedPublicChainId = defaultManifest.chains.public

    should.equal(
      pendingActionsForChain(nextState, expectedControlChainId)[1].type,
      '@@MANIFEST/SET_MANIFEST'
    )
    should.equal(
      pendingActionsForChain(nextState, expectedPublicChainId)[0].type,
      '@@MANIFEST/SET_MANIFEST'
    )
  })

  it('merges initial state', () => {
    should.deepEqual(rootCovenant.initialState, {
      interbitRoot: { manifest: {}, fileLayer: {} }
    })
  })

  it('provides action creators', () => {
    should.exist(rootCovenant.actionCreators)
  })

  it('provides a reducer', () => {
    should.exist(rootCovenant.reducer)
  })
})

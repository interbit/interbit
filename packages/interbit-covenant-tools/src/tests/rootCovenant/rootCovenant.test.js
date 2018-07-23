const should = require('should')

const {
  selectors: { pendingActionsForChain }
} = require('../../coreCovenant')
const hashObject = require('../../rootCovenant/hash')
const { rootCovenant } = require('../../rootCovenant')
const defaultManifest = require('../testManifest.json')

describe('rootCovenant', () => {
  it('adds files to the tmp layer for distribution')

  it('applies join updates via redispatch', () => {
    const state = rootCovenant.initialState
      .setIn(['interbit', 'chainId'], defaultManifest.chains.interbitRoot)
      .setIn(['manifest'], defaultManifest)

    const interbitRoot = {
      ...defaultManifest.manifest.interbitRoot,
      joins: {
        ...defaultManifest.manifest.interbitRoot.joins,
        receiveActionFrom: [
          {
            alias: 'control',
            authorizedActions: ['@@MANIFEST/SET_MANIFEST']
          }
        ]
      }
    }
    delete interbitRoot.hash
    interbitRoot.hash = hashObject(interbitRoot)

    const manifest = {
      ...defaultManifest,
      manifest: {
        ...defaultManifest.manifest,
        interbitRoot
      }
    }
    delete manifest.hash
    manifest.hash = hashObject(manifest)

    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.ok(nextState)
    // TODO: Find out the real admin action type
    should.equal(nextState.sideEffects[0].type, '@@INTERBIT/JOIN_SMTH')
  })

  it('applies covenant changes via redispatch on covenant hash update', () => {
    const covenantHash = 'testCovenantHash'
    const state = rootCovenant.initialState
      .setIn(['interbit', 'chainId'], defaultManifest.chains.interbitRoot)
      .setIn(['manifest'], defaultManifest)

    const manifest = {
      ...defaultManifest,
      covenants: {
        ...defaultManifest,
        interbitRoot: {
          ...defaultManifest.covenants.interbitRoot,
          hash: covenantHash
        }
      }
    }
    delete manifest.hash
    manifest.hash = hashObject(manifest)
    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.ok(nextState)
    // TODO: Find out the real config change and check for it (I suspect this is right??)
    should.equal(nextState.interbit.covenantHash, covenantHash)
  })

  it('applies covenant changes via redispatch on configured covenant update', () => {
    const state = rootCovenant.initialState
      .setIn(['interbit', 'chainId'], defaultManifest.chains.interbitRoot)
      .setIn(
        ['interbit', 'config', 'covenantHash'],
        defaultManifest.covenants.interbitRoot.hash
      )
      .setIn(['manifest'], defaultManifest)

    const interbitRoot = {
      ...defaultManifest.manifest.interbitRoot,
      covenant: 'control'
    }
    delete interbitRoot.hash
    interbitRoot.hash = hashObject(interbitRoot)

    const manifest = {
      ...defaultManifest,
      manifest: {
        ...defaultManifest.manifest,
        interbitRoot
      }
    }
    delete manifest.hash
    manifest.hash = hashObject(manifest)

    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.ok(nextState)
    // TODO: Find out the real config change and check for it (I suspect this is right??)
    should.equal(
      nextState.interbit.covenantHash,
      defaultManifest.covenants.control.hash
    )
  })

  it('applies ACL updates via redispatch', () => {
    const state = rootCovenant.initialState
      .setIn(['interbit', 'chainId'], defaultManifest.chains.interbitRoot)
      .setIn(['manifest'], defaultManifest)

    const manifest = {
      ...defaultManifest
      // TODO: update manifest.manifest.interbitRoot.acl with new permissions
    }
    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.ok(nextState)
    // TODO: check the redispatch queue for an ACL update action
  })

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

  it('SET_MANIFEST throws with incorrect manifest', () => {
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

    should.deepEqual(state, nextState)
  })

  it('SET_MANIFEST remote redispatches a SET_MANIFEST to all the child chains', () => {
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

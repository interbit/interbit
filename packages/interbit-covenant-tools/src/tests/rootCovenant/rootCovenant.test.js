const should = require('should')

const {
  selectors: { pendingActionsForChain, providing, consuming, acl }
} = require('../../coreCovenant')
const hashObject = require('../../rootCovenant/hash')
const { PATHS } = require('../../coreCovenant/constants')
const { rootCovenant } = require('../../rootCovenant')
const defaultManifest = require('../testManifest.json')

describe('rootCovenant', () => {
  it('adds files to the tmp layer for distribution')

  it('applies join updates via redispatch when there was no prev manifest', () => {
    const state = rootCovenant.initialState.setIn(
      PATHS.CHAIN_ID,
      defaultManifest.chains.interbitRoot
    )

    const action = rootCovenant.actionCreators.setManifest(defaultManifest)

    const nextState = rootCovenant.reducer(state, action)

    should.ok(nextState)

    const nextActions = nextState.sideEffects
    should.equal(nextActions[1].type, '@@interbit/AUTHORIZE_SEND_ACTIONS')
    should.equal(
      nextActions[1].payload.receiverChainId,
      defaultManifest.chains.public
    )

    should.equal(nextActions[2].type, '@@interbit/AUTHORIZE_SEND_ACTIONS')
    should.equal(
      nextActions[2].payload.receiverChainId,
      defaultManifest.chains.control
    )
  })

  it('applies join updates via redispatch', () => {
    const state = rootCovenant.initialState
      .setIn(PATHS.CHAIN_ID, defaultManifest.chains.interbitRoot)
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

    const nextActions = nextState.sideEffects

    should.ok(nextActions)
    should.equal(2, nextActions.length)
    should.equal(nextActions[1].type, '@@interbit/AUTHORIZE_RECEIVE_ACTIONS')
    should.equal(
      nextActions[1].payload.senderChainId,
      defaultManifest.chains.control
    )
  })

  it('Removes joins no longer in manifest', () => {
    const state = rootCovenant.initialState
      .setIn(PATHS.CHAIN_ID, defaultManifest.chains.interbitRoot)
      .setIn(PATHS.PROVIDING, [
        {
          consumer:
            '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
          statePath: [
            'interbit',
            'sent-actions',
            '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
            'pending-actions'
          ],
          joinName: 'WRITE-JOIN-PENDING-ACTIONS'
        },
        {
          consumer:
            '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
          statePath: [
            'interbit',
            'sent-actions',
            '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
            'pending-actions'
          ],
          joinName: 'WRITE-JOIN-PENDING-ACTIONS'
        }
      ])
      .setIn(PATHS.CONSUMING, [
        {
          provider:
            '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
          mount: [
            'interbit',
            'sent-actions',
            '28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
            'action-status'
          ],
          joinName: 'WRITE-JOIN-ACTION-STATUS'
        },
        {
          provider:
            '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
          mount: [
            'interbit',
            'sent-actions',
            '7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162',
            'action-status'
          ],
          joinName: 'WRITE-JOIN-ACTION-STATUS'
        }
      ])
      .setIn(
        [
          ...PATHS.ROLES,
          'chain-28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f'
        ],
        ['28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f']
      )
      .setIn(
        [
          ...PATHS.ROLES,
          'chain-7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162'
        ],
        ['7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162']
      )
      .setIn(
        [...PATHS.ACTION_PERMISSIONS, '@@interbit/REMOVE_JOIN_CONFIG'],
        [
          'chain-28884c86bb5f73e48726ebdc466d45f4034a22c7ce9b69e5b75bd94d55f78d7f',
          'chain-7988dc0fe96bf5371909781b9cab0de21fcca8a740573267b1134e6889922162'
        ]
      )
      .setIn(['manifest'], defaultManifest)

    const interbitRoot = {
      ...defaultManifest.manifest.interbitRoot,
      joins: {}
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

    should.deepEqual(providing(nextState), [])
    should.deepEqual(consuming(nextState), [])
    should.deepEqual(acl(nextState), { roles: {}, actionPermissions: {} })
  })

  it('applies covenant changes via redispatch on covenant hash update', () => {
    const covenantHash = 'testCovenantHash'
    const state = rootCovenant.initialState
      .setIn(PATHS.CHAIN_ID, defaultManifest.chains.interbitRoot)
      .setIn(['manifest'], defaultManifest)

    const interbitRoot = {
      ...defaultManifest.manifest.interbitRoot,
      covenants: {
        ...defaultManifest.manifest.interbitRoot.covenants,
        interbitRoot: covenantHash
      }
    }
    delete interbitRoot.hash
    interbitRoot.hash = hashObject(interbitRoot)

    const manifest = {
      ...defaultManifest,
      covenants: {
        ...defaultManifest,
        interbitRoot: {
          ...defaultManifest.covenants.interbitRoot,
          hash: covenantHash
        }
      },
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

    const resultingAction = nextState.sideEffects[0]
    should.equal(resultingAction.type, '@@interbit/DEPLOY_COVENANT')
    should.equal(resultingAction.payload.covenantHash, covenantHash)
  })

  it('applies covenant changes via redispatch on configured covenant update', () => {
    const state = rootCovenant.initialState
      .setIn(PATHS.CHAIN_ID, defaultManifest.chains.interbitRoot)
      .setIn(PATHS.COVENANT_HASH, defaultManifest.covenants.interbitRoot.hash)
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

    const resultingAction = nextState.sideEffects[0]
    should.equal(resultingAction.type, '@@interbit/DEPLOY_COVENANT')
    should.equal(resultingAction.payload.covenantHash, 'control')
  })

  it.skip('applies ACL updates via redispatch', () => {
    const state = rootCovenant.initialState
      .setIn(PATHS.CHAIN_ID, defaultManifest.chains.interbitRoot)
      .setIn(['manifest'], defaultManifest)

    const manifest = {
      ...defaultManifest
      // TODO: update manifest.manifest.interbitRoot.acl with new permissions
    }
    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.ok(nextState)
    // TODO: check the redispatch queue for an ACL update action
    should.ok(false)
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
      PATHS.CHAIN_ID,
      defaultManifest.chains.interbitRoot
    )

    const action = rootCovenant.actionCreators.setManifest(defaultManifest)

    const nextState = rootCovenant.reducer(state, action)

    should.deepEqual(nextState.interbitRoot.manifest, defaultManifest)
  })

  it('SET_MANIFEST throws with incorrect manifest', () => {
    const state = rootCovenant.initialState.setIn(
      PATHS.CHAIN_ID,
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
      PATHS.CHAIN_ID,
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

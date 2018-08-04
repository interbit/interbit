const assert = require('assert')
const Immutable = require('seamless-immutable')
const { selectors } = require('../../middleware')

const {
  entireTree,
  getBlockMaster,
  getChain,
  getChainAliases,
  getChainId,
  getConfiguredChains,
  getConfiguredPeers,
  getInterbitStatus,
  getPublicKey,
  getSponsorConfig,
  interbitSubtree,
  isChainLoaded
} = selectors

describe('middleware.selectors', () => {
  const blockMaster = 'xk0EW1JjZQECALi9QKGYNTEa3o5O6i3mC...'

  const chainAlias1 = 'NoodlesAppPublic'
  const chainAlias2 = 'MyNoodles'

  const sponsorConfig = {
    blockMaster,
    sponsorChainId: '456789...',
    covenantHash: '876543...'
  }

  const chainId1 = '123456...'
  const chainState1 = {
    interbit: { chainId: chainId1, config: { blockMaster } },
    privateChainHosting: {
      [chainAlias2]: sponsorConfig
    }
  }

  const chainId2 = '789012...'
  const chainState2 = {
    ramen: ['noodles', 'soup', 'love'],
    interbit: { chainId: chainId2, config: { blockMaster } }
  }

  const middlewareState = Immutable.from({
    bootReactApp: chainAlias1,
    status: 'READY',
    publicKey: 'xk0EW2IFQgECAKY8gkAVo6LyqbYeL6iQO...',
    chains: {
      [chainAlias1]: chainState1,
      [chainAlias2]: chainState2
    },
    chainData: {
      [chainAlias1]: { status: 'BLOCKING' },
      [chainAlias2]: { status: 'LOADED' }
    },
    peers: ['mydomain.com:443'],
    version: '0.99.0'
  })

  const storeState = { interbit: middlewareState }

  describe('retrieves expected values from store', () => {
    it('interbitSubtree()', () => {
      assert.deepEqual(interbitSubtree(storeState), middlewareState)
    })
    it('getChainAliases()', () => {
      assert.deepEqual(getChainAliases(storeState), [chainAlias1, chainAlias2])
    })
    it('getChain()', () => {
      assert.deepEqual(
        getChain(storeState, { chainAlias: chainAlias2 }),
        chainState2
      )
    })
    it('getChainId()', () => {
      assert.deepEqual(
        getChainId(storeState, { chainAlias: chainAlias2 }),
        chainId2
      )
    })
    it('getBlockMaster()', () => {
      assert.deepEqual(
        getBlockMaster(storeState, { chainAlias: chainAlias2 }),
        blockMaster
      )
    })
    it('getSponsorConfig()', () => {
      assert.deepEqual(
        getSponsorConfig(storeState, {
          publicChainAlias: chainAlias1,
          privateChainAlias: chainAlias2
        }),
        sponsorConfig
      )
    })
    it('isChainLoaded() - chain has BLOCKING status', () => {
      assert.equal(isChainLoaded(storeState, { chainAlias: chainAlias1 }), true)
    })
    it('isChainLoaded() - chain has another status', () => {
      assert.equal(
        isChainLoaded(storeState, { chainAlias: chainAlias2 }),
        false
      )
    })
    it('getPublicKey()', () => {
      assert.equal(getPublicKey(storeState), middlewareState.publicKey)
    })
    it('getInterbitStatus()', () => {
      assert.equal(getInterbitStatus(storeState), middlewareState.status)
    })
    it('getConfiguredPeers()', () => {
      assert.deepEqual(getConfiguredPeers(storeState), middlewareState.peers)
    })
    it('getConfiguredChains()', () => {
      assert.deepEqual(
        getConfiguredChains(storeState),
        middlewareState.chainData
      )
    })
  })

  describe('can read values from reducer state', () => {
    it('getChainAliases()', () => {
      assert.deepEqual(
        getChainAliases(middlewareState, { subtree: entireTree }),
        [chainAlias1, chainAlias2]
      )
    })
    it('getChain()', () => {
      assert.deepEqual(
        getChain(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        chainState2
      )
    })
    it('getChainId()', () => {
      assert.deepEqual(
        getChainId(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        chainId2
      )
    })
    it('getBlockMaster()', () => {
      assert.deepEqual(
        getBlockMaster(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        blockMaster
      )
    })
    it('getSponsorConfig()', () => {
      assert.deepEqual(
        getSponsorConfig(middlewareState, {
          publicChainAlias: chainAlias1,
          privateChainAlias: chainAlias2,
          subtree: entireTree
        }),
        sponsorConfig
      )
    })
    it('isChainLoaded() - chain has BLOCKING status', () => {
      assert.equal(
        isChainLoaded(middlewareState, {
          chainAlias: chainAlias1,
          subtree: entireTree
        }),
        true
      )
    })
    it('isChainLoaded() - chain has another status', () => {
      assert.equal(
        isChainLoaded(middlewareState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        false
      )
    })
    it('getPublicKey()', () => {
      assert.equal(
        getPublicKey(middlewareState, { subtree: entireTree }),
        middlewareState.publicKey
      )
    })
    it('getInterbitStatus()', () => {
      assert.equal(
        getInterbitStatus(middlewareState, { subtree: entireTree }),
        middlewareState.status
      )
    })
    it('getConfiguredPeers()', () => {
      assert.deepEqual(
        getConfiguredPeers(middlewareState, { subtree: entireTree }),
        middlewareState.peers
      )
    })
    it('getConfiguredChains()', () => {
      assert.deepEqual(
        getConfiguredChains(middlewareState, { subtree: entireTree }),
        middlewareState.chainData
      )
    })
  })

  describe('provides sensible default without throwing', () => {
    it('interbitSubtree()', () => {
      assert.deepEqual(interbitSubtree(), {})
    })
    it('getChainAliases()', () => {
      assert.deepEqual(getChainAliases(), [])
    })
    it('getChain(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.deepEqual(getChain(storeState, { chainAlias }), {})
    })
    it('getChain()', () => {
      assert.deepEqual(getChain(), {})
    })
    it('getChainId(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.equal(getChainId(storeState, { chainAlias }), undefined)
    })
    it('getChain()', () => {
      assert.equal(getChainId(), undefined)
    })
    it('getBlockMaster(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.equal(getBlockMaster(storeState, { chainAlias }), undefined)
    })
    it('getBlockMaster()', () => {
      assert.equal(getBlockMaster(), undefined)
    })
    it('getSponsorConfig(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.deepEqual(
        getSponsorConfig(storeState, {
          publicChainAlias: chainAlias1,
          privateChainAlias: chainAlias
        }),
        {}
      )
    })
    it('getSponsorConfig()', () => {
      assert.deepEqual(getSponsorConfig(), {})
    })
    it('isChainLoaded(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.equal(isChainLoaded(storeState, { chainAlias }), false)
    })
    it('isChainLoaded()', () => {
      assert.equal(isChainLoaded(), false)
    })
    it('getPublicKey()', () => {
      assert.equal(getPublicKey(), undefined)
    })
    it('getInterbitStatus()', () => {
      assert.equal(getInterbitStatus(), 'UNKNOWN')
    })
    it('getConfiguredPeers()', () => {
      assert.deepEqual(getConfiguredPeers(), [])
    })
    it('getConfiguredChains()', () => {
      assert.deepEqual(getConfiguredChains(), {})
    })
  })
})

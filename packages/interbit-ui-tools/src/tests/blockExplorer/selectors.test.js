const assert = require('assert')
const Immutable = require('seamless-immutable')
const { selectors } = require('../../blockExplorer')

const {
  entireTree,
  blockExplorerSubtree,
  getChainAliases,
  getChainState,
  getSelectedBlockHash,
  getSelectedChainAlias,
  getShowRawState
} = selectors

describe('blockExplorer.selectors', () => {
  const chainAlias1 = 'CoolApp'
  const chainState1 = {
    chainAlias: chainAlias1,
    state: { cat: 'meow', ultimateAnswer: 42 },
    interbit: { chainId: '123456' },
    blocks: [
      {
        actions: [{ type: 'DO_STUFF', payload: 49 }],
        blockHash: '1234'
      },
      {
        actions: [{ type: 'DO_OTHER_STUFF', payload: 'meow' }],
        content: { previousHash: '1234' },
        blockHash: '5678'
      },
      {
        actions: [{ type: 'DO_STUFF', payload: 42 }],
        content: { previousHash: '5678' },
        blockHash: '3456'
      }
    ]
  }

  const chainAlias2 = 'MyNoodles'
  const chainState2 = {
    chainAlias: chainAlias2,
    state: { ramen: ['noodles', 'soup', 'love'] },
    interbit: { chainId: '789012' },
    blocks: [
      {
        actions: [],
        blockHash: 'genesis'
      },
      {
        actions: [{ type: 'RATE_MEAL', payload: { ramen: 'meh' } }],
        content: { previousHash: 'genesis' },
        blockHash: '2345'
      },
      {
        actions: [
          { type: 'RATE_MEAL', payload: { ramen: ['noodles', 'soup', 'love'] } }
        ],
        content: { previousHash: '2345' },
        blockHash: '6789'
      }
    ]
  }

  const selectedChain = chainAlias1
  const selectedBlockHash = 'ABC123'
  const showRawState = true

  const blockExplorerState = Immutable.from({
    chains: {
      [chainAlias1]: chainState1,
      [chainAlias2]: chainState2
    },
    selectedChain,
    selectedBlockHash,
    showRawState
  })

  const storeState = { blockExplorer: blockExplorerState }

  describe('retrieves expected values from store', () => {
    it('blockExplorerSubtree()', () => {
      assert.deepEqual(blockExplorerSubtree(storeState), blockExplorerState)
    })
    it('getChainAliases()', () => {
      assert.deepEqual(getChainAliases(storeState), [chainAlias1, chainAlias2])
    })
    it('getChainState()', () => {
      assert.deepEqual(
        getChainState(storeState, { chainAlias: chainAlias2 }),
        chainState2
      )
    })
    it('getSelectedChainAlias()', () => {
      assert.equal(getSelectedChainAlias(storeState), selectedChain)
    })
    it('getSelectedBlockHash()', () => {
      assert.equal(getSelectedBlockHash(storeState), selectedBlockHash)
    })
    it('getShowRawState()', () => {
      assert.equal(getShowRawState(storeState), showRawState)
    })
  })

  describe('can read values from reducer state', () => {
    it('getChainAliases()', () => {
      assert.deepEqual(
        getChainAliases(blockExplorerState, { subtree: entireTree }),
        [chainAlias1, chainAlias2]
      )
    })
    it('getChainState()', () => {
      assert.deepEqual(
        getChainState(blockExplorerState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        chainState2
      )
    })
    it('getSelectedChainAlias()', () => {
      assert.equal(
        getSelectedChainAlias(blockExplorerState, { subtree: entireTree }),
        selectedChain
      )
    })
    it('getSelectedBlockHash()', () => {
      assert.equal(
        getSelectedBlockHash(blockExplorerState, { subtree: entireTree }),
        selectedBlockHash
      )
    })
    it('getShowRawState()', () => {
      assert.equal(
        getShowRawState(blockExplorerState, { subtree: entireTree }),
        showRawState
      )
    })
  })

  describe('provides sensible default without throwing', () => {
    it('blockExplorerSubtree()', () => {
      assert.deepEqual(blockExplorerSubtree(), {})
    })
    it('getChainAliases()', () => {
      assert.deepEqual(getChainAliases(), [])
    })
    it('getChainState(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.deepEqual(getChainState(storeState, { chainAlias }), {
        chainAlias,
        state: {},
        interbit: {},
        blocks: []
      })
    })
    it('getChainState(): chain alias not specified', () => {
      assert.deepEqual(getChainState(storeState), {
        chainAlias: 'No chain selected',
        state: {},
        interbit: {},
        blocks: []
      })
    })
    it('getChainState(): no arguments', () => {
      assert.deepEqual(getChainState(), {
        chainAlias: 'No chain selected',
        state: {},
        interbit: {},
        blocks: []
      })
    })
    it('getChainState()', () => {
      assert.deepEqual(
        getChainState(storeState, { chainAlias: chainAlias2 }),
        chainState2
      )
    })
    it('getSelectedChainAlias()', () => {
      assert.equal(getSelectedChainAlias(), undefined)
    })
    it('getSelectedBlockHash()', () => {
      assert.equal(getSelectedBlockHash(), undefined)
    })
    it('getShowRawState()', () => {
      assert.equal(getShowRawState(), false)
    })
  })
})

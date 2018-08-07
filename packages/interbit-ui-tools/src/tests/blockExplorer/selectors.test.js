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
      assert.deepStrictEqual(
        blockExplorerSubtree(storeState),
        blockExplorerState
      )
    })
    it('getChainAliases()', () => {
      assert.deepStrictEqual(getChainAliases(storeState), [
        chainAlias1,
        chainAlias2
      ])
    })
    it('getChainState()', () => {
      assert.deepStrictEqual(
        getChainState(storeState, { chainAlias: chainAlias2 }),
        chainState2
      )
    })
    it('getSelectedChainAlias()', () => {
      assert.strictEqual(getSelectedChainAlias(storeState), selectedChain)
    })
    it('getSelectedBlockHash()', () => {
      assert.strictEqual(getSelectedBlockHash(storeState), selectedBlockHash)
    })
    it('getShowRawState()', () => {
      assert.strictEqual(getShowRawState(storeState), showRawState)
    })
  })

  describe('can read values from reducer state', () => {
    it('getChainAliases()', () => {
      assert.deepStrictEqual(
        getChainAliases(blockExplorerState, { subtree: entireTree }),
        [chainAlias1, chainAlias2]
      )
    })
    it('getChainState()', () => {
      assert.deepStrictEqual(
        getChainState(blockExplorerState, {
          chainAlias: chainAlias2,
          subtree: entireTree
        }),
        chainState2
      )
    })
    it('getSelectedChainAlias()', () => {
      assert.strictEqual(
        getSelectedChainAlias(blockExplorerState, { subtree: entireTree }),
        selectedChain
      )
    })
    it('getSelectedBlockHash()', () => {
      assert.strictEqual(
        getSelectedBlockHash(blockExplorerState, { subtree: entireTree }),
        selectedBlockHash
      )
    })
    it('getShowRawState()', () => {
      assert.strictEqual(
        getShowRawState(blockExplorerState, { subtree: entireTree }),
        showRawState
      )
    })
  })

  describe('provides sensible default without throwing', () => {
    it('blockExplorerSubtree()', () => {
      assert.deepStrictEqual(blockExplorerSubtree(), {})
    })
    it('getChainAliases()', () => {
      assert.deepStrictEqual(getChainAliases(), [])
    })
    it('getChainState(): unknown chain alias', () => {
      const chainAlias = 'UNKNOWN'
      assert.deepStrictEqual(getChainState(storeState, { chainAlias }), {
        chainAlias,
        state: {},
        interbit: {},
        blocks: []
      })
    })
    it('getChainState(): chain alias not specified', () => {
      assert.deepStrictEqual(getChainState(storeState), {
        chainAlias: 'No chain selected',
        state: {},
        interbit: {},
        blocks: []
      })
    })
    it('getChainState(): no arguments', () => {
      assert.deepStrictEqual(getChainState(), {
        chainAlias: 'No chain selected',
        state: {},
        interbit: {},
        blocks: []
      })
    })
    it('getSelectedChainAlias()', () => {
      assert.strictEqual(getSelectedChainAlias(), undefined)
    })
    it('getSelectedBlockHash()', () => {
      assert.strictEqual(getSelectedBlockHash(), undefined)
    })
    it('getShowRawState()', () => {
      assert.strictEqual(getShowRawState(), false)
    })
  })
})

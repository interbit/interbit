/**
 * @jest-environment node
 */
const assert = require('assert')

const { createMockDataStore, createTestContext } = require('.')

describe('testContext', () => {
  describe('createDatastore', () => {
    it('Can store Key/value pairs', () => {
      const datastore = createMockDataStore()
      const key = 'some key'
      const value = { a: 1, b: 'thingy', c: { d: 'nested' } }

      datastore.setItem(key, value)

      assert(datastore.hasItem(key))

      assert.deepStrictEqual(datastore.getItem(key), value)
    })
  })

  describe('createTestContext(dataStore)', () => {
    it('Creates a testContext using interbit', async () => {
      const config = { chainData: {}, peers: ['abc.com'] }
      const testContext = createTestContext(config)

      try {
        assert.deepStrictEqual(testContext.getConfig(), config)
        assert.strictEqual(testContext.isInterbitLoaded(), false)
        assert.throws(() => testContext.getInterbit())

        const interbitContext = await testContext.waitForInterbit()
        assert.strictEqual(testContext.isInterbitLoaded(), true)
        assert.strictEqual(testContext.getInterbit(), interbitContext)

        assert.ok(interbitContext.interbit)
        assert.ok(interbitContext.hypervisor)
        assert.ok(interbitContext.cli)
        assert.ok(interbitContext.publicKey)
        assert.ok(interbitContext.chains)
        assert.ok(interbitContext.localDataStore)
      } finally {
        testContext.unloadInterbit()
      }
    })
  })
})

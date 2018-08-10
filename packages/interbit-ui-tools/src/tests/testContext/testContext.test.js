/**
 * @jest-environment node
 */
const assert = require('assert')

const { createMockDataStore, createTestContext } = require('.')

const CI_INTERBIT_KEY_GEN_TIMEOUT = 20000

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
    let testContext

    afterEach(() => {
      if (testContext) {
        testContext.unloadInterbit()
      }
    })

    it(
      'Creates a testContext using interbit',
      async () => {
        const config = { chainData: {}, peers: ['abc.com'] }
        testContext = createTestContext(config)

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
      },
      CI_INTERBIT_KEY_GEN_TIMEOUT
    )
  })
})

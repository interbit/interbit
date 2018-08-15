/**
 * @jest-environment node
 */
const assert = require('assert')

const { createMockDataStore, createTestContext } = require('.')

const CI_INTERBIT_KEY_GEN_TIMEOUT = 45000

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
    const env = { ...{}, ...process.env }

    const cleanup = async caller => {
      if (testContext) {
        console.log(`Cleaning up interbit: ${caller}`)
        await testContext.unloadInterbit()
        testContext = undefined
      }
    }

    beforeEach(async () => {
      process.env.DB_PATH = `./db-${Date.now()}`
    })

    afterEach(async () => {
      await cleanup('jest afterEach()')
      process.env = env
    })

    it(
      'Creates a testContext using interbit',
      async () => {
        const config = { chainData: {}, peers: ['abc.com'] }
        testContext = createTestContext(config)

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
          await cleanup('finally block')
        }
      },
      CI_INTERBIT_KEY_GEN_TIMEOUT
    )
  })
})

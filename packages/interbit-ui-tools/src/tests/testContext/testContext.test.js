/**
 * @jest-environment node
 */
const assert = require('assert')
const fs = require('fs-extra')

const { createMockDataStore, createTestContext } = require('.')

const CI_INTERBIT_KEY_GEN_TIMEOUT = 45000

describe('testContext', () => {
  describe('createDatastore', () => {
    it('Can store Key/value pairs', () => {
      const datastore = createMockDataStore()
      const key = 'some key'
      const value = { a: 1, b: 'thingy', c: { d: 'nested' } }

      datastore.setItem(key, value)

      assert(datastore.keys().includes(key))

      assert.deepStrictEqual(datastore.getItem(key), value)
    })
  })

  describe('createTestContext(dataStore)', () => {
    let testContext
    let dbPath
    const env = { ...{}, ...process.env }

    const cleanup = async caller => {
      if (testContext) {
        console.log(`Cleaning up interbit: ${caller}`)
        await testContext.unloadInterbit()
        testContext = undefined
      }
      if (dbPath) {
        console.log(`Cleaning up interbit DB: ${dbPath}`)
        fs.remove(dbPath)
      }
    }

    beforeEach(async () => {
      dbPath = `./db-${Date.now()}`
      process.env.DB_PATH = dbPath
    })

    afterEach(async () => {
      await cleanup('jest afterEach()')
      process.env = env
    })

    it(
      'Creates a testContext using interbit and buffers it for reuse',
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

          const reloadedContext = await testContext.waitForInterbit()
          assert.strictEqual(reloadedContext, interbitContext)
        } finally {
          await cleanup('finally block')
        }
      },
      CI_INTERBIT_KEY_GEN_TIMEOUT
    )
  })
})

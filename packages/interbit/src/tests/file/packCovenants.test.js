const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const { packCovenants } = require('../../file/packCovenants')

const location = 'tmp'

// Blocked: Skip until core #17 is resolved and packCovenants uses exposed hash func
// starting a hypervisor here and running monorepo tests in parallel with the test-interbit
// lib causes database and hypervisor collisions.
describe.skip('packCovenants(location, covenantConfig)', () => {
  let dbPath

  beforeEach(async () => {
    dbPath = `./db-${Date.now()}`
    await fs.mkdirp(location)
  })

  afterEach(async () => {
    await fs.remove(location)
    await fs.remove(dbPath)
  })

  const assertCovenantCorrectness = async (covenantName, result) => {
    assert.ok(result[covenantName])

    const hash = result[covenantName].hash
    const filename = result[covenantName].filename

    assert.ok(hash)
    assert.ok(filename)

    const isHashInFilename = filename.indexOf(hash) > -1
    assert.ok(
      isHashInFilename,
      'Filename of packed covenant does not include hash'
    )

    const isPackedFileReal = await fs.exists(path.join(location, filename))
    assert.ok(isPackedFileReal, 'Packed covenant file does not exist')
  }

  it(
    'packs the configured covenant and root and puts it in location/covenants',
    async () => {
      const covenantConfig = {
        testCovenant: {
          location: path.join(__dirname, '../testData/covenant')
        }
      }
      const options = { dbPath }
      const result = await packCovenants(location, covenantConfig, options)

      await assertCovenantCorrectness('testCovenant', result)
      await assertCovenantCorrectness('interbitRoot', result)
    },
    5000
  )
})

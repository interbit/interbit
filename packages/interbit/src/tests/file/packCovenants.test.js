const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const { packCovenants } = require('../../file/packCovenants')

const location = 'tmp'

describe('packCovenants(location, covenantConfig)', () => {
  beforeEach(async () => {
    await fs.mkdirp(location)
  })

  afterEach(async () => {
    await fs.remove(location)
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

  it
    .only(
      'packs the configured covenant and root and puts it in location/covenants',
      async () => {
        const covenantConfig = {
          testCovenant: {
            location: path.join(__dirname, '../testData/covenant')
          }
        }
        const result = await packCovenants(location, covenantConfig)

        await assertCovenantCorrectness('testCovenant', result)
        await assertCovenantCorrectness('interbitRoot', result)
      }
    )
    .timeout(200000)
})

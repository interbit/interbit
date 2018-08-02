const path = require('path')
const assert = require('assert')
const interbit = require('../../')

const prepareTestLocation = require('./prepareTestLocation')
const log = require('../../log')

const testKeys = async () => {
  const { location, cleanup } = prepareTestLocation('keys')
  const filename = path.join(location, 'keys.json')
  const options = {
    filename
  }

  await interbit.keys(options)

  log.info('Generated keys')

  // eslint-disable-next-line
  const keys = require(path.join(process.cwd(), filename))

  assert.ok(keys.publicKey)
  assert.ok(keys.privateKey)

  log.success('Successfully generated a key pair')

  cleanup()
}

module.exports = testKeys

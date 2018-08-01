const fs = require('fs-extra')
const path = require('path')
const assert = require('assert')
const uuid = require('uuid')
const interbit = require('interbit')

const log = require('../log')

const testKeys = async () => {
  const filename = path.join('tmp', uuid.v4(), 'keys.json')
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

  fs.remove('tmp')
}

module.exports = testKeys

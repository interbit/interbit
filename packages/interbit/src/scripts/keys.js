const interbit = require('interbit-core')
const path = require('path')

const writeJsonFile = require('../file/writeJsonFile')

const keys = async options => {
  const keyPair = await interbit.generateKeyPair()
  const filename = options.filename.endsWith('.json')
    ? path.resolve(options.filename)
    : path.resolve(`${options.filename}.json`)

  writeJsonFile(filename, keyPair)
}

module.exports = keys

const interbit = require('interbit-core')
const path = require('path')
const fs = require('fs-extra')

const writeJsonFile = require('../file/writeJsonFile')

const keys = async options => {
  const filename = options.filename.endsWith('.json')
    ? path.resolve(options.filename)
    : path.resolve(`${options.filename}.json`)

  if (fs.existsSync(filename)) {
    throw new Error(`Can't write keys. File already exists at ${filename}`)
  }

  const keyPair = await interbit.generateKeyPair()
  writeJsonFile(filename, keyPair)
}

module.exports = keys

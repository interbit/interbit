const interbit = require('interbit-core')
const path = require('path')
const fs = require('fs-extra')

const writeJsonFile = require('../file/writeJsonFile')

const keys = async options => {
  const filename = options.filename.endsWith('.json')
    ? path.resolve(options.filename)
    : path.resolve(`${options.filename}.json`)

  if (await fs.exists(filename)) {
    throw new Error(`Can't write keys. File already exists at ${filename}`)
  }

  const dir = path.dirname(filename)
  await fs.mkdirp(dir)

  const keyPair = await interbit.generateKeyPair()
  writeJsonFile(filename, keyPair)
}

module.exports = keys

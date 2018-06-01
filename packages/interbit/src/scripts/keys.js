const interbit = require('interbit-core')
const path = require('path')
const fs = require('fs-extra')

const keys = async options => {
  const keyPair = await interbit.generateKeyPair()
  const filename = options.filename.endsWith('.json')
    ? path.resolve(options.filename)
    : path.resolve(`${options.filename}.json`)

  const writeOpts = {
    encoding: 'utf8'
  }

  fs.writeFileSync(filename, JSON.stringify(keyPair, null, 2), writeOpts)
}

module.exports = keys

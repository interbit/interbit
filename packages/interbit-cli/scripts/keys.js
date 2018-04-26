const interbit = require('interbit-core')
const path = require('path')
const fs = require('fs-extra')
const { getArg } = require('interbit-utils')

const keys = async () => {
  const filenameOption = getArg(process.argv, '--filename')
  const keyPair = await interbit.generateKeyPair()
  const filename = filenameOption.endsWith('.json')
    ? path.resolve(filenameOption)
    : path.resolve(`${filenameOption}.json`)

  const writeOpts = {
    encoding: 'utf8'
  }

  fs.writeFileSync(filename, JSON.stringify(keyPair, null, 2), writeOpts)
}

keys()

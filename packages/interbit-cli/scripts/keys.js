const interbit = require('interbit-core')
const path = require('path')
const fs = require('fs-extra')
const { getArg } = require('interbit')

const keys = async () => {
  const filenameOption = getArg(process.argv, '--filename')

  if (!filenameOption) {
    console.error(
      '"interbit keys" command must be used with a --filename option'
    )
    process.exit(1)
  }

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

const fs = require('fs-extra')

const writeJsonFile = (filename, obj) => {
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2), {
    encoding: 'utf8'
  })
}

module.exports = writeJsonFile

const path = require('path')
const uuid = require('uuid')
const fs = require('fs-extra')
const log = require('../../log')

const prepareTestLocation = label => {
  const location = path.join('tmp', `${uuid.v4()}-${label}`)

  return {
    location,
    cleanup: async () => {
      log.info('Cleaning up...')
      await fs.remove(location)
      const files = await fs.readdir('tmp')
      if (!files.length) {
        await fs.remove('tmp')
      }
      log.info('... cleaned up.')
    }
  }
}

module.exports = prepareTestLocation

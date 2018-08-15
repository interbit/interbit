const fs = require('fs-extra')
const path = require('path')
const should = require('should')
const keys = require('../../scripts/keys')

const filepath = path.join(__dirname, '../../../tmp/keys.json')

describe('keys', () => {
  beforeEach(async () => {
    await fs.mkdirp('tmp')
  })

  afterEach(async () => {
    await fs.remove('tmp')
  })

  // Note: Wallaby hides the secure RNG so this test fails, but only in wallaby.
  // Note-II: I have heard whispers that you can get wallaby to mock the crypto
  //  module. This may solve the open-pgp/keys failing in wallaby only thing.
  it(
    'generates a key pair at filename',
    async () => {
      const options = {
        filename: 'tmp/keys.json'
      }
      await keys(options)

      // eslint-disable-next-line
    const file = require(filepath)

      should.ok(file.publicKey)
      should.ok(file.privateKey)
    },
    5000
  )

  it('throws when filename already exists', async () => {
    await fs.writeFile(filepath, 'test')

    const options = {
      filename: filepath
    }
    keys(options).should.be.rejectedWith(
      /^Can't write keys. File already exists/
    )
  })
})

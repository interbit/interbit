const fs = require('fs-extra')
// const should = require('should')
// const build = require('../../scripts/build')

describe('build(options)', () => {
  beforeEach(async () => {
    await fs.mkdirp('tmp')
  })

  afterEach(async () => {
    await fs.remove('tmp')
  })

  it('packs covenants, outputs a manifest, updates index.html')
  it('does nothing without a config')
  it('does not replace genesis blocks in manifest when they exist already')
})

const path = require('path')
const assert = require('should')

const args = require('../../args')

let argv

describe('args', () => {
  beforeEach(() => {
    argv = process.argv
  })

  afterEach(() => {
    process.argv = argv
  })

  it('has expected api', () => {
    assert.ok(args.argOptions)
    assert.ok(args.getArg)
    assert.ok(args.getArtifactsLocation)
    assert.ok(args.getConfig)
    assert.ok(args.getConnect)
    assert.ok(args.getKeyPair)
    assert.ok(args.getManifest)
    assert.ok(args.getPort)
  })

  it('gets artifacts location', () => {
    const artifacts = path.join(process.cwd(), 'dist')
    process.argv = ['--artifacts', artifacts]
    const arg = args.getArtifactsLocation()

    assert.equal(arg, artifacts)
  })

  it('gets config if it exists', () => {
    const config = path.join(__dirname, '../testData/interbit.config.js')
    process.argv = ['--config', config]

    const arg = args.getConfig()

    // eslint-disable-next-line
    const configContents = require(config)

    assert.deepEqual(arg, configContents)
  })

  it('gets undefined if there is no config file', () => {
    const config = path.join(__dirname, 'interbit.config.js')
    process.argv = ['--config', config]

    const arg = args.getConfig()

    assert.equal(arg, undefined)
  })

  it('gets manifest', () => {
    const manifest = path.join(__dirname, '../testData/interbit.manifest.json')
    process.argv = ['--manifest', manifest]

    const arg = args.getManifest()

    // eslint-disable-next-line
    const manifestContents = require(manifest)

    assert.deepEqual(arg, manifestContents)
  })

  it('returns undefined if there is no manifest file', () => {
    const manifest = path.join(__dirname, 'interbit.manifest.json')
    process.argv = ['--manifest', manifest]

    const arg = args.getManifest()

    assert.deepEqual(arg, undefined)
  })

  it('gets connect flag', () => {
    process.argv = ['--connect']

    const arg = args.getConnect()

    assert.equal(arg, true)
  })

  it('gets a port', () => {
    const port = '666'
    process.argv = ['--port', port]

    const arg = args.getPort()

    assert.equal(arg, port)
  })

  it('gets a keyPair', () => {
    const keyPair = path.join(__dirname, '../testData/keyPair.json')
    process.argv = ['--key-pair', keyPair]

    const arg = args.getKeyPair()

    // eslint-disable-next-line
    const keyPairContents = require(keyPair)
    assert.equal(arg, keyPairContents)
  })
})

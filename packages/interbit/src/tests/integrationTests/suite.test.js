const testKeys = require('./keys')
const testDeploy = require('./deploy')
const testBuild = require('./build')
const testStart = require('./start')

const TIMEOUT = 30000

test('interbit build from config to specified directory', testBuild, TIMEOUT)
test('interbit start in dev mode', testStart, TIMEOUT)
test('interbit keys generates a keypair', testKeys, TIMEOUT)
test(
  'interbit keys>build>deploy runs correctly configured',
  testDeploy,
  TIMEOUT
)

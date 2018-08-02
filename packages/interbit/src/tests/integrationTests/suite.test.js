const testKeys = require('./keys')
const testDeploy = require('./deploy')
const testBuild = require('./build')
const testStart = require('./start')

test('interbit build from config to specified directory', testBuild, 10000)
test('interbit start in dev mode', testStart, 10000)
test('interbit keys generates a keypair', testKeys, 5000)
test('interbit keys>build>deploy runs correctly configured', testDeploy, 20000)

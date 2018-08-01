const testBuild = require('./build')
const testStart = require('./start')

test('interbit build from config to specified directory', testBuild, 10000)
test('interbit start in dev mode', testStart, 10000)

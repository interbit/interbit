const { runBrowserStackTest } = require('../helpers/mttf')
const { reloadAccount } = require('../helpers/reload-account')

runBrowserStackTest(reloadAccount, 10)

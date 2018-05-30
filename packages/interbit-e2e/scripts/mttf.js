const { runBrowserStackTest } = require('../helpers/mttf')
const { createAccount } = require('../helpers/create-account')

runBrowserStackTest(createAccount, 10)

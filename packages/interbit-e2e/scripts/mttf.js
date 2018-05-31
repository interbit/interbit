const { runBrowserStackTest } = require('../helpers/runTimedBrowserStackTest')
const { createAccount } = require('../e2eSeleniumTests/create-account')

runBrowserStackTest(createAccount, 10)

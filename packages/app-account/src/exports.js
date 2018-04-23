// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const privateCovenant = require('./interbit/my-account')
const publicCovenant = require('./interbit/public')
const controlCovenant = require('./interbit/control')
const githubOAuthCovenant = require('./interbit/github-kyc')

module.exports = {
  publicCovenant,
  privateCovenant,
  controlCovenant,
  githubOAuthCovenant
}

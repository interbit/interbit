// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT

const args = require('./args')
const chainManagement = require('./chainManagement')
const config = require('./config')
const file = require('./file')
const manifest = require('./manifest')
const scripts = require('./scripts')

const logo = require('./logo')

module.exports = {
  logo,
  ...args,
  ...chainManagement,
  ...config,
  ...file,
  ...manifest,
  ...scripts
}

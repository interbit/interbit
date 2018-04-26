// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { hoistPackages } = require('interbit')

const appLocation = process.cwd()
const interbitLocation = `${appLocation}/src/interbit`
// eslint-disable-next-line import/no-dynamic-require
const interbitConfig = require(`${interbitLocation}/interbit.config.js`)

hoistPackages({
  appLocation,
  covenantConfig: interbitConfig.covenants
})

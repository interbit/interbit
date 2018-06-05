// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  argOptions,
  getConfig,
  getManifest,
  isArg,
  getArg,
  logo,
  start
} = require('interbit')

const run = async () => {
  try {
    console.log(logo)
    const options = getOptions(process.argv)

    if (!options.config) {
      console.error(
        'interbit start: Could not find a config file to start with'
      )
      process.exit(1)
    }

    if (!options.dbPath) {
      console.warn(
        'interbit start: --dbPath option was not provided. This may cause database LOCK errors on some systems.'
      )
    } else {
      console.warn(
        'interbit start: --dbPath option will set $DB_PATH environment variable.'
      )
    }

    if (
      process.env.DB_PATH &&
      options.dbPath &&
      process.env.DB_PATH !== options.dbPath
    ) {
      console.warn(
        'interbit start: $DB_PATH enviroment variable is different than --dbPath. --dbPath will overwrite $DB_PATH'
      )
    }

    await start(options)
  } catch (e) {
    console.error(`ERROR: ${e.message}`)
    process.exit(1)
  }
}

const getOptions = argv => ({
  dev: isArg(argv, argOptions.DEV),
  noWatch: isArg(argv, argOptions.NO_WATCH),
  port: getArg(argv, argOptions.PORT),
  dbPath: getArg(argv, argOptions.DB_PATH),
  config: getConfig(),
  manifest: getManifest()
})

run()

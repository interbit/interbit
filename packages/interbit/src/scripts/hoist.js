const fs = require('fs-extra')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const { getArg } = require('../args/getArg')
const writeJsonFile = require('../file/writeJsonFile')
const log = require('../log')

const hoistPackages = async ({ appLocation, covenantConfig }) => {
  log.info('interbit-hoist: Hoisting covenant packages', {
    appLocation,
    covenantConfig
  })

  // if there is a locked file already proceed no further. Error and exit
  const originalPackageJsonPath = `${appLocation}/package.json.interbit-hoist_backup`
  const isHoistAlreadyLocked = fs.existsSync(originalPackageJsonPath)

  if (isHoistAlreadyLocked) {
    log.error(
      'interbit-hoist: interbit-hoist.locked.package.json exists already.'
    )
    return
  }

  // make a locked original copy of the app's package dependencies (package-original.lock.json)
  const appPackageJsonPath = require.resolve(`${appLocation}/package.json`)
  fs.copyFileSync(appPackageJsonPath, originalPackageJsonPath)

  // Lift up all of the dependencies from covenant packages into the app dependencies
  // eslint-disable-next-line
  const appPackageJson = require(appPackageJsonPath)
  log.info('app found')
  const covenantPackageJsons = loadCovenantPackageJsons(covenantConfig)
  const hoistedDependencies = hoistAllCovenantPackages(
    appPackageJson,
    covenantPackageJsons
  )

  // Write the deps to package.json
  const hoistedPackageJson = {
    ...appPackageJson,
    dependencies: {
      ...hoistedDependencies.dependencies
    },
    devDependencies: {
      ...hoistedDependencies.devDependencies
    }
  }
  log.info('interbit-hoist: Writing new dependencies', hoistedPackageJson)

  writeJsonFile(appPackageJsonPath, hoistedPackageJson)

  // run npm i after all off the covenants have been hoisted
  const installDirectory = getArg(process.argv, '--install-dir') || appLocation
  await exec('npm install', { cwd: installDirectory })

  log.info('interbit-hoist: running npm i')

  // delete the tmp package.json and restore original
  fs.removeSync(appPackageJsonPath)
  fs.rename(originalPackageJsonPath, appPackageJsonPath)

  log.info('interbit-hoist: Restored original')
}

const loadCovenantPackageJsons = covenantConfig => {
  const covenantPackageJsons = []

  const covenantEntries = Object.entries(covenantConfig)
  covenantEntries.forEach(([name, config]) => {
    // eslint-disable-next-line
    const covenantPackageJson = require(`${config.location}/package.json`)
    log.info(`covenantPackageJson ${covenantPackageJson.name} found`)
    covenantPackageJsons.push(covenantPackageJson)
  })

  return covenantPackageJsons
}

const hoistAllCovenantPackages = (appPackageJson, covenantPackageJsons) => {
  let hoistedDependencies = { ...appPackageJson.dependencies }
  let hoistedDevDependencies = { ...appPackageJson.devDependencies }

  covenantPackageJsons.forEach(covenantPackageJson => {
    // eslint-disable-next-line
    hoistedDependencies = hoistDependencies(
      covenantPackageJson.name,
      hoistedDependencies,
      covenantPackageJson.dependencies
    )
    hoistedDevDependencies = hoistDependencies(
      covenantPackageJson.name,
      hoistedDevDependencies,
      covenantPackageJson.devDependencies
    )
  })

  return {
    dependencies: hoistedDependencies,
    devDependencies: hoistedDevDependencies
  }
}

const hoistDependencies = (covenant, appDependencies, covenantDependencies) => {
  if (!covenantDependencies) {
    return appDependencies
  }

  let hoisted = {
    ...appDependencies
  }

  // Check each covenant dependency
  Object.entries(covenantDependencies).forEach(([name, version]) => {
    // if it doesn't exist in the root app deps hoist it
    log.info(`Checking dependency... "${name}": "${version}" in ${covenant}`)
    const appDependency = appDependencies[name]
    if (typeof appDependency === 'undefined') {
      hoisted = {
        ...hoisted,
        [name]: version
      }
    } else if (appDependency !== version) {
      // If it does exist in the appDependencies but is a different version, give a warning
      log.warn(
        `HOIST: App version of "${name}": "${appDependency}" does not match version installed in covenant "${version}"`
      )
    }
  })

  return hoisted
}

module.exports = {
  hoistPackages,
  hoistAllCovenantPackages
}

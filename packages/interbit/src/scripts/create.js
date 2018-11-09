const fs = require('fs-extra')
const path = require('path')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const writeJsonFile = require('../file/writeJsonFile')
const log = require('../log')

const TEMPLATE_VERSION = '0.4.27'

/**
 * Creates a new Interbit/React/Redux template application from options in
 * the filesystem.
 * @param {Object} options - The creation options.
 * @param {String} options.appName - Desired application name.
 * @param {String} options.location - File location to work from, usually `process.cwd()`.
 */
const create = async options => {
  const { appName, location } = options

  process.chdir(location)
  const newAppDir = path.join(location, appName)

  log.info(`interbit create: Creating ${appName} in ${newAppDir}`)

  if (!appName) {
    throw new Error('interbit create: appName must be provided')
  }

  if (!appName.match(/^([a-z0-9-]+)+$/)) {
    throw new Error(
      'interbit create: app name must match regex /^([a-z0-9-]+)+$/'
    )
  }

  if (fs.existsSync(newAppDir)) {
    throw new Error(
      `interbit create: Can not create app. Something already exists at location ${newAppDir}`
    )
  }

  log.info('Pulling template file from npm...')
  const tmpDir = path.join(newAppDir, 'tmp')
  const expectedTemplateLocation = await installTemplate(tmpDir)

  if (!fs.existsSync(expectedTemplateLocation)) {
    throw new Error('interbit create: Problem installing template from npm')
  }

  log.info(`Customizing ${appName}...`)
  process.chdir(location)
  fs.copySync(expectedTemplateLocation, newAppDir)

  log.info('Cleaning up...')
  cleanupPackageJson(newAppDir, appName)
  await npmInstall(newAppDir)
  fs.removeSync(tmpDir)

  log.info('... done!')
}

const installTemplate = async dir => {
  fs.mkdirpSync(dir)
  process.chdir(dir)

  writeJsonFile(`${dir}/package.json`, basicPackageJson)
  await npmInstall(dir)

  const expectedTemplateLocation = `${dir}/node_modules/interbit-template`
  return expectedTemplateLocation
}

// Cleanup the package.json from format pulled in from NPM to dev/working format by removing
// the fields added during npm i step
const cleanupPackageJson = (newAppDir, appName) => {
  const packageJsonPath = `${newAppDir}/package.json`
  // eslint-disable-next-line
  const packageJson = require(packageJsonPath)
  packageJson.name = appName
  delete packageJson.bundleDependencies
  delete packageJson.deprecated
  const newJson = Object.entries(packageJson).reduce((json, [k, v]) => {
    if (k.startsWith('_')) {
      return json
    }
    return {
      ...json,
      [k]: v
    }
  }, {})

  writeJsonFile(packageJsonPath, newJson)
}

const npmInstall = async dir => {
  await exec('npm install', { cwd: dir })
}

const basicPackageJson = {
  name: 'tmp',
  dependencies: {
    'interbit-template': TEMPLATE_VERSION
  }
}

module.exports = create

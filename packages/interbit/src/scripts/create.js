const fs = require('fs-extra')
const path = require('path')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)

const TEMPLATE_VERSION = '0.4.27'

const create = async options => {
  const { appName, location } = options

  process.chdir(location)
  const newAppDir = path.join(location, appName)

  console.log(`interbit create: Creating ${appName} in ${newAppDir}`)

  try {
    if (!appName) {
      throw new Error('interbit create: appName must be provided')
    }

    if (!appName.match(/^([a-z0-9-]+)+$/)) {
      throw new Error(
        'interbit create: app name must match regex /^(app|interbit)(-[a-z0-9]+)+$/'
      )
    }

    if (fs.existsSync(newAppDir)) {
      throw new Error(
        `interbit create: Can not create app. Something already exists at location ${newAppDir}`
      )
    }

    console.log('Pulling template file from npm...')
    const tmpDir = path.join(newAppDir, 'tmp')
    const expectedTemplateLocation = await installTemplate(tmpDir)

    if (!fs.existsSync(expectedTemplateLocation)) {
      throw new Error('interbit create: Problem installing template from npm')
    }

    console.log(`Customizing ${appName}...`)
    process.chdir(location)
    fs.copySync(expectedTemplateLocation, newAppDir)

    console.log('Cleaning up...')
    cleanupPackageJson(newAppDir, appName)
    await npmInstall(newAppDir)
    fs.removeSync(tmpDir)

    console.log('... done!')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

const installTemplate = async dir => {
  fs.mkdirpSync(dir)
  process.chdir(dir)

  writePackageJson(dir, basicPackageJson)
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

  writePackageJson(newAppDir, newJson)
}

const npmInstall = async dir => {
  await exec('npm install', { cwd: dir })
}

const writePackageJson = (dir, obj) => {
  fs.writeFileSync(`${dir}/package.json`, JSON.stringify(obj, null, 2), {
    encoding: 'utf8'
  })
}

const basicPackageJson = {
  name: 'tmp',
  dependencies: {
    'interbit-template': TEMPLATE_VERSION
  }
}

module.exports = create

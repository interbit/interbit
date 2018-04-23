const glob = require('glob')
const fs = require('fs')

const writeStandardsToPackageJson = packageJsonPath => {
  // eslint-disable-next-line
  const packageJson = require(`../../${packageJsonPath}`)
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...appPackageRequirements.dependencies
  }
  packageJson.scripts = appPackageRequirements.scripts
  packageJson.proxy = appPackageRequirements.proxy

  const writeData = `${JSON.stringify(packageJson, null, 4)}\r\n`
  fs.writeFileSync(packageJsonPath, writeData, 'utf8')
}

const templatePaths =
  '../template/{src/redux/chainReducer.js,src/tests/chainReducer.test.js,public/!(manifest.json)*,src/!(App|exports)*.*(js|svg)}'
const templateFileNames = glob.sync(templatePaths)

// Obliterate the base files in all the app-* packages by replacing with the template
const packagesPaths = '../app-*'
const packageFileNames = glob.sync(packagesPaths)

console.log({ templateFileNames, packageFileNames })

// Write standard package.json requirements into template
const appPackageRequirements = require('../standards/req.app-package.json')

writeStandardsToPackageJson('../template/package.json')

console.log('Distributing template files to...')
packageFileNames.forEach(packageFileName => {
  const packageName = packageFileName.slice(packageFileName.search(/app-*/))
  console.log(packageName)

  // Replace proxy & scripts in package.json
  const packageJsonPath = `${packageFileName}/package.json`
  writeStandardsToPackageJson(packageJsonPath)
  // replace all of the replacable template files
  templateFileNames.forEach(templateFileName => {
    const newFileName = templateFileName.replace('template', packageName)
    console.log(newFileName)
    fs
      .createReadStream(templateFileName)
      .pipe(fs.createWriteStream(newFileName))
  })
})

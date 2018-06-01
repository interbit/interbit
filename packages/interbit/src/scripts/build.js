const fs = require('fs-extra')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const path = require('path')

const startInterbit = require('../chainManagement/startInterbit')
const { generateManifest } = require('../manifest/generateManifest')
const { updateIndexHtmls } = require('../chainManagement/updateIndexHtml')
const writeJsonFile = require('../file/writeJsonFile')

const build = async options => {
  const { config, manifest, artifacts } = options

  const location = path.relative(process.cwd(), artifacts)

  setupDist(location)

  const covenantFilenames = await packCovenants(location, config.covenants)

  const newManifest = generateManifest(
    location,
    config,
    covenantFilenames,
    manifest
  )

  writeJsonFile(`${location}/interbit.manifest.json`, newManifest)

  updateIndexHtmls({
    config,
    chains: newManifest.chains
  })

  process.exit(0)
}

// Helpers

const setupDist = location => {
  fs.removeSync(location)
  fs.mkdirpSync(location)
}

const packCovenants = async (location, covenantConfig) => {
  const { cli } = await startInterbit()

  const packedCovenants = {}
  const covenants = Object.entries(covenantConfig)
  console.log('PACKING COVENANTS', covenants)
  for (const [covenantAlias, config] of covenants) {
    const covenantLocation = path.relative(process.cwd(), config.location)
    console.log(`...packing ${covenantAlias} from ${covenantLocation}`)
    await exec(`npm pack ./${covenantLocation}`)

    // eslint-disable-next-line
    const covenantPackageJson = require(`${config.location}/package.json`)
    const packedFilename = `${covenantPackageJson.name}-${
      covenantPackageJson.version
    }.tgz`

    const hash = await cli.deployCovenant(config.location)
    fs.moveSync(packedFilename, `${location}/covenants/${hash}.tgz`)

    packedCovenants[covenantAlias] = {
      hash,
      filename: `covenants/${hash}.tgz`
    }
  }

  // TODO: Kill this thang properly (Blocked: #341)
  cli.stopServer()

  return packedCovenants
}

module.exports = build

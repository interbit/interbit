const fs = require('fs-extra')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const path = require('path')

const startInterbit = require('../chainManagement/startInterbit')
const getArtifactsLocation = require('../args/getArtifactsLocation')
const getManifest = require('../args/getManifest')
const getConfig = require('../args/getConfig')
const { generateManifest } = require('./generateManifest')
const { updateIndexHtmls } = require('../chainManagement/updateIndexHtml')

const build = async () => {
  const interbitConfig = getConfig()
  const interbitManifest = getManifest()

  const artifactsLocation = getArtifactsLocation()
  const location = path.relative(process.cwd(), artifactsLocation)

  // TODO: Copy the specified app builds into dist/builds/dirname #335

  setupDist(location)

  const covenantFilenames = await packCovenants(
    location,
    interbitConfig.covenants
  )

  const newManifest = generateManifest(
    location,
    interbitConfig,
    covenantFilenames,
    interbitManifest
  )

  writeManifestToFile(location, newManifest)

  updateIndexHtmls({
    config: interbitConfig,
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

const writeManifestToFile = (location, manifest) => {
  fs.writeFileSync(
    `${location}/interbit.manifest.json`,
    JSON.stringify(manifest, null, 2),
    {
      encoding: 'utf8'
    }
  )
}

module.exports = build

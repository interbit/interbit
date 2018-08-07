const fs = require('fs-extra')
const path = require('path')

const { generateManifest } = require('../manifest')
const { updateIndexHtmls, writeJsonFile, packCovenants } = require('../file')

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
}

// Helpers

const setupDist = location => {
  fs.removeSync(location)
  fs.mkdirpSync(location)
}

module.exports = build

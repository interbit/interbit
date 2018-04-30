const path = require('path')
const {
  getCovenants: getCovenantsFromManifest
} = require('../manifest/manifestSelectors')

const deployCovenants = async (location, cli, manifest, opts) => {
  const covenantHashes = {}
  const covenants = getCovenantsFromManifest(manifest)
  const covenantEntries = Object.entries(covenants)
  for (const [covenantAlias, covenantManifest] of covenantEntries) {
    let covenantLocation
    if (opts.isDevModeEnabled) {
      process.env.COVENANT_DEV_MODE = true
      covenantLocation = covenantManifest.location
    } else {
      covenantLocation = path.resolve(
        `${location}/${covenantManifest.filename}`
      )
    }

    const covenantHash = await cli.deployCovenant(covenantLocation)
    covenantHashes[covenantAlias] = { hash: covenantHash }

    console.log(`...deployed ${covenantLocation}`)
  }

  return covenantHashes
}

module.exports = deployCovenants

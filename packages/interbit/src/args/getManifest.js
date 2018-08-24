const path = require('path')
const fs = require('fs-extra')

const log = require('../log')
const getArtifactsLocation = require('./getArtifactsLocation')
const { getArg } = require('./getArg')
const { MANIFEST } = require('./argOptions')

const getManifestLocation = () => {
  const artifactsLocation = getArtifactsLocation()
  const manifestArg = getArg(process.argv, MANIFEST)
  const manifestLocation = manifestArg
    ? path.resolve(manifestArg)
    : `${artifactsLocation}/interbit.manifest.json`

  return manifestLocation
}

/**
 * Gets the Interbit manifest file from disk based on the `--manifest`
 * option passed through process args.
 * @returns {Object|undefined} The manifest file, if found, as a JSON object.
 */
const getManifest = () => {
  const manifestLocation = getManifestLocation()

  const doesManifestExist = fs.existsSync(manifestLocation)
  if (!doesManifestExist) {
    log.error(`Manifest file does not exist at location ${manifestLocation}`)
    return undefined
  }

  const manifestFilepath = fs.statSync(manifestLocation).isDirectory()
    ? `${manifestLocation}/interbit.manifest.json`
    : manifestLocation

  log.info(`Loading manifest at ${manifestFilepath}`)

  // eslint-disable-next-line
  const manifest = require(manifestFilepath)
  return manifest
}

module.exports = getManifest

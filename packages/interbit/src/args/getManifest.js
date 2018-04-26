const path = require('path')
const fs = require('fs-extra')

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

const getManifest = () => {
  const manifestLocation = getManifestLocation()

  const doesManifestExist = fs.existsSync(manifestLocation)
  if (!doesManifestExist) {
    console.error(
      `Manifest file does not exist at location ${manifestLocation}`
    )
    return undefined
  }

  const manifestFilepath = fs.statSync(manifestLocation).isDirectory()
    ? `${manifestLocation}/interbit.manifest.json`
    : manifestLocation

  console.log(`Loading manifest at ${manifestFilepath}`)

  // eslint-disable-next-line
  const manifest = require(manifestFilepath)
  return manifest
}

module.exports = getManifest

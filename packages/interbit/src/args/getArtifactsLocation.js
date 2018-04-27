const path = require('path')

const { getArg } = require('./getArg')
const { ARTIFACTS } = require('./argOptions')

const getArtifactsLocation = () => {
  const artifactsArg = getArg(process.argv, ARTIFACTS)
  const artifactsLocation = artifactsArg
    ? path.resolve(artifactsArg)
    : `${process.cwd()}/dist/`

  return artifactsLocation
}

module.exports = getArtifactsLocation

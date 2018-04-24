const mergeCovenants = require('../mergeCovenants')

const mainifestCovenant = require('./manifestCovenant')
const fileLayerCovenant = require('./fileLayerCovenant')

module.exports = mergeCovenants([mainifestCovenant, fileLayerCovenant])

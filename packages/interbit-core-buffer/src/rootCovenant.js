const mergeCovenants = require('interbit-merge-covenants')

const mainifestCovenant = require('./manifestCovenant')
const fileLayerCovenant = require('./fileLayerCovenant')

module.exports = mergeCovenants([mainifestCovenant, fileLayerCovenant])

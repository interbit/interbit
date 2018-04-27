const mergeCovenants = require('../mergeCovenants')

const manifestCovenant = require('./manifestCovenant')
const fileLayerCovenant = require('./fileLayerCovenant')

module.exports = mergeCovenants([manifestCovenant, fileLayerCovenant])

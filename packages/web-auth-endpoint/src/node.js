const path = require('path')
const { deploy } = require('interbit')
const keyPair = require('../keyPair.js')

// const { NODE_PORT } = require('./networkConfig')

const startNode = async manifest => {
  const options = {
    port: undefined,
    location: path.relative(process.cwd(), '../platform-deploy/platform'),
    keyPair,
    manifest
  }
  const cli = await deploy(options)
  return cli
}

module.exports = startNode

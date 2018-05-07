const path = require('path')
const { deploy } = require('interbit')
const keyPair = require('../keyPair.js')

const { NODE_PORT } = require('./networkConfig')

const startNode = async manifest => {
  const options = {
    port: NODE_PORT,
    location: path.relative(process.cwd(), '../platform-deploy/platform'),
    keyPair,
    manifest,
    connect: true
  }
  const cli = await deploy(options)
  return cli
}

module.exports = startNode

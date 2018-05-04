// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const startNode = require('./node')
const startAuthServer = require('./authServer')
const manifest = require('../../platform-deploy/platform/interbit.manifest')

console.log(JSON.stringify(manifest, null, 2))

const start = async () => {
  const nodeCli = await startNode(manifest)
  startAuthServer(nodeCli, manifest)
}

start()

const express = require('express')
const httpProxy = require('http-proxy')

const {
  PORT,
  NODE_HOST,
  NODE_PORT,
  AUTH_HOST,
  AUTH_PORT
} = require('./networkConfig')

const startProxy = () => {
  const app = express()
  const apiProxy = httpProxy.createProxyServer()

  app.all('/cauth/*', (req, res) => {
    console.log('Redirecting to cAuth server')
    const opts = {
      target: `${AUTH_HOST}:${AUTH_PORT}`
    }
    apiProxy.web(req, res, opts)
  })

  app.all('/node/*', (req, res) => {
    console.log('Redirecting to blockchain node', req.headers)
    const opts = {
      target: `${NODE_HOST}:${NODE_PORT}`,
      ws: true
    }
    apiProxy.web(req, res, opts)
  })

  app.listen(PORT, () => console.log(`Proxy is listening on port ${PORT}`))
}

module.exports = startProxy

const express = require('express')

const { AUTH_PORT } = require('./networkConfig')
const waitForOAuth = require('./oAuth')

const startAuthServer = async (cli, manifest) => {
  const whitelist = [
    `localhost:${AUTH_PORT}`,
    'github.com',
    'ib-dev-web-auth.herokuapp.com',
    'ib-stg-web-auth.herokuapp.com',
    'ib-prod-web-auth.herokuapp.com'
  ]
  const app = express()

  // Trigger the oAuth saga
  const githubChainAlias = 'accountsGithubAuth'
  const githubChainId = manifest.chains[githubChainAlias]
  const githubChain = cli.getChain(githubChainId)

  app.get('/oauth/github', async (request, response) => {
    const host = request.get('host')
    console.log('/oauth/github request from: ', host)
    if (whitelist.indexOf(host) === -1) {
      console.log('no host found using whitelist: ', whitelist)
      return response.status(403).send('Nope!')
    }

    const {
      requestId,
      consumerChainId,
      temporaryToken,
      error,
      errorDescription
    } = parseQueryParameters(request.query)

    // Trigger the oAuth saga
    const redirectUrl = await waitForOAuth(githubChain, {
      requestId,
      consumerChainId,
      temporaryToken,
      error,
      errorDescription
    })

    console.log(`Redirecting to ${redirectUrl}`)
    return response.redirect(redirectUrl)
  })

  app.listen(AUTH_PORT, () =>
    console.log(`App is listening on port ${AUTH_PORT}`)
  )
}

const parseQueryParameters = query => {
  const {
    state: requestId,
    state: consumerChainId,
    code: temporaryToken,
    error,
    error_description: errorDescription
  } = query

  return {
    requestId,
    consumerChainId,
    temporaryToken,
    error,
    errorDescription
  }
}

module.exports = startAuthServer

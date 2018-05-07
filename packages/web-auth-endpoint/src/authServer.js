const express = require('express')
const {
  githubOAuthCovenant: { actionCreators: githubActionCreators }
} = require('app-account')

const { AUTH_PORT } = require('./networkConfig')

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

  app.get('/oauth/github', (request, response) => {
    const host = request.get('host')
    console.log('/oauth/github request from: ', host)
    if (whitelist.indexOf(host) === -1) {
      console.log('no host found using whitelist: ', whitelist)
      return response.status(403).send('Nope!')
    }

    // TODO: Sort out the parameters for creating the chain
    const {
      state: requestId,
      state: consumerChainId,
      state: joinName,
      code: temporaryToken,
      error,
      error_description: errorDescription
    } = request.query

    console.log(request.query)

    // Trigger the oAuth saga
    const action = githubActionCreators.oAuthCallback({
      requestId,
      consumerChainId,
      joinName,
      temporaryToken,
      error,
      errorDescription
    })
    githubChain.dispatch(action)

    // TODO: Get the redirect options from gitHub chain
    // and have separate URLs/query params for success/failure
    return response.redirect('http://localhost:3025/account')
  })

  app.listen(AUTH_PORT, () =>
    console.log(`App is listening on port ${AUTH_PORT}`)
  )
}

module.exports = startAuthServer

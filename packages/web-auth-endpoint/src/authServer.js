const express = require('express')
const {
  githubOAuthCovenant: { actionCreators: githubActionCreators },
  controlCovenant: { actionCreators: controlActionCreators }
} = require('app-account')

const { AUTH_PORT } = require('./networkConfig')

const startAuthServer = async (cli, manifest) => {
  const whitelist = [`localhost:${AUTH_PORT}`, 'github.com']
  const app = express()

  app.get('/oauth/gitHub', (request, response) => {
    const host = request.get('host')
    console.log('/oauth/gitHub request from: ', host)
    if (whitelist.indexOf(host) === -1) {
      console.log('no host found using whitelist: ', whitelist)
      return response.status(403).send('Nope!')
    }

    // TODO: Sort out the parameters for creating the chain
    const {
      state: requestId,
      state: consumerChainId,
      state: joinName,
      code: temporaryToken
      // error
      // error_description
    } = request.query

    console.log(request.query)

    // Trigger the oAuth saga
    const githubChainAlias = 'githubKyc'
    const githubChainId = manifest.chains[githubChainAlias]
    const githubChain = cli.getChain(githubChainId)
    const action = githubActionCreators.oAuthCallback({
      requestId,
      consumerChainId,
      joinName,
      temporaryToken
    })
    githubChain.dispatch(action)

    // TODO: Get the redirect options from gitHub chain
    // and have separate URLs/query params for success/failure
    return response.redirect('http://localhost:3025/account')
  })

  const controlChainAlias = 'accountsControl'
  const controlChainId = manifest.chains[controlChainAlias]
  const controlChain = cli.getChain(controlChainId)

  const privateChainAlias = 'accountsPrivate'
  const privateCovenantAlias = 'app-account-my-account'
  const privateCovenantHash = manifest.covenants[privateCovenantAlias]

  const action = controlActionCreators.privateChainCovenant({
    chainAlias: privateChainAlias,
    covenantHash: privateCovenantHash
  })
  controlChain.dispatch(action)

  app.listen(AUTH_PORT, () =>
    console.log(`Auth server is listening on port ${AUTH_PORT}`)
  )
}

module.exports = startAuthServer

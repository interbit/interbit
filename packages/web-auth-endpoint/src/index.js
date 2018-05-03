// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const express = require('express')
const {
  githubOAuthCovenant: { actionCreators: githubActionCreators },
  controlCovenant: { actionCreators: controlActionCreators }
} = require('app-account')
const interbitNode = require('./interbitNode')

const port = process.env.PORT || 5002

// @dave: I am not really sure where this request comes from so please adjust the whitelist as necessary
const whitelist = [`localhost:${port}`, 'github.com']

const startNode = async () => {
  // Start an interbit node based on config
  const interbit = await interbitNode()

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
    const githubChainId = interbit.chains[githubChainAlias]
    const githubChain = interbit.cli.getChain(githubChainId)
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
  const controlChainId = interbit.chains[controlChainAlias]
  const controlChain = interbit.cli.getChain(controlChainId)

  const privateChainAlias = 'accountsPrivate'
  const privateCovenantAlias = 'app-account-my-account'
  const privateCovenantHash = interbit.covenants[privateCovenantAlias]

  const action = controlActionCreators.privateChainCovenant({
    chainAlias: privateChainAlias,
    covenantHash: privateCovenantHash
  })
  controlChain.dispatch(action)

  app.listen(port, () => console.log(`App is listening on port ${port}`))
}

startNode()

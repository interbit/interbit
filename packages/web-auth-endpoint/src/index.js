// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const express = require('express')

const waitForOAuth = require('./oAuth')
const interbitNode = require('./interbitNode')

const port = process.env.PORT || 5002

// @dave: I am not really sure where this request comes from so please adjust the whitelist as necessary
const whitelist = [`localhost:${port}`, 'github.com']

const startNode = async () => {
  // Start an interbit node based on config
  const interbit = await interbitNode()

  const githubChainAlias = 'accountsGithubAuth'
  const githubChainId = interbit.chains[githubChainAlias]
  const githubChain = interbit.cli.getChain(githubChainId)

  const app = express()

  app.get('/oauth/github', async (request, response) => {
    const host = request.get('host')
    console.log('/oauth/github request from: ', host)
    if (whitelist.indexOf(host) === -1) {
      console.log('no host found using whitelist: ', whitelist)
      return response.status(403).send('Nope!')
    }

    // TODO: Sort out the parameters for creating the chain
    const {
      requestId,
      consumerChainId,
      temporaryToken,
      error,
      errorDescription
    } = parseQueryParameters(request.query)

    const consumerChain = await interbit.cli.getChain(consumerChainId)
    const consumerChainState = await consumerChain.getState()
    console.log(consumerChainState)

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

  app.listen(port, () => console.log(`App is listening on port ${port}`))
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

startNode()

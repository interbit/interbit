const _ = require('lodash')
const axios = require('axios')
const { Builder } = require('selenium-webdriver')
const { createAccount } = require('./create-account')
const { getRandomCapabilities } = require('./browserStackCapabilities')

const BROWSERSTACK_SERVER = 'http://hub-cloud.browserstack.com/wd/hub'

const mttf = async () => {
  await runBrowserStackTest()
}

/* eslint-disable no-cond-assign */
const runBrowserStackTest = async () => {
  const startTime = Date.now()
  const sendTimeToFailure = startTimer(startTime)

  let failedAttempts = 0
  for (let attemptNumber = 1; (attemptNumber += 1); ) {
    const capabilities = getRandomCapabilities()
    console.log(
      'Running BrowserStack tests on ',
      JSON.stringify(capabilities, null, 2)
    )
    const driver = new Builder()
      .usingServer(BROWSERSTACK_SERVER)
      .withCapabilities(capabilities)
      .build()
    try {
      await createAccount(driver)
      failedAttempts = 0
    } catch (e) {
      console.log(e)

      if (failedAttempts > 3) {
        const url = await driver.getCurrentUrl()
        const errorMessage = formatError(e, capabilities, url, attemptNumber)
        sendTimeToFailure(errorMessage)
        await driver.quit()
        throw e
      }
      failedAttempts += 1
    }
    await driver.quit()
  }
}
/* eslint-enable no-cond-assign */

const startTimer = () => {
  const startTime = Date.now()

  const sendTimeToFailure = failureMessage => {
    const endTime = Date.now()
    const elapsedTimeMs = endTime - startTime

    const elapsedTimeSecs = Math.round(elapsedTimeMs / 1000) % 60
    const elapsedTimeMins = Math.round(elapsedTimeSecs / 60) % 60
    const elapsedTimeHours = Math.round(elapsedTimeMins / 60) % 24
    const elapsedTimeDays = Math.round(elapsedTimeHours / 24)

    const message = `:fire: :fire: :thisisfine: :fire: :fire: \n\nMTTF Test on Accounts has Failed.\n_Check the server logs..._\n\n*Mean Time To Failure*\n ${elapsedTimeDays}d ${elapsedTimeHours}h ${elapsedTimeMins}m ${elapsedTimeSecs}s\n*Start:* ${new Date(
      startTime
    ).toISOString()}\n*End:* ${new Date(
      endTime
    ).toISOString()}\n\nERROR\n\n${failureMessage}`

    sendMessageToSlack(message)
  }

  return sendTimeToFailure
}

const formatError = (error, capabilities, url, attemptNumber) => {
  const shareableCapabilities = _.omitBy(
    capabilities,
    (value, key) => key === 'browserstack.user' || key === 'browserstack.key'
  )
  return `Failed on attempt #${attemptNumber} at ${url}\n\nRan on BrowserStack using capabilities:\n\n${JSON.stringify(
    shareableCapabilities,
    null,
    2
  )}\n\nGot error:\n\n${error}`
}

const sendMessageToSlack = (
  text,
  channel = 'errors',
  username = 'MTTF Bot'
) => {
  axios.post(process.env.WEBHOOK, {
    channel,
    username,
    text
  })
}

module.exports = {
  mttf,
  formatError,
  startTimer,
  sendMessageToSlack
}

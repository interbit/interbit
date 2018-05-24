const _ = require('lodash')
const axios = require('axios')
const { Builder, By, until } = require('selenium-webdriver')
const { getRandomCapabilities } = require('./browserStackCapabilities')

const SITE = 'https://ib-dev-account.herokuapp.com/'
const BROWSERSTACK_SERVER = 'http://hub-cloud.browserstack.com/wd/hub'
const TIMEOUT = 60000

const mttf = async () => {
  const startTime = Date.now()
  const sendTimeToFailure = startTimer(startTime)
  let attemptNumber = 1

  while (true) {
    await runBrowserStackTest(sendTimeToFailure, attemptNumber)
    attemptNumber += 1
  }
}

const runBrowserStackTest = async (handleError, attemptNumber) => {
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
  } catch (e) {
    const url = await driver.getCurrentUrl()

    const errorMessage = formatError(e, capabilities, url, attemptNumber)
    handleError(errorMessage)

    await driver.quit()
    process.exit(0)
  } finally {
    await driver.quit()
  }
}

const startTimer = () => {
  const startTime = Date.now()

  const sendTimeToFailure = failureMessage => {
    const endTime = Date.now()
    const elapsedTimeMs = endTime - startTime

    let elapsedTimeSecs = Math.round(elapsedTimeMs / 1000)
    let elapsedTimeMins = Math.round(elapsedTimeSecs / 60)
    let elapsedTimeHours = Math.round(elapsedTimeMins / 60)
    const elapsedTimeDays = Math.round(elapsedTimeHours / 24)

    elapsedTimeSecs %= 60
    elapsedTimeMins %= 60
    elapsedTimeHours %= 24

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

const createAccount = async driver => {
  await driver.get(SITE)

  await driver.wait(
    until.elementLocated(By.id('ib-test-create-account')),
    TIMEOUT
  )
  await driver.findElement(By.id('ib-test-create-account')).click()
  await driver.findElement(By.id('ib-test-github-create')).click()
  await driver.findElement(By.name('check')).click()
  await driver.findElement(By.name('continue')).click()

  await driver.wait(until.elementLocated(By.name('commit')), TIMEOUT)
  await driver.wait(
    until.elementIsEnabled(driver.findElement(By.name('commit'))),
    TIMEOUT
  )
  await driver
    .findElement(By.id('login_field'))
    .sendKeys(process.env.GITHUB_USER)
  await driver.findElement(By.id('password')).sendKeys(process.env.GITHUB_PASS)
  await driver.findElement(By.name('commit')).click()

  // Only need to authorize if the user has never ever authed before
  try {
    await driver.wait(until.elementLocated(By.name('authorize')), TIMEOUT)
    await driver.wait(
      until.elementIsEnabled(driver.findElement(By.name('authorize'))),
      TIMEOUT
    )
    await driver.findElement(By.name('authorize')).click()
  } catch (e) {
    console.log('User was already authenticated')
  }

  await driver.wait(until.elementLocated(By.id('ib-test-signed-in')), TIMEOUT)

  await driver.getTitle().then(title => {
    console.log(`Successfully created account and loaded "${title}"`)
  })
}

module.exports = {
  mttf,
  formatError,
  startTimer,
  sendMessageToSlack
}

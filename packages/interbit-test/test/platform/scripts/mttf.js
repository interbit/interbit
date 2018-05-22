const { Builder, By, until } = require('selenium-webdriver')

const SITE = 'https://ib-dev-account.herokuapp.com/'
const BROWSERSTACK_SERVER = 'http://hub-cloud.browserstack.com/wd/hub'

const capabilities = {
  browserName: 'chrome',
  version: '63',
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY,
  'browserstack.console': 'errors',
  'browserstack.debug': true
}

const runBrowserStackTest = async () => {
  const driver = new Builder()
    .usingServer(BROWSERSTACK_SERVER)
    .withCapabilities(capabilities)
    .build()

  try {
    await driver.get(SITE)

    await driver.wait(until.elementLocated(By.id('ib-create-account')), 20000)
    await driver.findElement(By.id('ib-create-account')).click()
    await driver.findElement(By.id('ib-github-create')).click()
    await driver.findElement(By.name('check')).click()
    await driver.findElement(By.name('continue')).click()

    await driver.wait(until.elementIsEnabled(By.name('commit')), 20000)
    await driver
      .findElement(By.id('login_field'))
      .sendKeys(process.env.GITHUB_USER)
    await driver
      .findElement(By.id('password'))
      .sendKeys(process.env.GITHUB_PASS)
    await driver.findElement(By.name('commit')).click()

    // Only need to authorize if the user has never ever authed before
    try {
      await driver.wait(until.elementLocated(By.name('authorize')), 10000)
      await driver.wait(until.elementIsEnabled(By.name('authorize')), 20000)
      await driver.findElement(By.name('authorize')).click()
    } catch (e) {
      console.log('User was already authenticated')
    }

    await driver.wait(until.elementLocated(By.id('ib-signed-in')), 20000)

    await driver.getTitle().then(title => {
      console.log(`Successfully created account and loaded "${title}"`)
    })
  } finally {
    await driver.quit()
  }
}

runBrowserStackTest()

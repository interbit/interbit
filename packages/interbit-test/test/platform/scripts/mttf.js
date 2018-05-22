const { Builder, By, until } = require('selenium-webdriver')

const SITE = 'https://ib-dev-account.herokuapp.com/'
const BROWSERSTACK_SERVER = 'http://hub-cloud.browserstack.com/wd/hub'

// Input capabilities
const capabilities = {
  browserName: 'iPhone',
  device: 'iPhone 7',
  realMobile: 'true',
  os_version: '10.3',
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
    await driver.wait(until.elementLocated(By.id('ib-create-account')), 10000)
    await driver.findElement(By.id('ib-create-account')).click()
    await driver.findElement(By.id('ib-github-create')).click()
    await driver.findElement(By.name('check')).click()
    await driver.findElement(By.name('continue')).click()

    await driver.getTitle().then(title => {
      console.log(title)
    })
  } finally {
    await driver.quit()
  }
}

runBrowserStackTest()

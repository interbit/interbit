const { By, until } = require('selenium-webdriver')

const SITE = 'https://ib-dev-account.herokuapp.com/'
const TIMEOUT = 300000

const createAccount = async driver => {
  await driver.get(SITE)

  await driver.wait(
    until.elementLocated(By.id('ib-test-create-account')),
    TIMEOUT
  )
  await driver.findElement(By.id('ib-test-create-account')).click()

  await driver.wait(
    until.elementLocated(By.id('ib-test-github-create')),
    TIMEOUT
  )
  await driver.findElement(By.id('ib-test-github-create')).click()

  await driver.wait(until.elementLocated(By.name('check')), TIMEOUT)
  await driver.findElement(By.name('check')).click()
  await driver.wait(until.elementLocated(By.name('continue')), TIMEOUT)
  await driver.findElement(By.name('continue')).click()

  await driver.wait(until.elementLocated(By.name('commit')), TIMEOUT)
  await driver.wait(
    until.elementIsEnabled(driver.findElement(By.name('commit'))),
    TIMEOUT
  )
  await driver.findElement(By.id('login_field')).sendKeys('btlnicole')
  await driver.findElement(By.id('password')).sendKeys('meowzersbatmanmedusa')
  await driver.findElement(By.name('commit')).click()

  try {
    await driver.wait(until.elementLocated(By.name('authorize')), 3000)
    await driver.wait(
      until.elementIsEnabled(driver.findElement(By.name('authorize'))),
      3000
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
  createAccount
}

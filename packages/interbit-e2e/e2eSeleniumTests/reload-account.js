const { By, until } = require('selenium-webdriver')

const { createAccount } = require('./create-account')

const SITE = 'https://ib-dev-account.herokuapp.com/'
const TIMEOUT = 300000

/* eslint-disable no-cond-assign */
const reloadAccount = async driver => {
  await createAccount(driver)

  for (let attempts = 0; (attempts += 1); ) {
    console.log(`Attempt #${attempts}`)
    await driver.get(SITE)

    await driver.wait(until.elementLocated(By.id('ib-test-signed-in')), TIMEOUT)

    await driver.getTitle().then(title => {
      console.log(`Successfully loaded "${title}"`)
    })
  }
}
/* eslint-enable no-cond-assign */

module.exports = {
  reloadAccount
}

const metaCapabilities = {
  'browserstack.user': process.env.BROWSERSTACK_USER,
  'browserstack.key': process.env.BROWSERSTACK_KEY,
  'browserstack.console': 'verbose',
  'browserstack.debug': true
}

const capabilities = [
  // {
  //  browserName: 'chrome',
  //  version: '63',
  //  ...metaCapabilities
  // },
  // {
  //  browserName: 'Firefox',
  //  version: '57',
  //  ...metaCapabilities
  // },
  // {
  //   browserName: 'iPhone',
  //   os_version: '10.3',
  //   device: 'iPhone 7',
  //   real_mobile: 'true',
  //   'browserstack.local': 'false',
  //   ...metaCapabilities
  // },
  // {
  //   browserName: 'iPad',
  //   os_version: '11.0',
  //   device: 'iPad 5th',
  //   real_mobile: 'true',
  //   'browserstack.local': 'false',
  //   ...metaCapabilities
  // },
  {
    browserName: 'Chrome',
    os: 'Windows',
    os_version: '10',
    browser_version: '62.0',
    'browserstack.local': 'false',
    'browserstack.selenium_version': '3.5.2',
    ...metaCapabilities
    // },
    // {
    //  browserName: 'Chrome',
    //  os: 'Windows',
    //  os_version: '7',
    //  browser_version: '62.0',
    //  'browserstack.local': 'false',
    //  'browserstack.selenium_version': '3.5.2',
    //  ...metaCapabilities
  }
  // {
  //   browserName: 'Chrome',
  //   os_version: '7.0',
  //   device: 'Samsung Galaxy S8',
  //   real_mobile: 'true',
  //   'browserstack.local': 'false',
  //   ...metaCapabilities
  // },
  // {
  //   browserName: 'Chrome',
  //   os_version: '7.1',
  //   device: 'Google Pixel',
  //   real_mobile: 'true',
  //   'browserstack.local': 'false',
  //   ...metaCapabilities
  // }
]

const getRandomCapabilities = () => {
  const i = Math.floor(Math.random() * capabilities.length)
  return capabilities[i]
}

module.exports = {
  capabilities,
  getRandomCapabilities,
  metaCapabilities
}

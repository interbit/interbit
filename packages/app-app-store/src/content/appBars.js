import constants from '../constants'

import iconAccounts from '../assets/iconAccounts.svg'
import iconCreateIBApp from '../assets/iconCreateIBApp.png'

export default {
  accounts: {
    barTitle: 'Accounts',
    barTitleTo: constants.paths.APP_ACCOUNT,
    barImage: iconAccounts,
    barP:
      'Securely connect to apps and control your information from a single place with total transparency.',
    buttonText: 'Go to App',
    buttonTo: constants.urls.APP_ACCOUNT
  },

  accountKit: {
    barTitle: 'AccountKit',
    barTitleTo: constants.paths.APP_ACCOUNT_KIT,
    barImage: iconAccounts,
    barP:
      'Easily implement account creation and authentication functions within your app.',
    buttonText: 'View Source',
    buttonTo: constants.urls.GITHUB_IB
  },

  createIBApp: {
    barTitle: 'Create Interbit App',
    barTitleTo: constants.paths.APP_CREATE_IB_APP,
    barImage: iconCreateIBApp,
    barP:
      'Boilerplate for building Interbit apps. Save time with setup through an easy command-line tool.',
    buttonText: 'View Source',
    buttonTo: constants.urls.GITHUB_IB
  }
}

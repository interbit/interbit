import constants from '../constants'
import iconAccountsLg from '../assets/iconAccountsLg.svg'
import iconCreateIBAppLg from '../assets/iconCreateIBAppLg.svg'
import appDetailsAccounts from '../assets/appDetailsAccounts.jpg'
import appDetailsAccountKit from '../assets/appDetailsAccountKit.jpg'
import appDetailsCreateIBApp from '../assets/appDetailsCreateIBApp.jpg'

export default {
  accounts: {
    name: 'Accounts',
    icon: iconAccountsLg,
    appUrl: constants.urls.APP_ACCOUNT,
    companyName: 'Interbit',
    companyUrl: 'http://interbit.io',
    category: '',
    rating: 'E',
    ratingName: 'Everyone',
    pricing: 'Free',
    button: 'Go to App',
    image: appDetailsAccounts,
    description: `Accounts is an Interbit-powered app that gives you 100% control and ownership of your personal data and how it’s used when creating accounts on other apps/services you use.

Accounts gives each user their own private blockchain where sensitive personal data is kept. You decide what data to share and with whom.

#### Why do I need my own blockchain?

Your user account chain will become central to experiencing Interbit and any Interbit-powered apps over time. We want every user of every app to have complete control over their data. Always.

#### Benefits

100% control. Your account chain is yours. You can add, update and even destroy it, deleting your data! (Try that with Facebook!)

Your identity in one place. You will be able to expand your account profile to include all kinds of personal data and selectively control who you let see/access that data.

Privacy and access. You will be able to use your Account chain to securely connect to other apps/services while keeping control of your data — it always remains with you and you decide what to share.

NOTE: Your Account chain will have limited use until more apps start appearing in the Interbit Store. Until then we'd love to hear your feedback about this app.`
  },

  accountKit: {
    name: 'AccountKit',
    icon: iconAccountsLg,
    appUrl: constants.urls.GITHUB_IB,
    companyName: 'Interbit',
    companyUrl: 'http://interbit.io',
    category: '',
    rating: 'T',
    ratingName: 'Technical',
    pricing: 'Free',
    button: 'View Source',
    image: appDetailsAccountKit,
    description: `The AccountKit allows you to easily implement account creation and authentication functions within your app.

The Account services generate a private blockchain for each user, where they are able to maintain sensitive personal data. Users who already use the Accounts app simply authenticate by granting you permission to read data from their chain.

Your users benefit from 100% control and ownership of their personal data and how it’s used when creating accounts on your apps/services.

Developers benefit from not housing a centralized database of sensitive user data.

User account chains will become central to experiencing Interbit and any Interbit-powered apps over time. We want every user of every app to have complete control over their data. Always.`
  },

  createIBApp: {
    name: 'Create Interbit App',
    icon: iconCreateIBAppLg,
    appUrl: constants.urls.GITHUB_IB,
    companyName: 'Interbit',
    companyUrl: 'http://interbit.io',
    category: '',
    rating: 'T',
    ratingName: 'Technical',
    pricing: 'Free',
    button: 'View Source',
    image: appDetailsCreateIBApp,
    description: `With a single command, Create Interbit App will bootstrap an application, set up multiple chains, and initiate joins between them. We want you to spend time writing application code, not configuring your Interbit instance.`
  }
}

import paths from '../constants/paths'
import iconContinueToAccount from '../assets/icons/iconContinueToAccount.svg'
import iconCreateAccount from '../assets/icons/iconCreateAccount.svg'

export default {
  createAccount: {
    title: 'Create an account',
    id: 'ib-create-account',
    image: iconCreateAccount,
    content:
      'Control your information and manage the apps used with your Interbit account.',
    to: paths.CREATE_ACCOUNT,
    className: 'blue'
  },
  continueToAccount: {
    title: 'Continue to your account',
    id: 'ib-continue-account',
    image: iconContinueToAccount,
    content:
      'Control your information and manage the apps used with your Interbit account.',
    to: paths.ACCOUNT,
    className: 'blue'
  }
}

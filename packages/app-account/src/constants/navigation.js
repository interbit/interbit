import paths from '../constants/paths'
import urls from '../constants/urls'

export default {
  headerNav: [
    {
      text: 'My Account',
      to: paths.ACCOUNT,
      eventKey: 'account'
    },
    {
      text: 'Block Explorer',
      to: paths.BLOCK_EXPLORER,
      eventKey: 'explore'
    }
  ],
  headerNavLoggedOut: [],
  headerRightNav: [
    {
      text: 'Signed-in',
      eventKey: 'signed-in',
      id: 'ib-test-signed-in',
      className: 'signed-in',
      isDisabled: true
    }
  ],
  headerRightNavLoggedOut: [
    {
      text: 'Create Account / Sign-in',
      to: paths.CREATE_ACCOUNT,
      url: paths.CREATE_ACCOUNT,
      eventKey: 'create-account'
    }
  ],
  footerNav: [
    {
      title: 'Accounts',
      items: [
        {
          text: 'Your Account',
          to: paths.ACCOUNT
        },
        {
          text: 'Support',
          to: urls.APP_IB_IO_DEVELOPERS_SUPPORT
        }
      ]
    },
    {
      title: 'Services',
      items: [
        {
          text: 'Accounts',
          to: paths.HOME
        },
        {
          text: 'Store',
          to: urls.APP_STORE
        }
      ]
    }
  ],
  footerBottomLinks: [
    {
      text: 'Privacy Policy',
      to: urls.APP_IB_IO_POLICY_PRIVACY
    },
    {
      text: 'Terms of Use',
      to: urls.APP_IB_IO_POLICY_TOS
    }
  ]
}

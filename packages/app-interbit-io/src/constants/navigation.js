import paths from './paths'
import urls from './urls'

export const footerNav = [
  {
    title: 'Interbit',
    items: [
      {
        text: 'Platform',
        to: paths.PLATFORM
      },
      {
        text: 'Interbit for Business',
        to: paths.PLATFORM_INTERBIT_FOR_BUSINESS
      },
      {
        text: 'Product Roadmap',
        to: paths.PLATFORM_ROADMAP
      },
      {
        text: 'Pricing',
        to: paths.PRICING
      }
    ]
  },
  {
    title: 'Development',
    items: [
      {
        text: 'Overview',
        to: paths.DEVELOPERS
      },
      {
        text: 'Platform Features',
        to: paths.DEVELOPERS_PLATFORM_FEATURES
      },
      {
        text: 'Chain Architecture',
        to: paths.DEVELOPERS_ARCHITECTURE
      },
      {
        text: 'Resources',
        to: paths.DEVELOPERS_RESOURCES
      },
      {
        text: 'Examples',
        to: paths.DEVELOPERS_EXAMPLES
      },
      {
        text: 'Docs',
        to: urls.SDK_DOCS
      },
      {
        text: 'Support',
        to: paths.DEVELOPERS_SUPPORT
      }
    ]
  },
  {
    title: 'Platform',
    items: [
      {
        text: 'Accounts',
        to: urls.APP_ACCOUNT
      },
      {
        text: 'Store',
        to: urls.APP_STORE
      }
    ]
  },
  {
    title: 'Company',
    items: [
      {
        text: 'Blog',
        to: urls.BTL_BLOG
      },
      {
        text: 'Newsroom',
        to: urls.BTL_NEWS
      },
      {
        text: 'Investors',
        to: urls.BTL_INVESTOR
      },
      {
        text: 'About Us',
        to: urls.BTL_ABOUT
      },
      {
        text: 'Contact',
        to: urls.BTL_CONTACT
      }
    ]
  }
]

export const footerBottomLinks = [
  {
    text: 'Privacy Policy',
    to: paths.POLICY_PRIVACY
  },
  {
    text: 'Terms of Use',
    to: paths.POLICY_TOS
  }
]

export const headerNav = [
  {
    text: 'Platform',
    to: paths.PLATFORM,
    eventKey: 'platform'
  },
  {
    text: 'Developers',
    to: paths.DEVELOPERS,
    eventKey: 'developers'
  },
  {
    text: 'Pricing',
    to: paths.PRICING,
    eventKey: 'pricing'
  }
]

export const headerRightNav = [
  {
    text: 'Go to Accounts',
    to: urls.APP_ACCOUNT,
    eventKey: 'accounts',
    className: 'accounts-link'
  }
]

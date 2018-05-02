import constants from '../constants'
import iconChatBlue from '../assets/icons/iconChatBlue.svg'
import iconChatEmpty from '../assets/icons/iconChatEmpty.svg'
import iconCreateAccount from '../assets/icons/iconCreateAccount.svg'
import iconDownload from '../assets/icons/iconDownload.svg'
import iconExampleApp from '../assets/icons/iconExampleApp.svg'
import iconGitHuBBlue from '../assets/icons/iconGitHubBlue.svg'
import iconIBForDevs from '../assets/icons/iconIBForDevs.svg'
import iconManyChainsBlue from '../assets/icons/iconManyChainsBlue.svg'
import iconIBForBusiness from '../assets/icons/iconIBForBusiness.svg'
import iconPlatformFeaturesBlue from '../assets/icons/iconPlatformFeaturesBlue.svg'
import iconPricingFreeBlue from '../assets/icons/iconPricingFreeBlue.svg'
import iconResources from '../assets/icons/iconResources.svg'
import iconRoadmap from '../assets/icons/iconRoadmap.svg'
import iconShare from '../assets/icons/iconShare.svg'

export default {
  accountChain: {
    title: 'Sign up & explore your own Account chain',
    image: iconCreateAccount,
    content:
      'Use the Block Explorer to create, access, and view your individual Account chain in the browser.',
    to: constants.urls.APP_ACCOUNT
  },
  architectureExample: {
    title: 'Examples',
    image: iconExampleApp,
    content:
      'Explore the code and resources for existing applications demonstrating how different Interbit features are implemented.',
    to: constants.urls.GITHUB_IB
  },
  chainArchitecture: {
    title: 'Chain Architecture',
    image: iconManyChainsBlue,
    content:
      'Interbit apps use many blockchains that are joined together. This introduces a new area of solution design: Chain Architecture. Learn more here!',
    to: constants.paths.DEVELOPERS_ARCHITECTURE
  },
  contactUs: {
    title: 'Contact us',
    image: iconChatEmpty,
    content:
      'Get in touch to receive more information about Interbit and learn what it can do for your business.',
    to: constants.paths.CONTACT,
    className: 'blue'
  },
  downloadSDK: {
    title: 'Get the SDK',
    image: iconDownload,
    content:
      'Download the Interbit SDK and get started building blockchain applications within minutes.',
    to: constants.urls.GITHUB_IB,
    clickHandler: () => {
      window.ga(...constants.ga.CLICK_GET_SDK)
    }
  },
  forBusiness: {
    title: 'For Business',
    image: iconIBForBusiness,
    content:
      'Explore how Interbit solves scalability, speed, privacy limitations, and makes developing blockchain applications easy for your business.',
    to: constants.paths.PLATFORM_INTERBIT_FOR_BUSINESS
  },
  getStarted: {
    title: 'Get started with Interbit',
    content:
      'Explore documentation, example apps and code, blockchain architecture patterns, and community resources.',
    to: constants.paths.DEVELOPERS,
    image: iconIBForDevs
  },
  gitHub: {
    title: 'Find us on GitHub',
    content:
      'Our open-source repositories are located on GitHub. Let us know if you find a bug!',
    to: constants.urls.GITHUB_IB,
    image: iconGitHuBBlue
  },
  platformFeatures: {
    title: 'Platform Features',
    image: iconPlatformFeaturesBlue,
    content:
      'Patent-pending blockchain technology, and application services for building the next generation of distributed applications.',
    to: constants.paths.DEVELOPERS_PLATFORM_FEATURES
  },
  pricingEnterprise: {
    title: 'Contact us for Enterprise pricing options',
    image: iconChatEmpty,
    content:
      'If you\u2019re looking for a customized Enterprise level pricing option, please contact us for more information.',
    to: constants.paths.CONTACT,
    className: 'blue'
  },
  pricingFree: {
    title: 'FREE to developers for non-commercial use',
    image: iconPricingFreeBlue,
    content: 'Click here to learn more and get started with development.',
    to: constants.paths.DEVELOPERS,
    className: 'blue'
  },
  productRoadmap: {
    title: 'Product Roadmap',
    image: iconRoadmap,
    content:
      'We\u2019re building a platform of technologies to help you build better apps, faster. See what we have planned.',
    to: constants.paths.PLATFORM_ROADMAP
  },
  requestDemo: {
    title: 'Request a Demo',
    image: iconChatEmpty,
    content: 'Arrange to view a demo and speak to one of our experts.',
    to: constants.paths.CONTACT,
    className: 'blue'
  },
  resources: {
    title: 'Resources',
    image: iconResources,
    content:
      'Tutorials, links, and reference material for React, Redux, Node.js, Node Package Manager (npm), and functional programming in JavaScript.',
    to: constants.paths.DEVELOPERS_RESOURCES
  },
  shareWithFriend: {
    title: 'Share with a colleague or friend',
    image: iconShare,
    isMailto: true,
    content:
      'Introduce Interbit to your colleagues or friends. They\u2019ll receive an email and link that indicates it came from you. Don\u2019t worry we won\u2019t put them on any marketing lists.',
    to: `mailto:?subject=Interbit&body=I was recently on the interbit.io website and I thought you'd find it interesting. I'm emailing you this link so that you can take a look for yourself.`,
    className: 'blue'
  },
  support: {
    title: 'Support',
    image: iconChatBlue,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    to: constants.paths.DEVELOPERS_SUPPORT
  }
}

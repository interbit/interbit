import constants from '../../constants'

import cardStartingBlock from '../../assets/cards/cardStartingBlock2.jpg'
import cardNewsroom from '../../assets/cards/cardNewsroom.svg'
import cardCore from '../../assets/cards/cardCore.jpg'
import cardAccounts from '../../assets/cards/cardAccounts.jpg'
import cardHosting from '../../assets/cards/cardHosting.jpg'
import cardStore from '../../assets/cards/cardStore.jpg'

export default {
  title: 'Build better apps, faster',
  intro: {
    content:
      'Interbit&trade; is a platform of application services designed to help build, deploy, and promote applications.'
  },
  section3: {
    cards: [
      {
        title: 'The Starting Block',
        content: `Have an idea for a blockchain-based business or application? We are accepting submissions to be part of the Starting Block program.`,
        image: cardStartingBlock,
        callToActions: [
          {
            to: constants.urls.STARTING_BLOCK,
            text: 'Apply to the Program'
          }
        ]
      },
      {
        title: 'Newsroom',
        content:
          'Interested in the the latest news coverage or upcoming events? The newsroom includes press, events, and blog posts.',
        image: cardNewsroom,
        callToActions: [
          {
            to: constants.urls.BTL_BLOG,
            text: 'Read the Latest News'
          }
        ]
      }
    ]
  },
  weDoBlockChain: {
    title: 'We do blockchain differently',
    content: `We realized nearly two years ago that a single blockchain would never scale to the requirements of enterprise applications. Nor could it meet the privacy demands of the enterprise. To solve these problems, Interbit uses many blockchains that can be joined to form many different solution architectures. Interbit applications can be designed to promote privacy, scalability, and resiliency - all hallmarks of enterprise applications.`
  },
  cardsSection: {
    cards: [
      {
        title: 'Core',
        content:
          'Powered by our proprietary next generation blockchain with patent-pending chain joining capabilities.',
        image: cardCore,
        callToActions: [
          {
            to: constants.urls.GITHUB_IB,
            text: 'Get the SDK',
            clickHandler: () => {
              window.ga(...constants.ga.CLICK_GET_SDK)
            }
          }
        ]
      },
      {
        title: 'Accounts',
        content:
          'A secure identity service provided to users and developers through an easy-to-integrate Single Sign-On experience.',
        image: cardAccounts,
        callToActions: [
          {
            to: constants.urls.GITHUB_IB,
            text: 'View Source on GitHub'
          },
          {
            to: constants.urls.APP_STORE_ACCOUNTS,
            text: 'View App in Store'
          }
        ]
      },
      {
        title: 'Hosting',
        content:
          'Simple, hassle-free hosting for your development projects. Host on Interbit or with other providers.',
        image: cardHosting
      },
      {
        title: 'Store',
        content:
          'A place to discover apps, and for developers to connect, collaborate, promote and sell their products and services.',
        image: cardStore,
        callToActions: [
          {
            to: constants.urls.APP_STORE,
            text: 'View Store'
          }
        ]
      }
    ]
  }
}

import constants from '../../constants'

import cardNewsroom from '../../assets/cards/cardNewsroom.svg'
import cardCore from '../../assets/cards/cardCore.jpg'

export default {
  title: 'Build better apps, faster',
  intro: {
    content:
      'Interbit&trade; is a platform of application services designed to help build, deploy, and promote applications.'
  },
  section3: {
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
  }
}

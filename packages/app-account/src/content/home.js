import cardDeleteData from '../assets/cardDeleteData.svg'
import cardOneAccount from '../assets/cardOneAccount.svg'
import cardPrivacy from '../assets/cardPrivacy.svg'
import cardTransparency from '../assets/cardTransparency.svg'
import homeHeader from '../assets/homeHeader.jpg'

export default {
  image: homeHeader,
  title: 'Take privacy for granted',
  intro: `Your personal information is your business, and nobody else\u2019s.

Securely connect to apps, with transparency around what information you\u2019ve shared with them. Remove access to apps you no longer use, or delete all your information \u2014 all in one place.`,

  cards: [
    {
      title: 'One account',
      content:
        'Control your information from a single place. When you stop using an app, cut off the access you\u2019ve granted. Shrink your digital footprint.',
      image: cardOneAccount
    },
    {
      title: 'Privacy & access',
      content:
        'Securely connect to apps while keeping control of your information. It always remains with you and you decide what to share.',
      image: cardPrivacy
    },
    {
      title: 'Total transparency',
      content:
        'When you\u2019ve authorized apps to access pieces of your information, your account makes it crystal clear what\u2019s being shared.',
      image: cardTransparency
    },
    {
      title: 'Delete your data',
      content:
        'What you add to your account belongs to you. Deleting your information removes all access  you\u2019ve granted to apps.',
      image: cardDeleteData
    }
  ]
}

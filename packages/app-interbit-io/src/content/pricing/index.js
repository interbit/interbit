import iconAttention from '../../assets/icons/iconAttention.svg'
import iconPricingBasic from '../../assets/icons/iconPricingBasic.svg'
import iconPricingMedium from '../../assets/icons/iconPricingMedium.svg'
import iconPricingPower from '../../assets/icons/iconPricingPower.svg'
import iconPricingEnterprise from '../../assets/icons/iconPricingEnterprise.svg'
import constants from '../../constants'

export default {
  title: 'Only pay for what you need',
  contentBar: {
    title: 'Attention',
    content: `Interbit will be free for everyone during our public launch time-frame. During this time the Interbit Platform is currently a test environment provided for information, education, and evaluation purposes.

We will be continually updating Interbit - adding functionality, applications, and addressing issues.`,
    image: iconAttention
  },
  intro: `We won\u2019t have pay-as-you grow pricing until we transition out of test mode. During this time we are talking to our growing community to be sure that our customers can start for free and then pay only for what they need. And, be happy with the bill.

Connect with us [here](${
    constants.paths.CONTACT
  }) or come talk to us at the next [event](http://btl.co/events/).`,

  pricingTitle: 'Pay-as-you-grow',
  pricingTiles: [
    {
      title: 'Basic',
      price: '$ / Month',
      image: iconPricingBasic,
      info: [
        {
          title: 'CPU',
          content: 'Medium'
        },
        {
          title: 'Database Size',
          content: '1-5 GB'
        },
        {
          title: 'RAM',
          content: '21-50 MB'
        },
        {
          title: 'Disk',
          content: 'Up to 50 TB'
        },
        {
          title: 'Networking Ports',
          content: 'Balanced'
        }
      ]
    },
    {
      title: 'Medium',
      price: '$ / Month',
      image: iconPricingMedium,
      info: [
        {
          title: 'CPU',
          content: 'Large'
        },
        {
          title: 'Database Size',
          content: 'Max 20 GB'
        },
        {
          title: 'RAM',
          content: '51-100 MB'
        },
        {
          title: 'Disk',
          content: '51-499 TB'
        },
        {
          title: 'Networking Ports',
          content: 'Fast'
        }
      ]
    },
    {
      title: 'Power',
      price: '$ / Month',
      image: iconPricingPower,
      info: [
        {
          title: 'CPU',
          content: 'Extra Large'
        },
        {
          title: 'Database Size',
          content: 'Max 50 GB'
        },
        {
          title: 'RAM',
          content: '101-200 MB'
        },
        {
          title: 'Disk',
          content: '500-899 TB'
        },
        {
          title: 'Networking Ports',
          content: 'Balanced'
        }
      ]
    },
    {
      title: 'Enterprise',
      price: 'Contact for pricing',
      image: iconPricingEnterprise,
      info: [
        {
          title: 'CPU',
          content: 'Custom'
        },
        {
          title: 'Database Size',
          content: 'Custom'
        },
        {
          title: 'RAM',
          content: 'Custom'
        },
        {
          title: 'Disk',
          content: 'Custom'
        },
        {
          title: 'Networking Ports',
          content: 'Custom'
        }
      ]
    }
  ],
  pricingNote: `*Pricing tiers are samples only`,

  metrics: {
    title: 'Interbit virtual server metrics',
    sections: [
      {
        title: 'CPU',
        content: `CPU is consumed when the Interbit Virtual Server processes transactions and performs the work to create blocks.`
      },
      {
        title: 'Database',
        content: `The storage requirements of your blockchain. This is the size of all your blocks.`
      },
      {
        title: 'RAM',
        content: `The accessible memory of the blockchain. It is where the active state lives.`
      },
      {
        title: 'Disk',
        content: `Sometimes you'll need storage for payloads (larger binary files) that don't need to be on the blockchain.`
      },
      {
        title: 'Networking ports',
        content: `Interbit blockchains can join to one another. These joins can be optimized in various ways.`
      }
    ]
  }
}

import constants from '../../constants'
import iconAttention from '../../assets/icons/iconAttention.svg'
import iconAccounts from '../../assets/icons/iconAccounts.svg'
import iconHosting from '../../assets/icons/iconHosting.svg'
import iconIBCore from '../../assets/icons/iconIBCore.svg'
import iconPayments from '../../assets/icons/iconPayments.svg'
import iconStore from '../../assets/icons/iconStore.svg'
import iconTools from '../../assets/icons/iconTools.svg'

export default {
  title: 'Product roadmap',
  attention: {
    title: 'Attention',
    content: `Interbit will be free for everyone during our public launch time-frame. During this time, the platform should not be considered production ready. Your patience is appreciated during this exciting time.

The Interbit team is an agile team that will react to  community needs and work continuously, releasing fixes and new features.`,
    image: iconAttention
  },
  intro: `This release not only marks a significant milestone in the maturity of our proprietary technology, it also unveils the Interbit platform, which will serve as the hub for our communities, a development platform for applications as well as end-to-end app commercialization support via our Store.

We’ve spent the last 2 years designing and developing Interbit, a next generation blockchain that features patent-pending secure chain joining. Unlike other blockchains, Interbit makes it incredibly easy to create many lightweight blockchains and join them together. This unique approach allows for flexible and powerful many chain architectures that can horizontally scale and achieve true privacy. See what we’re doing at a technical level by viewing our [detailed roadmap](https://ext.prodpad.com/ext/portfolio/cded6a66a54757a024c4ef0f9a886c6d48a5a1bd).`,

  features: [
    {
      title: 'Core',
      contentBar: {
        title: 'Core',
        content: `Powered by our proprietary next generation blockchain with patent-pending chain joining capabilities.`,
        image: iconIBCore,
        className: 'image-sm',
        callToAction: {
          to: constants.urls.GITHUB_IB,
          text: `View Source for \u201CCreate-interbit-app\u201D`
        }
      },
      properties: [
        {
          title: '100% new code',
          content: `We designed and built Interbit from the ground up to solve the scalability and privacy issues of today’s blockchains.`
        },
        {
          title: 'Patent-pending chain joining',
          content: `Unique to Interbit, developers can design and build applications that run on many chain architectures.`
        },
        {
          title: 'Free for developers',
          content: `Interbit will always have a free tier for developers to learn and build non-commercial applications.`
        },
        {
          title: 'Pricing',
          content: `Interbit will be available in pay-as-you-grow (consumption) and enterprise licence models.`
        },
        {
          title: 'Small, yet powerful API',
          content: `Develop using familiar and proven Redux patterns and three primary API calls; dispatch(), getState(), subscribe().`
        },
        {
          title: '3rd party security audit',
          content: `We will be reacting to and reporting on any vulnerabilities reported by our 3rd party security audit organization.`
        },
        {
          title: 'BFT (Byzantine Fault Tolerance)',
          className: 'grey',
          content: `Upcoming:

Rotating proposer and a PBFT algorithm is in progress.  `
        },
        {
          title: 'High performance networking',
          className: 'grey',
          content: `Upcoming:

Networking and chain join performance enhancements.`
        },
        {
          title: 'Support for mobile',
          className: 'grey',
          content: `Upcoming:

Port Interbit light node code to run on Android and iOS.`
        }
      ]
    },

    {
      title: 'Accounts',
      contentBar: {
        title: 'Accounts',
        content: `A secure identity service provided to users and developers through an easy-to-integrate Single Sign-On experience.`,
        image: iconAccounts,
        className: 'image-sm',
        callToAction: {
          to: constants.urls.APP_STORE_ACCOUNTS,
          text: 'View app in the Store'
        }
      },
      properties: [
        {
          title: 'Single Sign-On',
          content: `Securely connect to apps, remove access for apps you no longer use, or delete your account information entirely, all in one place.`
        },
        {
          title: 'Control access to your data',
          content: `Every Interbit user gets their own account chain, and can control which apps have read-access to their information.`
        },
        {
          title: 'Open-source application',
          content: `Developers can easily integrate the identity service into apps and  adopt next generation identity data management protocols.`
        },
        {
          title: 'Profile expansion',
          className: 'grey',
          content: `Upcoming:

Expansion to include relevant personal data to support future KYC and payment capabilities.`
        },
        {
          title: 'Multiple-device support',
          className: 'grey',
          content: `Upcoming:

We\u2019re building solutions to allow for authentication across multiple devices.`
        },
        {
          title: 'Account aliases',
          className: 'grey',
          content: `Upcoming:

Support for multiple account roles: personal, work, team member, etc.`
        },
        {
          title: 'Identity chains with KYC',
          className: 'grey',
          content: `Upcoming:

Vendors providing a KYC service to apps requiring identity verification in your account.`
        },
        {
          title: 'Partner / Developer directory',
          className: 'grey',
          content: `Upcoming:

Add info to connect consumers to builders and enabling end-to-end commercialization support.`
        }
      ]
    },

    {
      title: 'Store',
      contentBar: {
        title: 'Store',
        content: `A place to discover apps, and for developers to connect, collaborate, promote and sell their products and services.`,
        image: iconStore,
        className: 'image-sm',
        callToAction: {
          to: constants.urls.APP_STORE,
          text: 'Go to the Store'
        }
      },
      description: {
        title: 'Marketplace',
        content: `Interbit has the potential to bring together three communities around the central value of blockchain-based applications.

Developers, enterprise customers, and individual consumers can all benefit from a platform that makes building blockchain apps faster, easier and with higher quality.`
      },
      properties: [
        {
          title: 'Promote and sell apps & services',
          className: 'grey',
          content: `Upcoming:

Connect and collaborate on applications or integrate their services into your project.`
        },
        {
          title: 'Connect with developers',
          content: `Promote your apps and services to potential users and other developers. `
        },
        {
          title: 'App rating and reviews',
          className: 'grey',
          content: `Upcoming:

Rating and review functions will enable the best apps to become more successful in the Store.`
        },
        {
          title: 'Featured Apps',
          className: 'grey',
          content: `Upcoming:

Interesting and useful apps will be featured and receive extra exposure to potential users.`
        },
        {
          title: 'Additional promotional media',
          className: 'grey',
          content: `Upcoming:

New types of media for promoting your product will be added as the Store grows.`
        },
        {
          title: 'Store / App analytics',
          className: 'grey',
          content: `Upcoming:

Provide app sellers with valuable insights on store traffic and app engagement metrics.`
        }
      ]
    },

    {
      title: 'Hosting',
      contentBar: {
        title: 'Hosting (Upcoming)',
        content: `Simple, hassle-free hosting for your development projects. Host on Interbit or with other providers.`,
        image: iconHosting,
        className: 'image-sm in-progress'
      },
      properties: [
        {
          title: 'Configurable hosting',
          className: 'grey',
          content: `Upcoming:

Support changes to the hosting configuration, i.e. host on more nodes for redundancy purposes.`
        },
        {
          title: 'Amazon machine image',
          className: 'grey',
          content: `Upcoming:

Prepare an Interbit image for Amazon AWS that can be deployed instantly.`
        },
        {
          title: 'Cross-cloud deployment',
          className: 'grey',
          content: `Upcoming:

Supporting the deployment and hosting of chains across multiple regions and cloud providers.`
        }
      ]
    },

    {
      title: 'Tools',
      contentBar: {
        title: 'Tools',
        content: `Tools built into Interbit that ease or eliminate common developer challenges in the application development life cycle.`,
        image: iconTools,
        className: 'image-sm'
      },
      properties: [
        {
          title: 'Create Interbit App',
          content: `A command-line tool to speed up the creation of Interbit apps and manage the distributed application life cycle.`
        },
        {
          title: 'CLI',
          content: `Command-line tools to start, run, and control nodes. Build, deploy, and manage changes across multiple chains. Create new Interbit projects.`
        },
        {
          title: 'Meta-platform and apps',
          content: `All platform apps are open-source, and can be explored, reconfigured, or integrated.`
        },
        {
          title: 'Chain query tools',
          className: 'grey',
          content: `Upcoming:

Ability to query data in chain(s) and export resulting data-sets in XML or similar format.`
        },
        {
          title: 'In-browser IDE',
          className: 'grey',
          content: `Upcoming:

Provide developers with a way to immediately start coding with an in-browser IDE.`
        },
        {
          title: 'Stress/Load testing',
          className: 'grey',
          content: `Upcoming:

Tools to help app developers to stress and load test their apps.`
        }
      ]
    },

    {
      title: 'Payments',
      contentBar: {
        title: 'Payments (Upcoming)',
        content: `Payment processing to support Interbit licence payments, Store purchases, and payment services for in app purchases.`,
        image: iconPayments,
        className: 'image-sm in-progress'
      },
      properties: [
        {
          title: 'Licence payments',
          className: 'grey',
          content: `Upcoming:

Payment processing for Interbit licensing.`
        },
        {
          title: 'Payment processing service',
          className: 'grey',
          content: `Upcoming:

Payment services for integration into Interbit-powered apps.`
        }
      ]
    }
  ],

  quote: {
    content: `We\u2019ve built this platform for you.

We\u2019re excited to see all the amazing things you\u2019ll build and we want to help. Connect with us, tell us what you need, complain, sing our praises... we want to hear it.

*- The Interbit Team*`
  }
}

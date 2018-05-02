import constants from '../../constants'

import iconAccounts from '../../assets/icons/iconAccounts.svg'
import iconBuild from '../../assets/icons/iconBuild.svg'
import iconCreateIBApp from '../../assets/icons/iconCreateIBApp.png'
import iconHosting from '../../assets/icons/iconHosting.svg'
import iconIntegration from '../../assets/icons/iconIntegration.svg'
import iconLightning from '../../assets/icons/iconLightning.svg'
import iconManyChains from '../../assets/icons/iconManyChains.svg'
import iconPayments from '../../assets/icons/iconPayments.svg'
import iconStore from '../../assets/icons/iconStore.svg'

export default {
  title: 'Overview',
  heading: 'How to build better apps, faster',
  productRoadmap: {
    title: 'Product Roadmap',
    items: [
      {
        text: `Spare ribs
      (Q4 2018)`
      },
      {
        text: `Turducken
        (Q4 2018)`
      },
      {
        text: `Beef pork belly
        (Q4 2018)`
      },
      {
        text: `Ribs jerky prosciutto
        (Q4 2018)`
      },
      {
        text: `Steak
        (Q4 2018)`
      }
    ]
  },

  intro: {
    text: `Interbit helps you build better apps, faster—and get them into the hands of users who need them.

Interbit is a general purpose, permission-based blockchain platform built specifically for the rapid development of applications. As a blockchain built entirely with JavaScript—Interbit is for all developers, not just those with blockchain experience.

Interbit enables you to use many blockchains, joined together, to build your applications—instead of a single, monolithic chain. This allows those chains to share data securely between them, enabling service-oriented architectures.

[Go to docs now.](${constants.urls.SDK_DOCS})`
  },

  getStarted: {
    title: 'Get started now',
    cards: [
      {
        title: 'Start coding, faster',
        content:
          'Build your app in JavaScript with familiar tools, libraries, and packages.',
        image: iconLightning
      },
      {
        title: 'Build apps, not infrastructure',
        content:
          'Build features and functions and leave the persistence and server infrastructure to Interbit.',
        image: iconBuild
      },
      {
        title: 'Built-in integration',
        content:
          'Secure, on-chain integrations. Apps built with Interbit integrate with one another by chain joining.',
        image: iconIntegration
      },
      {
        title: 'Many chain architectures',
        content:
          'Interbit was designed to support many joined chains per solution.',
        image: iconManyChains
      }
    ]
  },

  appsBuilt: {
    title: 'Apps built with Interbit are',
    characteristics: [
      {
        title: 'Fault tolerant',
        content: 'Resist faults, malicious and benign'
      },
      {
        title: 'Auditable',
        content: 'Perfect audit, no logs'
      },
      {
        title: 'Disaster recovery',
        content: 'RTO & RPO nearly zero'
      },
      {
        title: 'Data integrity',
        content: 'Immutable app history'
      },
      {
        title: 'Distributed',
        content: 'Choose between global or local deployments'
      },
      {
        title: 'High availability',
        content: 'Always on, cross cloud applications'
      },
      {
        title: 'Redundant',
        content: 'No external backups'
      }
    ]
  },

  commonServices: {
    title: 'Platform apps and services',
    bars: [
      {
        title: 'Create Interbit App',
        image: iconCreateIBApp,
        content:
          'A tool that saves you from time-consuming setup and configuration and lets you get right to building your app.',
        callToActions: [
          {
            to: constants.urls.GITHUB_IB,
            text: 'View Source on GitHub'
          }
        ]
      },
      {
        title: 'Accounts',
        image: iconAccounts,
        content:
          'Secure identity service with an easy-to-integrate Single Sign-On experience.',
        callToActions: [
          {
            to: constants.urls.GITHUB_IB,
            text: 'View Source on GitHub'
          },
          {
            to: constants.urls.APP_ACCOUNT,
            text: 'Open App'
          }
        ]
      },
      {
        title: 'AccountKit',
        image: iconAccounts,
        content:
          'Easily implement account creation and authentication functions within your app.',
        callToActions: [
          {
            to: constants.urls.GITHUB_IB,
            text: 'View Source on GitHub'
          }
        ]
      },
      {
        title: 'Store',
        image: iconStore,
        content:
          'A place to discover, promote, and distribute apps and application services.',
        callToActions: [
          {
            to: constants.urls.APP_STORE,
            text: 'Open App'
          }
        ]
      },
      {
        title: 'Hosting',
        image: iconHosting,
        className: 'in-progress',
        content: `Easy packaging and deployment of Interbit-powered apps. Get your project hosted within minutes.

Coming Soon`
      },
      {
        title: 'HostingKit',
        image: iconHosting,
        className: 'in-progress',
        content: `Easily deploy projects to your host. HostingKit takes care of packaging Interbit apps for hosting providers.

Coming Soon`
      },
      {
        title: 'Payments',
        image: iconPayments,
        content: `Collect payments from your customers with Interbit. Micro-transactions have never been this easy.

Coming Soon`,
        className: 'in-progress'
      }
    ]
  }
}

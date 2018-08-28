import constants from '../../constants'

import iconBuild from '../../assets/icons/iconBuild.svg'
import iconCreateIBApp from '../../assets/icons/iconCreateIBApp.png'
import iconIntegration from '../../assets/icons/iconIntegration.svg'
import iconLightning from '../../assets/icons/iconLightning.svg'
import iconManyChains from '../../assets/icons/iconManyChains.svg'

export default {
  title: 'Overview',
  heading: 'How to build better apps, faster',
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
        title: 'Disaster recoverable',
        content: 'RTO & RPO nearly zero'
      },
      {
        title: 'Ensured data integrity',
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
      }
    ]
  }
}

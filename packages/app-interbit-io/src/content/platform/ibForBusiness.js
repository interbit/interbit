import iconChainJoin from '../../assets/icons/iconChainJoin.svg'
import iconCheck from '../../assets/icons/iconCheck.svg'
import iconHowyl from '../../assets/icons/iconHowyl.png'
import iconIBForDevsGrey from '../../assets/icons/iconIBForDevsGrey.svg'
import iconIBNoBorder from '../../assets/icons/iconIBNoBorder.svg'
import iconLink from '../../assets/icons/iconLink.svg'
import iconPointer from '../../assets/icons/iconPointer.svg'

import businessLogoRedux from '../../assets/pageIBForBusiness/businessLogoRedux.png'
import businessLogoReact from '../../assets/pageIBForBusiness/businessLogoReact.png'
import businessLogoNode from '../../assets/pageIBForBusiness/businessLogoNode.svg'
import businessLogoLambda from '../../assets/pageIBForBusiness/businessLogoLambda.svg'
import businessLogoBP from '../../assets/pageIBForBusiness/businessLogoBP.svg'
import businessLogoWien from '../../assets/pageIBForBusiness/businessLogoWien.png'
import businessLogoEni from '../../assets/pageIBForBusiness/businessLogoEni.svg'

import businessHeader from '../../assets/pageIBForBusiness/businessHeader.jpg'

export default {
  headerImage: businessHeader,
  title: 'Interbit for business',
  intro: {
    content: `Build blockchain apps with the privacy, speed, and scalability required for enterprise businesses.`,
    cards: [
      {
        title: 'Privacy and scalability',
        content:
          'Chain joining is unique to Interbit. Chain joining delivers privacy by separating chains and delivers scale by joining them.',
        image: iconChainJoin
      },
      {
        title: 'Developer friendly',
        content:
          'Interbit provides a huge leap forward in the practicality of implementing distributed applications with established development skill-sets.',
        image: iconIBForDevsGrey
      },
      {
        title: 'Complexity is the enemy of security',
        content:
          'Interbit\u2019s simple API and popular, proven application design patterns support elegant & efficient development of complex requirements.',
        image: iconCheck
      },
      {
        title: 'Simple, rapid deployment',
        content:
          'Deploy, run, and share access to your Interbit blockchain app in just a few clicks.',
        image: iconPointer
      }
    ]
  },

  getStarted: {
    title: 'Powerful \u0026 easy to use. Get started today.',
    content: `Your in-house team is your blockchain team.

Skilled blockchain developers are expensive and hard to find. The current open-source and public blockchains require a significant investment of time to learn, digest, and practice before meaningful application development can take place. This often includes learning new languages and tools that most developers have little to no experience with.

Interbit was designed to expose the power and benefits of blockchain technology to application developers via some of today’s most familiar, popular and proven languages, tools and design patterns.`,
    secondPara: `Interbit empowers development teams to user their existing skill-sets to design and build blockchain-based distributed applications. `
  },

  logos: [
    {
      image: businessLogoRedux,
      alt: 'Redux'
    },
    {
      image: businessLogoReact,
      alt: 'ReactJS'
    },
    {
      image: businessLogoNode,
      alt: 'NodeJS'
    },
    {
      image: businessLogoLambda,
      alt: 'LambdaJS'
    }
  ],

  quoteHowyl: {
    content:
      'Development teams can progress very quickly by coding in JavaScript, against a simple API following proven Redux application design patterns without having to deal with low level blockchain functions.',
    author: 'Marc Low',
    publication: 'CEO, Howyl',
    image: iconHowyl
  },

  enterpriseScale: {
    title: 'Enterprise scalability and speed',
    content: `Interbit’s patent-pending chain joining capabilities provide enterprises with the blockchain scalability they need.

Unlike the monolithic public blockchains that slow down (the time to reach consensus, validate transactions and create a new block) as the # of transactions increases, Interbit's chain joining capabilities allow developers to scale simply by adding more chains. Additionally, developers can create chains that are optimized for specific functions and join those to create many chain application architectures. Interbit's chain joining capability is a viable way to meet the speed and scale enterprises demand.`
  },

  quoteETH: {
    content:
      'Public chains have transaction confirmation times ranging from 15 seconds to hours.',
    author: 'ETH Gas Station',
    publication: 'https://ethgasstation.info/index.php',
    image: iconLink,
    callToActions: [
      {
        to: 'http://etherscan.io',
        text: 'See etherscan.io'
      },
      {
        to: 'http://blockchain.info',
        text: 'See blockchain.info'
      }
    ]
  },

  privacy: {
    title: 'Privacy you can count on',
    content: `The very nature of a blockchain (distributed ledger) assumes that copies of the data exist on all nodes on the network. For many businesses this is simply an unacceptable situation (even if the data is encrypted) given the risk of inadvertent sharing of sensitive data (sometimes called metadata leakage) raises competitive concerns among parties on the same chain.

Interbit’s unique abilities to create chains, selectively join them into a many chain architecture, *and* have granular control over what data is shared between them results in true privacy through data segregation and eliminates the possibility of metadata leakage. True privacy, in your control.

This mixture of securely connected chains can address a wide range of competitive, legal and regulatory challenges, enabling a large network of collaborative and competitive organizations to all selectively share the required data to operate effectively with the appropriate degree of transparency.`
  },

  quoteBTL: {
    content:
      'Our enterprise clients tell us that keeping their sensitive data truly private by segregating it into purpose built chains is one of our biggest advantages.',
    author: 'Dom McCann',
    publication: 'CEO of BTL',
    image: iconIBNoBorder
  },

  consortia: {
    logos: [
      {
        image: businessLogoBP,
        alt: 'BP'
      },
      {
        image: businessLogoWien,
        alt: 'Wien Energie'
      },
      {
        image: businessLogoEni,
        alt: 'eni'
      }
    ],
    title: 'Privacy in consortia trading relationships',
    content: `Our European Energy Pilot with BP, Wien, and ENI is an excellent example of data privacy through segregation, enabled by a many chain architecture. In this case, trust and privacy among the trading partners was enhanced by running separate chains for each trading relationship. The inherent benefits of blockchain technology brought new levels of transparency and efficiency to the energy trade reconciliation business process for each relationship and delivered significant time and cost savings to those participants who traded on the blockchain.`
  }
}

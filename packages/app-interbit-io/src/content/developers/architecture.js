import devArchModularity from '../../assets/pageDevArchitecture/devArchModularity.svg'
import devArchPrivacy from '../../assets/pageDevArchitecture/devArchPrivacy.svg'
import devArchSecurity from '../../assets/pageDevArchitecture/devArchSecurity.svg'
import devArchScalability from '../../assets/pageDevArchitecture/devArchScalability.svg'

export default {
  title: 'Chain architecture',
  intro: `Interbit gives the developer the ability to use many, perhaps thousands, of blockchains within a single application. This approach to blockchain provides a number of benefits including fine-grained privacy control. When designing solutions, the architect must identify how the chains connect and provide services to one another.`,

  sections: [
    {
      title: 'Privacy',
      intro: `Interbit keeps data absolutely private by segregating confidential data to different chains. Because of this many chain approach, it is important for a solution architect to identify the privacy domains within an application and begin designing around this.`,
      example: `**Example:** In a supply chain, it is important to keep invoice data private between the supplier and the purchaser. With Interbit, a supply chain application might have a single blockchain for each supplier in the network. Confidential information will be stored there and data relevant to the network will be shared with the chain that tracks movement of the goods. This way, no one but the supplier and purchaser will have access to the confidential information, but everyone on the supply chain will have access to the shared data.`,
      image: devArchPrivacy
    },
    {
      title: 'Modularity',
      intro: `The ability to quickly connect chains with Interbit allows the developer to separate out responsibilities to different chains within an application instead of having a single chain manage all of the functions for an application. This also makes for efficient testing and upgrading of just a single component of an application. `,
      example: `**Example:** Most applications will require some sort of authorization to access and this authorization is done via some identity service. As a part of the Interbit platform, we have designed an identity service that can be used as a part of any application a user wants to access. Modularizing identity in this way makes this service independent and reusable with other applications.`,
      image: devArchModularity
    },
    {
      title: 'Security',
      intro: `Aside from the standard permissioning on an Interbit blockchain, our many chain approach can help with keeping users at a distance from critical information. `,
      example: `**Example:** A hospital stores patient medical records on a blockchain and they need to issue a prescription for a patient that can be accessed by a pharmacy. Due to privacy concerns, the hospital will not allow the pharmacies to directly access the hospital patient records blockchain. We build another blockchain "proxy" that is shared directly with the pharmacies and contains only the prescription data. This shares the data in a secure way and doesn't compromise any patient records.`,
      image: devArchSecurity
    },
    {
      title: 'Scalability',
      intro: `One of the most significant benefits to the many connected chain approach of Interbit is that Interbit is able to scale unlike any other blockchain. Typically, consensus is the blockchain bottleneck, but for Interbit each chain manages consensus on its own. This eliminates the need to run all of the transactions of a blockchain network through a single consensus mechanism.`,
      example: `**Example:** Running an interbank transfer network on a blockchain will quickly run into problems of scale. With Interbit, we can divide the payment processing chain into many chains, to lighten the load. The joins between each of these chains will update critical information as it changes.`,
      image: devArchScalability
    }
  ]
}

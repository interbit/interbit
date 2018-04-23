# Notes

This file captures some of the thinking around the long-term vision for the chain design.


## Example state for a mature project chain

```JavaScript
const initialState = Immutable.from({
  // Sample state
  chainMetadata: {
    chainName: 'ChainedIn professional networking'
  },
  // This is the account information associated with this application
  // The account is used to pay for hosting and other services required to
  // develop, test and deploy the application. The account also contains licensing
  // and other revenue paid by the application owners and customers to use the application.
  // The account information also needs to define who can make withdrawls from the
  // account, should the app make more money in fees than it pays out in costs.
  ledger: {},
  // These are the people involved with developing the chain, who can see or modify the
  // source code, who can deploy to testnet or the app store.
  participants: {}, // aka. developers, collaborators
  // These are the governance rules for managing the project
  governance: {},
  // Source code management
  sourceCode: {
    provider: 'Github',
    repositoryUrl: 'https://github.com/BlockchainTechLtd/chainedIn',
    access: 'Private'
  },
  // This is the directory entry that will be created
  // on the app directory? My Projects directory?
  directoryMetadata: {
    name: 'ChainedIn',
    description: 'Network with your colleagues or something I guess',
    thumbnail: 'howDoWeStoreThese/downTheRabbitHole.jpg',
    publisher: {
      'ds5a4-r3ew87-c46ax8-43e2awr': { chainName: 'BTL' }
    },
    // APP         : User runs covenenant on their own chain
    // SUBSCIPTION : User license for access to remote hosted chain
    // ...
    deploymentModel: 'APP',
    privacyPolicy: {},
    status: 'LAUNCHED' // How do we know which version in on the app store and which is in development?
    // Are we going to launch from a specific github commit hash? Hook to branch?
    // ...
  },
  // Hosting and deployment related information
  // The general idea is that requests to host the app will originate on this chain
  // and the chain will contain information on the current deployment and provide a
  // token balance to fund hosting.
  // There is obviously some overlap with the application directory as a combination
  // of the directoryMetadata and deployment details will be registered with the
  // app directory on successful deployment. Some of this information (such as the public URL)
  // may be provided by the hosting chain.
  deployment: {
    'ds5a4-r3ew87-c46ax8-43e2awr': {
      covenantHash: 'sd563f1cvas98r41qea53fdsa6974fsf7c48ad16rea84rf1sa856345e',
      sourceHash: 'ds5a4-r3ew87-c46ax8-43e2awr',
      date: 1887767883009888,
      hostingProvider: {
        'ds5a4-r3ew87-c46ax8-43e2awr': { chainName: 'testnet' }
      },
      deploymentType: 'TEST',
      url: 'https://chainedin.testnet.interbit.io/',
      access: {
        accessType: 'PRIVATE',
        authorization: [
          { 'ds5a4-r3ew87-c46ax8-43e2awr': { chainName: 'joe' } },
          { 'ds5a4-r3ew87-c46ax8-43e2awr': { chainName: 'bert' } }
        ]
      }
    },
    'ab5a4-r3ew87-c46ax8-43e2awr': {
      covenantHash: 'fdsa6974fsd563f1cvas98r41qea53sf7c48ad16rea84rf1sa856345e',
      sourceHash: 'ds5a4-r3ew87-c46ax8-43e2awr',
      date: 1887767883009888,
      hostingProvider: {
        'ds5a4-r3ew87-c46ax8-43e2awr': { chainName: 'heroku' }
      },
      deploymentType: 'PRODUCTION',
      url: 'https://chainedin.com/',
      access: {
        accessType: 'APP',
        price: {
          amt: 10.0,
          type: 'USD-TOKEN'
        }
      }
    }
  },
  // This is the current information about this project from the application directory
  'app-directory': {
    name: 'ChainedIn',
    url: 'https://chainedin.com/',
    price: {
      amt: 10.0,
      type: 'USD-TOKEN'
    },
    description: 'Network with your colleagues or something I guess',
    thumbnail: 'howDoWeStoreThese/downTheRabbitHole.jpg',
    publisher: {
      'ds5a4-r3ew87-c46ax8-43e2awr': { chainName: 'BTL' }
    },
    privacyPolicy: {},
    app: {
      type: 'APP',
      covenantHash: 'fdsa6974fsd563f1cvas98r41qea53sf7c48ad16rea84rf1sa856345e'
    }
  }
})
```

# Glossary


## ACL

Access Control List. This list indicates who is permitted to do what on
any given blockchain.


## Action Creator

Action creators are precisely named - they are functions that create Actions.

See [Redux Basics - Action Creators](http://redux.js.org/docs/basics/Actions.html#action-creators)


## Action

Actions are payloads of information that send data. They are the only source of information. Actions are sent to the blockchain via `.dispatch()` where they are interpreted by a Smart Contract.

See Key Concept entry for [Actions](/key-concepts/actions.adoc).

Also see:

- [Redux Basics - Actions](http://redux.js.org/docs/basics/Actions.html)
- [Redux Glossary - Action](http://redux.js.org/docs/Glossary.html#action)
- [Redux FAQ - Actions](http://redux.js.org/docs/faq/Actions.html)


## Application

Every distinct application built on the Interbit platform. The platform
itself comprises many of these, but this also includes apps.


## Application State

The application state is the state resulting from all of the actions in
the blockchain being passed through the smart contracts, from the
initial state and [genesis block](#genesis-block) up to the latest
block.

See Key Concept entry for [Application State](/key-concepts/state.adoc).

See [Redux Glossary - State](http://redux.js.org/docs/Glossary.html#state)


## Block

A block is a sequential set of actions that are grouped together, and
then linked by cryptographic hash to the preceding blocks on a chain.

Within Interbit, each block may be comprised of these pieces:

* Actions - one or more actions
* Application State Hash
* Previous Block’s Hash

See Also: [Genesis Block](#genesis-block)


## Blockchain

A blockchain is a distributed system whose transactions
([actions](/key-concepts/actions.adoc)) securely link to each other to
provide an immutable history and a single state across nodes resulting
from those transactions.

The application state of the blockchain is assembled throughout
operation as the nodes validate blocks of actions, and the resulting
state changes, and then adds those blocks to the chain.


## Blockchain State

At a minimum, the Blockchain State includes the headers of the blocks
back to the [genesis block](#genesis-block). Each block contains a list
of actions, in order, that occurred during that block.

The Blockchain State also includes the immutable memory of every change
since its beginning. This is achieved by having all of the block headers
back to the [genesis block](#genesis-block).

Each time the state changes, a reference is made to the blockheight at
which it last changed along with the current blockheight. This allows
for searching the blockchain history to determine when changes were
made.

In each block, only the data that has changed from the previous block —
the difference, or “diff” — is stored, minimizing storage and increasing
performance.


## Blockheight

A block is assigned a blockheight based on its order in the chain,
counting from the first block (the [genesis block](#genesis-block)).


## Consensus

Consensus in computing is reaching agreement on data across a
distributed, decentralized system. In the blockchain space, consensus is
how your nodes come to agreement on a particular block so that it can be
added to the blockchain.

There are a few different approaches to achieving consensus in
blockchains. Proof of Work, Proof of Stake, and Proof of Authority are
the most common. Without going into definitions and descriptions of
each, know that there are limitations to each type. Interbit uses an
algorithm to provide Byzantine Fault Tolerant consensus, which is
reliable against both benign and malicious faults on up to (n/3)-1 nodes
where n=the number of nodes.


## Core (Interbit Core)

The library/package that delivers blockchain virtual machine
functionality.


## Covenant

A Covenant is a combination of Initial State and a Smart Contract (Redux
Reducer), as well as the reducer's corresponding Action Creators, and
Sagas. It is a way to encapsulate all facets of a specific area of
business logic. A covenant is essentially an npm package.


## Cryptography

Interbit uses encryption for secure digital signatures and encryption of
data.


## Dispatch

The act of sending an Action to a Reducer. Dispatching an Action is the
only way to change the state of a chain.


## Ecosystem

The network of applications built on Interbit, AND the community of
developers and companies.


## Genesis Block

The first block on a blockchain, typically providing configuration
information and initial state.


## Guest Chain

A customer-facing application chain. It is hosted on the Host Chain,
similar to how a guest operating system is run on a virtual machine
host. A guest chain runs on a host chain.


## Hashing

Hashing is the transformation of data into a fingerprint value that
represents the original data.

Every Block in turn has its data (Actions, State difference hash, and
the previous Block's hash) hashed and used to contribute to the
immutable and retraceable Blockchain.


## Host Chain

An internal chain used to power Interbit. It hosts a guest chain
similarly to how virtual machines run on a host operating system.


## Hypervisor

The small piece of code that boots the Host Chain. This does all the
prep work to start up the Host Chain which then continues to do the
heavy lifting of application processing, blocking, signing, networking,
hashing, etc. This models how virtual machine hosts work. First, they
boot the hypervisor, then a host OS boots, then the guests boot.


## Node

An instance of a Host Chain running on a server, virtual machine, docker
container, or similar.

Note: Do not equate a node with a server. Watch for confusion with Node.js.


## Platform (Interbit Platform)

The set of applications that comprise a place for developers to go to
build applications as well as apps/services that makes building apps
easier. (e.g. account app, payment processor app, marketplace app,
etc.).


## Reducer

Reducers determine how the application's state changes in response to
actions.

See [Smart Contract](#smart-contract)

Also see:

- [Redux Basics - Reducers](http://redux.js.org/docs/basics/Reducers.html)
- [Redux Glossary - Reducer](http://redux.js.org/docs/Glossary.html#reducer)
- [Redux FAQ - Reducers](http://redux.js.org/docs/faq/Reducers.html)


## Saga

Side effects (i.e. asynchronous things like data fetching and impure
things like accessing the browser cache) in React/Redux applications. A
saga is like a separate thread in your application that is solely
responsible for side effects.


## Security model

All stored data is encrypted with Secure Hash Algorithm (SHA-256).

Digital signing is used.


## Smart Contract

Smart Contracts are code that will facilitate, verify, or enforce the
negotiation or performance of a contract.

In the context of a generalized blockchain smart contract, it is most
easily understood as the relevant business logic for a particular event
(action) in the application.

Interbit's Smart Contracts are implemented as Redux Reducers.

See Key Concept entry for [Smart
Contracts](key-concepts/smart_contracts.adoc).


## Smart Contracts

See [Smart Contract](#smart-contract).


## Storage

Storage


## Strobe

Strobes occur frequency and provide a juncture for Smart Contracts to be
executed. This is especially important for applications that are not
driven by user interaction, but by interaction with external
applications.

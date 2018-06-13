# Chain Architecture

Interbit’s many chain approach changes the way that applications are
architected. There are a number of key consideration elements that must
be kept in mind while we architect solutions.

This document first outlines those considerations, then discusses the
components of chain architecture and some patterns they can be applied
in.


## Prerequisites

Chain joining: If you do not understand chain joining please read...


## Key Considerations

The Key considerations in chain architecture are:

* Privacy
* Security
* Modularity
* Scalability


### Privacy

When data is distributed on a single blockchain, confidentiality is
sacrificed to those who have permissions for that chain. Most
blockchains achieve privacy though obfuscation or anonymization, this is
not true confidentiality. By segregating that data to distinct
blockchains, Interbit enforces data confidentiality at the architectural
level.

Once the data is segregated into chains, chains can connect with each
other and only share what is necessary. A connection does not need to
include the entire state of a chain. This can be thought of as a
microservice architecture where each chain is a microservice keeping
some private data and exposing other data to select connected chains.


### Scalability

In traditional blockchains all transactions are ordered by a single
ordering process, called consensus. Only once transactions are batched
into ordered blocks, can processing occur. This ordering is required to
maintain a unified state across the network.

When responsibility for achieving a unified state is maintained at a
single point in the network, it becomes a scaling bottleneck. By
dividing up the ordering and processing process to several blockchains,
throughput and scalability increase by an order of magnitude. Privacy
domain analysis will reveal the best scalability design for the network.


### Security

In existing blockchains the data integrity is maintained by the single
ordering process. However, when you split up into several blockchains
this whole system data integrity is also split.

Once data has been segregated to distinct blockchains for throughput and
privacy the responsibility for data integrity needs to be ensured. The
data integrity of the system can be unified with a top-level blockchain
that collects hashes periodically. (ex: This naturally occurs via
Interbit backbone.) This ensures that we will know if any of the system
chains have been tampered with.


### Modularity

It is only possible to have one smart contract per chain. This can be
used to enforce modularity of code. This makes it easier to avoid
repetition and to test individual smart contracts when they are focused
on one thing.


## Basic Architectural Patterns

The basic architectural patterns using interbit are:

* The Atom
* The Hub and Spoke
* The Hub and Connected Spokes
* The Control by Proxy


### The Atom

An architectural atom is a single Interbit blockchain with a single
smart contract running on it. With Interbit different smart contracts
are different atoms. As with atoms, Interbit blockchains can come in a
variety of types (within a solution) based on what smart contract runs
on that blockchain. It is an important part of architecting a solution
to identify how many distinct smart contracts there are. This will
enable you to specify how many different atom types there are and then
the ways in which they go together.

The Atom is the simplest form of chain architecture: A single blockchain
with one smart contract. It has no concern for privacy or throughput,
which is suitable in the simplest cases. (Ex. serving a static web app
like a blog, or a grocery list chain shared by a family who all have
equal access)


### Architectural Molecules

Interbit chain connecting allows us to connect Interbit atoms together.
Most solution designs will include a number of atoms connected together.
We call these solution designs molecules.


#### The Hub and Spoke Molecule

The hub and spoke molecule contains at least two atom types. It is used
to increase throughput or ensure privacy.


#### The Hub and Connected Spokes Molecule

The hub and connected spoke molecule has at least two atom types and is
a more versatile version of the Hub and Spoke molecule. There is a
greater potential for throughput increase, as some processing is
offloaded from the Hub into the connected spokes. Privacy of spokes is
assured, as sensitive information is passed directly to the concerned
spokes.


#### Control by Proxy

The Control by Proxy uses at least three atom types. Again, this is a
more versatile hub and spoke where one of the spokes is of a different
type -- the control atom. Spokes may not see any part of the control atom
and it has additional permissions in the hub that the spokes do not. The
most sensitive data can be placed in the control atom without worry.

This control atom can also be considered an admin atom.


### Sample Molecules

By combining these molecules, you can achieve even more privacy and
throughput gain.


#### The Hierarchical Throughput Molecule

In this model, a single layer of hub and spoke does not supply enough
throughput to the system. Perhaps one branch in a bank is in the dense
city center and processes triple the transactions of the other branches.
This branch can then split into their own hierarchy and aggregate their
data upwards, being their own spoke and hub model.

This allows them to gain another potential order of magnitude more
throughput without affecting the other branches.


#### Spokes as Control Chains

In this architecture each company has a chain that holds the entirety of
their data. They do not wish to share, so no other parties can see that
data. A directory chain (the hub) contains hashes of company chains
participating in consortium which maintains data integrity and trust
system wide. All parties in this architecture participate in directory
chain. Hashes provide shared auditability and accountability throughout
network without sharing any trade data.

The companies do, however, wish to shared trade data with each other.
Therefore, the parties control trading chains run between them that
contain this trade data. The company chains control the trading chains
and send hashes to the directory to maintain data integrity of the
trades by proxy.

The blue chains, trading chains, were completely hidden from anyone
other than the involved parties. The green company chains are controlled
entirely by the companies in question. The red chain has hashes
periodically reported to it so that every party involved accountable for
data integrity of their individual chains.

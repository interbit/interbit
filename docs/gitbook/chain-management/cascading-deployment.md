# Cascading Deployment


<div class="tips info">
  <p><span></span>Coming soon...</p>
  <p>The cascading release managed by a root node with a set of admin keys is not available yet.</p>
</div>

Managing an entire blockchain system that exists on many nodes with different key pairs with chains that join in myriad ways can be a headache to manage. Cascading deployment offers a way to maintain a blockchain network from a single point of change.

## Permission to deploy
Entirely governed by the permissions of the machine you are on to access the root chain.  Deployment is always done by the machines global hypervisor, rather than the temporary hypervisor that runs in dev mode

## Dynamic vs. Static Chains

Static chains are chains that make up the supporting structure of your system. They are chains that do not change often and support other chains. These static chains are defined in the Interbit manifest file and are managed by the root node and interbit-cli. Static chains are created during the deployment of your system.

Dynamic chains are chains that are created during the operation of your system. These chains may be ephemeral chains or last for a long period. These chains are created by smart contracts on chains already running within your system. The chain or process that creates a dynamic chain is responsible for udpating and managing the dynamic chain's lifecycle.

Dynamic chains are NOT specified in the manifest and are NOT supported by cascading deployment.

New covenants for these chains can be deployed to a network through the manifest but they will not by applied to dynamic chains.

## Concepts in Cascading Deployment

There are several important concepts used to implement cascading deployment in an Interbit blockchain network.

### The Interbit Configuration File

The configuration file is a JavaScript (.js) file that contains intstructions on generating a collection of build artifacts.
Contains:
- expressions for resolving variables for:
  - pubkeys /  chainIds (basically permission resolvers)
  - chain Ids
  - covenant hashes
  - peer lists
  - path to folder containing index.html and other static assets to be hosted.  index.html will get altered by the build step to include chainIds
  - array of supporting static files that should be hosted statically

- composition instructions for
  - joins
  - mapping of chains to covenants
  - tree of parent child relationships

Config files are JavaScript so that you can use env files and other JavaScript functions such as importing other config files and composing many.  Consider the case of platform development - a top level config file could run all the covenants across the whole platform as a single interbit hypervisor in dev mode.

Running `interbit build` for a configuration file will generate an Interbit manifest file and a set of corresponding artifacts.

### The Interbit Manifest File

The Manifest file contains statements about how to deploy the build artifacts to a specific environment.  These files can be used to upgrade an existing environment.

The files contain no unresolved aliases or inconsistencies between aliases.  Basically, there are no variables in a manifest - everything is resolved to either a chainId, or a covenantHash, or a public key.

Manifest files are always named after the input config file.

Manifest files are JSON because they contain no computation, and only act as resolution for variables.  They are statements.

In addition to resolving instructions from a configuration file about your configured chains, the manifest file adds deployment instructions for a root node that manages upgrading your blockchain network should you deploy an upgraded manifest in the future.

### The Root Node

The root node contains a copy of the deployed manifest file and a write join to each of your high level chains. The high level chains in turn contain a write join to their children etc. This write join allows your root node to forward updates to the manifest to your chains when the manifest is updated. These updates will be cascaded to child chains until all network updates have been applied.

A configuration file and resulting manifest must describe an acyclic network for cascading deployment to work. The network shape must be a tree and cannot contain cycles.

#### Root Covenant

The root node covenant must be a part of all covenants that wish to enforce cascading deployment. If the root node covenant is not applied to a smart contract the chain will not automatically apply updates and deployments and system upgrades must be managed in another way.

### The Interbit CLI

The interbit CLI can generate and deploy manifest files and watch the chains for updates to the root manifest configuration. Running `interbit build` on a valid configuration will generate a deployable manifest file. Running `interbit deploy` will take a manifest file and deploy a node based on the instructions in the manifest and passed through command line options.

This will spin up a set of watchers that will apply any updates to the chain when a new manifest is deployed.

#### Root Watcher

The root watcher watches the root node for CLI level update commands. If there is a difference in a newly deployed manifest compared to the previous manifest the root watcher will apply some of the changes.

The root watcher
 - deploys and applies covenants
 - creates new chains
 - removes chains that are no longer in the manifest

#### Chain Watchers

One chain watcher is created for each chain that is running on a deployed node. Each chain watcher
 - applies join changes for that chain
 - subscribes to state updates so no extra load is placed on the network

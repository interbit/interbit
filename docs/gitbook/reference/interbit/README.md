# Interbit

Interbit offers the same features as the `interbit-cli` but in small functions requireable for programmatically managing your chains.

The interbit package contains function to help you
 - gather `interbit-cli` specific command line arguments
 - start interbit nodes
 - create chains
 - configure chains
 - manage covenants
 - connect to peers
 - and so much more!

Reference
 - [An Example](../../examples/initialize.md)
 - [The Exports](https://github.com/interbit/interbit/blob/master/packages/interbit/src/index.js)
 - [The Package](https://www.npmjs.com/package/interbit)

#### Options

The main functions available in interbit all accept a uniform `options` object that correspond to the CLI options used in the [`interbit-cli`](../interbit-cli/README.md) package.

Some options are not supported in every script and will be ignored. See the specific script/cli reference for supported options

  - `keyPair` *(Object)*: A keypair object to boot the hypervisor with.
      - `publicKey` *(String)*  The public key
      - `privateKey` *(String)* The private key
  - `location` *(string)*: The working directory for this function/script
  - `manifest` *(Object)*: The contents of the loaded [manifest](../interbit-cli/manifest.md) file
  - `config` *(Object)*: The contents of the loaded [config](../interbit-cli/config.md) file
  - `port` *(number)*: The port for Interbit to communicate on
  - `dbPath` *(string)* The path to the database Interbit is using for this node
  - `connect` *(bool)*: Whether this node is simply connecting to other already running instances, or should do the deployment configuration of joins/covenants etc. itself.
  - `isWatchModeEnabled` *(bool)*: Whether watch mode is enabled. Defaults to true
  - `isDevModeEnabled` *(bool)*: Whether dev mode is enabled. Defaults to false

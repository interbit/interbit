# Chain Sponsorship

## Using Interbit Middleware

The middleware layer in interbit-ui-tools automates the process of
creating private chains. Because this process can be long running, it is
handled in the background by several sagas. When the middleware is
connected to the store it automatically triggers `loadInterbitSaga`
which connects to the default public and private chains. Additional
private chains can be created by dispatching an
`interbit-middleware/PRIVATE_CHAIN` action to the redux store, which
will trigger `privateChainSaga` to create a private chain.


## What `loadInterbitSaga` does behind the scenes

1. Read the chain aliases and chain IDs from `index.html`

2. Read user's key pair from local storage or generate new ones.

3. Read the user's private chain ID from local storage.

4. Start a hypervisor and cli and make them available from
   `window.interbit.middleware`

5. Use `cli.loadChain()` to load the public chain, hook up
   `chain.subscribe()` to the redux store and waits\ for a block to
   ensure valid state is available. The status of the public chain in
   the redux store at `interbit.chainData.[chainAlias]` will be marked
   as `BLOCKING`.

6. If the user's private chain ID is saved in local storage, attempt to
   load the private chain using `cli.loadChain()`and hook up
   `chain.subscribe()` in the same way as the public chain.

   If the chain ID of the local chain is not in local storage, or if
   loading the chain was not successful, the middleware will then
   attempt to create a new private chain. The new private chain is
   created using 'chain sponsorship' so that the new chain is
   automatically hosted on the same node as the sponsoring chain.

7. Read private chain hosting configuration from the public chain

   This information is provided by a read join from the application's
   control chain. The following properties are required for successful
   chain sponsorship:

   ```js
   privateChainHosting: {
     // Alias of chain to create
     accountsPrivate: {
       // Public key of the block master on the server node
       blockMaster: '-----BEGIN PGP PUBLIC KEY BLOCK-----...',
       // Chain ID of the chain that will create the chain and become its parent
       sponsorChainId: '9f585848...',
       // Hash of the covenant that will be applied to the newly created chain
       covenantHash: 'a2c0046b...'
     }
   }
   ```

   If these properties are not available in the public chain, chain
   sponsorship will not work. See `interbit.config` in `app-account` or
   `template` for example configuration. In both cases, the initial
   configuration is set in the control chain when handling the
   `SET_MANIFEST` action which provides the required covenant hashes.
   See the `app-account` and `template` control chain covenants for
   details.

8. Create a genesis block for the new chain and call
   `cli.sendChainToSponsor()` to create the chain.

   The precise sequence of calls and parameters is important.

   ```js
   const genesisConfig = interbit.createDefaultSponsoredChainConfig({
     // The public key of the block master
     blockMaster,
     // The user's public key for adding to the ACL
     myPublicKey: publicKey,
     // The chain ID of the parent chain
     sponsorChainId
   })

   const genesisBlock = interbit.createGenesisBlock({
     config: genesisConfig,
     // Passing the covenant hash in config changes means
     // the covenant will be applied after chain creation
     configChanges: { covenantHash }
   })

   const chainId = genesisBlock.blockHash

   await cli.sendChainToSponsor, {
       parentChainId: sponsorChainId,
       // These keys will be in the ACL of the new chain
       publicKeys: [publicKey, blockMaster],
       genesisBlock
     })

   ```

9. Attempt to load the new private chain using `cli.loadChain()`and hook
   up `chain.subscribe()` in the same way as the public chain.


## More details

For more details see (all paths relative to
`packages/interbit-ui-tools/src/`):

* Top level sagas: `sagas/index.js`
* Middleware saga and reducer actions: `actions.js`
* Reading chain aliases and chain IDs from `index.html`:
  `getConfigFromStaticHtml.js`
* Creating the hypervisor and managing `interbit` globals:
  `interbitGlobals.js`
* Managing interbit connections: `src/sagas/interbit.js`
* Loading and creating chains: `src/sagas/chains.js`
* Hooking up chains to the redux store: `middleware.js`

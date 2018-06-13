# Public/Private/Control Architectural Model

The Interbit **Public/Private/Control (PPC)** architectural model is
intended as a template for building Interbit applications that respect
user privacy.

The PPC model is used within the [Interbit
Accounts](https://accounts.interbit.io) so that each user will have
their own private chain to ensure privacy of their personal data.
However, the PPC model is intended as a general application design
pattern and is built into the Interbit application template to make it
easier for developers to implement applications that ensure user data
privacy.

The PPC model also enables [Chain Authorization
(cAuth)](#chain-authorization-cauth-in-the-ppc-model) where users can
authorize secure data sharing of personal data between their private
accounts chain and private application chains.

## Chain Roles within the PPC Model

The PPC model defines specific roles for Public, Private and Control
chains. The responsibilities of the specific chains in the PPC model
are:

**Public Chain**: Every user can load the public chain. The public chain
is read only and contains the configuration required to create new
private chains when a user launches the application.

**Private Chain**: Each user has their own private chain for privacy,
and only the owner can load and dispatch actions to that chain. The ACL
of the private chain will be restricted, typically containing the public
key(s) of the chain's owner and the chain ID of the control chain that
created it.

**Control Chain**: This is the administrative chain that manages the
creation of private chains and is the source of truth of system data on
the public chain (shared via a read join). Because this chain will
contain information on all of the private chains that it creates (in the
join configuration and block history), it is a potential source of
metadata leakage and should not be made accessible to users without
careful consideration.

> One case where intentional metadata leakage may be desirable is a
> pseudonymous sharing model where chain IDs allow users to see the
> extent of the user pool and who they are interacting with, but without
> sharing personal data.

Chains in applications build using the PPC pattern are not limited to
these three roles. A common requirement is for one or more [shared
chains](#extending-the-ppc-model-to-include-shared-chains).

## How the PPC model enables private user chains

Private chains are created using [Chain
Sponsorship](../reference/interbit-middleware/chainSponsorship.md). If
the user does not have a private chain in the browser's local storage,
[Interbit Middleware](../reference/interbit-middleware/middleware.md)
running on the browser can create a private chain and add the user's
private key to the ACL of the new chain.

Dispatching actions to a shared application chain is enabled by
configuring a write join between the user's private chain and the shared
chain during the chain sponsorship process (it is also possible to use
the sponsorship process to add the user's public key to the chain's
ACL).

The following sequence diagram shows how private chains are created:

![Creating a Private Chain in the PPC
Model](PPC-Private-Chain-Creation.png)


## Dispatching actions to private chains

The PPC model and the *Interbit Middleware* permit applications to
dispatch actions to private and shared chains. Specifically, *Chain
Sponsorship* is used to manage the ACL updates and other configuration
required to allow users to successfully dispatch actions to a
permissioned blockchain while ensuring that private keys never leave the
user's device.

Once configured, *Interbit Middleware* routes actions dispatched from
the application to the appropriate chain using a friendly chain alias to
identify the chain. It also subscribes to chain updates and updates the
application's redux store.

![Dispatching actions to Private chains in the PPC
Model](PPC-Dispatch-To-Private-Chains.png)


## Chain Authorization (cAuth) in the PPC Model

The PPC model and the template are designed to enable Chain
Authorization (cAuth). Chain Authorization gives the user fine grained
control over how and where their private data is shared and used with
other Interbit applications.

Chain authorization requires the user to explicitly opt-in to the
creation of a read join between their private accounts chain and a chain
in another application, typically a private chain created for the user
by the application. Setting up the join is a multi-step process,
requiring the generation of an unguessable join name and configuration
of the join provider in the Interbit Accounts application, then the
configuration of the join consumer in the application requesting Chain
Authorization.

The PPC template implements a cAuth loop with Interbit Accounts.

![Chain Authorization in the PPC Model](PPC-Chain-Auth.png)


## Extending the PPC model to include Shared Chains

Many applications will require a chain or chains that all *authorized*
users can update by dispatching actions. Such shared chains are
analogous to traditional shared public blockchains.

The additional chain responsibilities added to the PPC model are:

**Shared Chains**: The data in these chains are either shared by all
users of the application, or specific user groups. All authorized users
can load and dispatch actions to the chain.


### Dispatching actions to shared chains

Extending the PPC model to permit users to dispatch actions to a shared
chain requires additional setup during the chain sponsorship process
when private user chains are created. There are two ways that user
actions can be dispatched to a shared chain:

1. **Direct**: Authorized users dispatch actions directly to the shared
   chain. During chain sponsorship, the control chain dispatches an
   action to the shared chain to add the user's public key to the shared
   chain's ACL.

2. **Indirect (write join)**: Users dispatch actions to their private
   chain, triggering a remote redispatch to the shared chain. During
   chain sponsorship, the control chain dispatches actions to the
   private and shared chains to configure a write join between them.

The following sequence diagram shows how actions are dispatched to the
shared chain using the Indirect (write join) method:

![Dispatching actions to Shared chains in the PPC
Model](PPC-Dispatch-To-Shared-Chains.png)

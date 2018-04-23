# Interbit Under the Hood (ITH) sample application

## Chains

1. Control chain
1. Private chain

(Naming needs to be sorted out - Control/Private implies things that are not necessarily what we want to show)

## General Interbit functionality

Should show:
1. Basic action dispatch.
1. Chain state, what is managed by the chain and what can be altered by the covenant.
1. Side-effects/sagas.

## Read joins

Need to show:
1. Two parties are required to set up the join - Provider `@@CHAIN_SHARE_STATE` and consumer `@@CHAIN_READ_STATE` actions.
1. Data is not shared if the provider does not permit it.
1. Only the specified data is shared.
1. A 3rd party joined to another state slice cannot see the shared data.
1. Sharing can be stopped by the provider.
1. Sharing does not erase the block history.

## Write joins

Need to show:
1. Only receiver is needed to set up the join - Receiver `@@CHAIN_AUTHORIZE_ACTIONS` authorizing specific actions from sender chainId.
1. Sender can dispatch authorized actions successfully.
1. Sender cannot dispatch unauthorized actions.
1. Unknown sender chain cannot dispatch actions.
1. Receiver can revoke permission to dispatch actions.


[Interbit Chain Joining doc](https://github.com/BlockchainTechLtd/interbit/blob/master/docs/spec/modules/chain-joining/Chain-Joining.md)


## UI

To avoid spending a lot of time making the UI pretty, we should leverage the ConnectedCovenant to auto-generate a usable UI that we don't have to invest a lot of effort maintaining as the sample evolves.

### ConnectedCovenant TODO:

1. Works with all connected chains, displaying actions for currently selected chain.
1. Styled reasonably.
1. Selected chain etc. driven by a connectedComponentReducer that matches action creators to selected chain.
1. Shows same chain view as BlockExplorer.

### BlockExplorer TODO:

1. Displays the selected chain.
1. Styled reasonably.

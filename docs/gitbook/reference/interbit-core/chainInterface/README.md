## Chain Interface

The chain interface is the same for all chains that run in interbit, whether they are your own chain, the hypervisor, or the cli.

This chain interface contains 3 simple functions:
 - [getState](./getState.md)
 - [dispatch](./dispatch.md)
 - [subscribe](./subscribe.md)

 There are a few ways to get a chain interface. 
 
 The cli and hypervisor already have one. 
 
 To get a chain interface for your own chain, call `[cli.getChain]`(../cli/getChain.md)
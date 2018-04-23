# `deploy`

Deploys an application

Note that hosting the static index.html is a separate concern handled elsewhere

Will tell the local hypervisor to host the master chain. This implies that the hypervisors can be configured to obey all requests of the master chain.

Process for deploying to your own infrastructure:

Boot a cluster of hypervisors
Collect all pubkeys of your hypervisors
Add pubkeys to interbit.prod.config.js
run build to generate build artifacts in dist/
get the artifacts to one of your hypervisors (possibly current hypervisor is fine)
go to that hypervisor (ssh perhaps)
run interbit deploy {interbit.prod.manifest.json}
this will start hosting on ONE hypervisor
go to each other hypervisor and tell it to host the master chain id + children
OR do deploy on each of them, which amounts to the same thing
DONE
Subsequent upgrades only require running deploy on one of your hypervisors

If you have our delegator chain available, and joined to all your hypervisors, you can use this as a way to tell all your hypervisors to begin hosting the master + children

Process for auto deploying

Boot at least one hypervisor, tell it to host your master chain
Put your AWS keys into the master chain at build time using process.env.SECRETS
Tell hypervisors at boot to join to a the master chainid (handled by saga)
Begin running multiple nodes
Receive a deploy instruction from a user that has passed all checks
Get github url to pull from
Side effect begins to build, and produces artifacts

#### Arguments

1. `manifest` *(Filepath)*: an Interbit manifest file


#### Example

```js
interbit deploy {interbit.prod.manifest.json}
```




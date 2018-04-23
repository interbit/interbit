# `connect(port, host)`

Attempts to connect to a peer at the address host:port

#### Arguments

1. `port` *int*: The port to connect to
1. `host` *string*: The host to connect to


#### Returns

*(Promise)*: A promise that will resolve when the connection succeeds or reject on failure


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const port = 5000
const host = 'localhost'

await cli.connect(port, host)
```


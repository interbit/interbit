# `generateKeyPair()`

Generates a new PGP key pair

#### Returns

*(Object)*: A key pair
  - `publicKey`: *(String)* the public key string of the new keyPair
  - `privateKey`: *(String)* the private key string of the new keyPair


#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const keyPair = await cli.generateKeyPair()
```


# `getKeys()`

Returns the keys that this cli is currently using on its chains.

#### Arguments

None.

#### Returns

*(Object)*: A key pair
  - `publicKey`: *(String)* the public key string of the new keyPair
  - `privateKey`: *(String)* the private key string of the new keyPair

#### Example

```js
const hypervisor = interbit.createHypervisor()
const cli = interbit.createCli(hypervisor)

const keys = await cli.getKeys()
```


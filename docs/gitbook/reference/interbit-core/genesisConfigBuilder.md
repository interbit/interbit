# `genesisConfigBuilder()`

Returns an object containing a set of functions that can be used to build a valid genesis block configuration.

#### Returns

*(Object)*: A builder object for creating a valid genesis block config.

```js
{
  setBlockMaster: ({ blockMaster }) => returns genesisConfigBuilder,
  addRootKey: ({ rootKey }) => returns genesisConfigBuilder,
  build: () => returns the built config
}
```

#### Example

```js
const genesisConfig = interbit.genesisConfigBuilder()
                              .setBlockMaster({ blockMaster: 'publicKey' })
                              .addRootKey({ rootKey: 'publicKey' })
                              .build()
```


# `deploy()`

<div class="tips warning">
  <p><span></span>TODO</p>
  <p>Incomplete content. The [options](https://github.com/interbit/interbit/blob/ff803110c89a97e4bf9237ba633aedef4fe57d50/packages/interbit/src/scripts/deploy.js#L6) need to be documented.</p>
</div>

Uses a manifest to deploy a blockchain node.

#### Arguments

1. `options` *(Object)*: An object containing information about how to deploy the manifest. Defaults will be used if no options are given.


#### Returns

*(Object)*: A [cli](../interbit-core/cli/README.md) to use to interact with the Interbit node


#### Example

```js
const cli = deploy({
  manifest: './manifestLocation/'
})
```


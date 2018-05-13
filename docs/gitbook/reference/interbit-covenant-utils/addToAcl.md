# `addToAcl()`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content.</p>
</div>

...

#### Arguments

1. `actionPermissions` *(Object)*:
1. `roles` *(Object)*:


#### Returns

None


#### Example

```js
    const addToAclAction = utils.addToAcl({
      actionPermissions: { INC: ['partner'] },
      roles: { partner: [otherPublicKey] }
    })
    await chainInterface.dispatch(addToAclAction)
```

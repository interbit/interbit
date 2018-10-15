Activity Bar example:

```js
<div>
  <ActivityBar
    firstName="John"
    secondName="Doe"
    timestamp={1538117894366}
    dateTimeFormat="lll"
    change={{
      fieldName: "test",
      oldVal: "123",
      newVal: "321"
    }}
    userClickHandler={() => {}}
    breadcrumb={[
      { title: "1234", clickHandler: () => {}},
      { title: "23445", clickHandler: () => {} }
    ]}
  />
  <ActivityBar
    firstName="John"
    secondName="Doe"
    comment="Do anim consectetur incididunt incididunt. Labore ex laborum sint cillum ut cupidatat aliquip culpa. Ut anim sit ea officia. Ea nulla ad sint ex excepteur ipsum irure veniam cupidatat dolor commodo sint aliqua do. Anim veniam et adipisicing adipisicing. Ullamco ea pariatur ipsum sint officia. Ea ex excepteur et reprehenderit minim consequat nulla. Do Lorem eu cillum pariatur."
    timestamp="Sep 22,2018 00:00:00"
    dateTimeFormat="lll"
    userClickHandler={() => {}}
    breadcrumb={[
      { title: "1234", clickHandler: () => {} },
      { title: "23445", clickHandler: () => {} },
      { title: "abcdefghijklmnopqrt", clickHandler: () => {} }
    ]}
  />
</div>
```

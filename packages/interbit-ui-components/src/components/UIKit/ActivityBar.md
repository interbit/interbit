Activity Bar example:

```js
<div>
  <ActivityBar
    firstName="John"
    secondName="Doe"
    timestamp="Tue Sep 25 18:19:57 2018"
    dateTimeFormat = "LLL"
    change={{
      fieldName: "test",
      oldVal: "123",
      newVal: "321"
    }}
    userClickHandler={() => {
      console.log("working");
    }}
    breadcrumb = [{title:'1234'},{title:'23445'}]
  />
  <ActivityBar
    firstName="John"
    secondName="Doe"
    comment="Do anim consectetur incididunt incididunt. Labore ex laborum sint cillum ut cupidatat aliquip culpa. Ut anim sit ea officia. Ea nulla ad sint ex excepteur ipsum irure veniam cupidatat dolor commodo sint aliqua do. Anim veniam et adipisicing adipisicing. Ullamco ea pariatur ipsum sint officia. Ea ex excepteur et reprehenderit minim consequat nulla. Do Lorem eu cillum pariatur."
    timestamp="Sep 22,2018 00:00:00"
    dateTimeFormat = "LLL"
    userClickHandler={() => {
      console.log("working");
    }}
  />
</div>
```

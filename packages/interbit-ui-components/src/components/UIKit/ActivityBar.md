ActivityBar example:
```js
<div>
    <ActivityBar
      breadcrumb={[
        {
          title: '1234567890',
          clickHandler: () => {}
        },
        {
          title: 'Field',
          clickHandler: () => {}
        },
      ]}
      comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros eu ipsum hendrerit, et venenatis arcu laoreet. Etiam at est libero. Cras imperdiet ultrices maximus. Etiam pretium at purus sit amet fringilla. Donec turpis nibh, iaculis sollicitudin urna ac, accumsan semper arcu. Morbi a dignissim diam. Mauris posuere nisl eget odio vestibulum, vitae laoreet sem maximus. Nullam suscipit nulla vel eros tincidunt, nec ullamcorper sem varius. Mauris eget urna sit amet lectus volutpat laoreet id vel erat. Ut accumsan venenatis ante, ac vehicula magna rutrum in. Praesent fringilla nulla id ante dapibus, vitae posuere nulla accumsan. Aliquam facilisis dui quis eros viverra, ac egestas turpis interdum. Nulla quis nisl elementum, venenatis diam ultricies, tincidunt risus. Nullam finibus, risus at mattis consectetur, libero ipsum vehicula tortor, a aliquet tellus ligula et nisi. Praesent quam urna, ullamcorper sed fermentum at, vestibulum nec leo."
      dateTimeFormat="MMM. D, YYYY HH:mm:ss"
      firstName="Firstname"
      lastName="Lastname"
      timestamp={1537852467}
      userClickHandler={()=>{}}
    />
    </div>
```

ActivityBar with user avatar passed:
```js
<div>
    <ActivityBar
      breadcrumb={[
        {
          title: '1234567890',
          clickHandler: () => {}
        },
        {
          title: 'Field',
          clickHandler: () => {}
        },
      ]}
      avatar="https://png.icons8.com/color/50/000000/administrator-male.png"
      comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros eu ipsum hendrerit, et venenatis arcu laoreet. Etiam at est libero. Cras imperdiet ultrices maximus. Etiam pretium at purus sit amet fringilla. Donec turpis nibh, iaculis sollicitudin urna ac, accumsan semper arcu. Morbi a dignissim diam. Mauris posuere nisl eget odio vestibulum, vitae laoreet sem maximus. Nullam suscipit nulla vel eros tincidunt, nec ullamcorper sem varius. Mauris eget urna sit amet lectus volutpat laoreet id vel erat. Ut accumsan venenatis ante, ac vehicula magna rutrum in. Praesent fringilla nulla id ante dapibus, vitae posuere nulla accumsan. Aliquam facilisis dui quis eros viverra, ac egestas turpis interdum. Nulla quis nisl elementum, venenatis diam ultricies, tincidunt risus. Nullam finibus, risus at mattis consectetur, libero ipsum vehicula tortor, a aliquet tellus ligula et nisi. Praesent quam urna, ullamcorper sed fermentum at, vestibulum nec leo."
      dateTimeFormat="MMM. D, YYYY HH:mm:ss"
      firstName="Firstname"
      lastName="Lastname"
      timestamp={1537852467}
      userClickHandler={()=>{}}
    />
    </div>
```

ActivityBar with change data instead of comment:
```js
<div>
    <ActivityBar
      breadcrumb={[
        {
          title: '1234567890',
          clickHandler: () => {}
        },
        {
          title: 'Field',
          clickHandler: () => {}
        },
      ]}
      avatar="https://png.icons8.com/color/50/000000/administrator-male.png"
      change={{fieldName: 'FieldName', oldVal: 'old value', newVal: 'new value'}}
      dateTimeFormat="MMM. D, YYYY HH:mm:ss"
      firstName="Firstname"
      lastName="Lastname"
      timestamp={1537852467}
      userClickHandler={()=>{}}
    />
    </div>
```

How the component behaves when displaying at smaller viewport sizes, with content that overflows the bounds of each text-area:
```js
<div style={{width:'200px'}}>
    <ActivityBar
      breadcrumb={[
        {
          title: '1234567890',
          clickHandler: () => {}
        },
        {
          title: 'Long Field Name, so long as possible',
          clickHandler: () => {}
        },
      ]}
      comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros eu ipsum hendrerit, et venenatis arcu laoreet. Etiam at est libero. Cras imperdiet ultrices maximus. Etiam pretium at purus sit amet fringilla. Donec turpis nibh, iaculis sollicitudin urna ac, accumsan semper arcu. Morbi a dignissim diam. Mauris posuere nisl eget odio vestibulum, vitae laoreet sem maximus. Nullam suscipit nulla vel eros tincidunt, nec ullamcorper sem varius. Mauris eget urna sit amet lectus volutpat laoreet id vel erat. Ut accumsan venenatis ante, ac vehicula magna rutrum in. Praesent fringilla nulla id ante dapibus, vitae posuere nulla accumsan. Aliquam facilisis dui quis eros viverra, ac egestas turpis interdum. Nulla quis nisl elementum, venenatis diam ultricies, tincidunt risus. Nullam finibus, risus at mattis consectetur, libero ipsum vehicula tortor, a aliquet tellus ligula et nisi. Praesent quam urna, ullamcorper sed fermentum at, vestibulum nec leo."
      dateTimeFormat="MMM. D, YYYY HH:mm:ss"
      firstName="Firstname"
      lastName="LongLongLastnameSoLongThanOverflows"
      timestamp={1537852467}
      userClickHandler={()=>{}}
    />
    </div>
```

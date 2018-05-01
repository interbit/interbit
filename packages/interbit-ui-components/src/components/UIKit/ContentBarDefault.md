Default ContentBar:
```js
<ContentBarDefault
  title="Title for content bar" 
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta" 
  callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
  image="chairmanmeow.jpg"
  />
```

ContentBar with large image:
```js
<ContentBarDefault
  title="Title for content bar" 
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta" 
  callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
  image="chairmanmeow.jpg"
  className="image-lg"
/>
```

ContentBar with small image: 
```js
<ContentBarDefault
  title="Title for content bar" 
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta" 
  callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
  image="chairmanmeow.jpg"
  className="image-sm"
/>
```

In progress style ContentBar:
```js
<ContentBarDefault
  title="Title for content bar" 
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta" 
  status={{type: "green", text: "In Development"}}
  image="chairmanmeow.jpg"
  className="image-sm in-progress"
/>
```

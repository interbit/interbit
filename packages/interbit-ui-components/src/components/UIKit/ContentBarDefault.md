Default ContentBar:
```js
<ContentBarDefault
  title="Title for content bar"
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta"
  callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
  image="placeholder-md.png"
  />
```

ContentBar with large image:
```js
<ContentBarDefault
  title="Title for content bar"
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta"
  callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
  image="placeholder-md.png"
  className="image-lg"
/>
```

ContentBar with small image:
```js
<ContentBarDefault
  title="Title for content bar"
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta"
  callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
  image="placeholder-md.png"
  className="image-sm"
/>
```

In progress style ContentBar:
```js
<ContentBarDefault
  title="Title for content bar"
  content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta"
  status={{type: "green", text: "In Development"}}
  image="placeholder-md.png"
  className="image-sm in-progress"
/>
```

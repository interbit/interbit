Examples:
```js
<div>
  <ContentBarDefault
    title="Default ContentBar"
    content="Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin, tail beef hamburger shoulder pig venison meatloaf porchetta"
    callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
    image="placeholder.svg"
    />

  <ContentBarDefault
    title="ContentBar with small image"
    content="Add the class 'image-sm' to the component. Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin."
    callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
    image="placeholder-md.png"
    className="image-sm"
  />

  <ContentBarDefault
    title="ContentBar with large image"
    content="Add the class 'image-lg' to the component. Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin."
    callToAction={{to: "#", type: "button", text: "Link text bacon bacon"}}
    image="placeholder-md.png"
    className="image-lg"
  />

  <ContentBarDefault
    title="ContentBar with dotted border"
    content="Add the class 'in-progress' to the component. Bacon ipsum dolor amet buffalo t-bone ribeye pork chop. Cupim porchetta meatloaf beef ribs shank. Pork loin buffalo flank prosciutto sirloin."
    status={{type: "green", text: "In Development"}}
    image="placeholder-md.png"
    className="in-progress"
  />
</div>
```

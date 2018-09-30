# interbit-ui-components

The demo app src is in the demo/ directory.
The component src is in the src/ directory.



[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe interbit-ui-components here.

## UIKit

### ActivityBar
The `ActivityBar` is a UI component that illustrates a single change made to a structured piece of data by a user.
#### User Interactions
The `ActivityBar` displays the following information:
- The name of the user who made the change.
- An avatar of the user who made the change. If no avatar is provided, a default user icon is displayed.
- The nature of the change, e.g. `Changed (field name) from (old value) to (new value)` or a comment as a block of text.
- A timestamp of the change, displayed in a user-friendly [Moment.js](https://momentjs.com/) format and in the user's local timezone, specified by the parent component.
- A breadcrumb showing where the changed field exists in the larger context of the structured piece of data, e.g. `UUID > DataFieldName`.

The following behaviours are implemented:
- On click, each item in the breadcrumb triggers a function call.
- On click, the avatar and username trigger a function call (the same one).
- One of two types of text block is displayed below the user name:
  - A comment, which is a block of text.
  - A change, which is structured as `Changed <field name> from <old value> to <new value>.`

#### Props for the React component

| Prop Name          | Type                                                         | Required | Default | Description
|:-                  |:-                                                            |:-        |:-       |:-           
| `firstName`        | `string`                                                     | yes      | -       | The first name of the user who made the change.
| `lastName`         | `string`                                                     | yes      | -       | The last name of the user who made the change.
| `avatar`           | `string`                                                     | -        | -       | The source for the user's avatar imsge. If none is provided, use the default as specified in the design file.
| `userClickHandler` | `func`                                                       | yes      | -       | The function that is called when a user clicks on the username or avatar.
| `breadcrumb`       | `arrayOf(shape({title: string, clickHandler: func}))`        | yes      | -       | An array of links showing the hierarchical relationship of the change with respect to the data structure the change belongs to.
| `timestamp`        | `number`                                                     | yes      | -       | A unix timestamp of when the change was made.
| `dateTimeFormat`   | `string`                                                     | yes      | -       | A Moment.js date time format.
| `change`           | `shape({fieldName: string, oldVal: string, newVal: string})` | no       | `{}`    | An object storing the changed field name, its old value, and its new value.
| `comment`          | `string`                                                     | -        | `''`    | A block of text.

#### Example

```js
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
  avatar={pathToAvatar}
  change={{fieldName: 'FieldName', oldVal: 'old value', newVal: 'new value'}}
  dateTimeFormat="MMM. D, YYYY HH:mm:ss"
  firstName="Firstname"
  lastName="Lastname"
  timestamp={1537852467}
  userClickHandler={()=>{}}
/>
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

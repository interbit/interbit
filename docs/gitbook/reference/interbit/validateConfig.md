# `validateConfig()`

Validates a configuration file.

#### Arguments

1. `config` *(Object)*: The contents of the configuration file as a JSON object.


#### Returns

*(bool)*: true if the file was valid

#### Throws

An `Error` with a message describing the configuration invalidity.


#### Example

```js
const { validateConfig } = require('interbit')
const config = require('./interbit.config.js')

try {
  if (validateConfig(config)) {
    // It's valid! :D
  }
} catch (e) {
  // It is not valid :(
  console.warn(e)
}
```


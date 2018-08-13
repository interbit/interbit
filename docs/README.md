# Contents

The Interbit SDK documentation is available online:
https://docs.interbit.io/

This folder contains stubs for the Interbit SDK documentation; it lives
in a separate repo: https://github.com/interbit/docs-interbit

To install and build the documentation locally, execute:

```sh
npm i
npm run build
```


## Serving the documentation locally on Linux or Windows

After a successful `build` (see above), execute:

```sh
node index.js
```

An Express.js server starts running on port 4000. In your web browser,
visit: http://localhost:4000/

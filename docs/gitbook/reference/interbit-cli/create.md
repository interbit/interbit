# `create`

Creates a new Interbit application with a connected React front end application

This application is created in a directory based on the `--name` provided. The new application comes with scripts to interact with the React app and the Interbit application. It is ready to go with node modules already installed.

Simply run the node in one terminal:

```sh
npm run interbit:start
```

And then run the React app in another:

```sh
npm start
```

Coming soon:
- specify one of several templates you want to use


#### Options

1. `--name` *(String)*: the name of the application to create. This will also be the directory the application is created in.

#### Example

```bash
interbit create --name app-the-new-thing
```

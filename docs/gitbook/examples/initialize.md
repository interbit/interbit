# Initializing a Node

There are two ways to intitialize a node: by command line and by code.

If you are using the CLI or code it is recommended that you configure your network using an [Interbit configuration file](../reference/interbit-cli/config.md). This file enables you to configure apps, peers, covenants, and chain joins all in one place.

## Using the CLI

Once you have setup your configuration file to your liking you can use the [`start`](../reference/interbit-cli.start.md) or [`build`](../reference/interbit-cli/build.md) and [`deploy`](../reference/interbit-cli/deploy.md) commands to start your node.

First, install the CLI in your project if you have not already. If you have followed the [Getting Started](../getting-started/README.md) guide and used the template this package and the following scripts are already configured with a corresponding interbit.config.js file.

#### Install the package

```sh
npm i --save interbit-cli
```

This will add `interbit-cli` to your npm project's package.json file.

Once you have added the dependency, you will need to stup the start or build and deploy scripts in your package.json scripts.

#### Using the package

Inside of package.json

```json
{
  "scripts": {
    "start": "interbit start --config interbit.config.js",
    "build": "interbit build --config interbit.config.js --manifest interbit.manifest.json",
    "deploy": "interbit deploy --manifest interbit.manifest.json"\
  }
}
```

## Using Interbit with Code

You can also run a node using the `interbit` package, which the cli uses under the hood to make everything run. The `interbit` package contains more granular functionality and can be more customized.

#### Installing the package

You will need to install `interbit` in your dependencies list. If you have forked and are using the template it is already included as a dependency of `interbit-cli`

```sh
npm i --save interbit
```

#### Using the Package

The package comes with a set of granular functions for starting a node as well as a handy dandy [deploy](../reference/interbit-cli/deploy.md) function that does all of the work of applying covenants, starting and loading chains, and creating an interbit instance and cli to interact with.

```js
const { 
  startInterbit, 
  createChains: { 
    createChainsFromConfig,
    createChainsFromManifest
  } 
} = require('interbit')

const { cli, hypervisor } = startInterbit()

// You can use the cli to create chains, deploy covenants, and configure them from here

// ... or, you can create a set of chains using a config or manifest file

const config = require('interbit.config.js')
const { chainManifest, covenantHashes } = await createChainsFromConfig(cli, config)

const manifest = require('interbit.manifest.json')
await createChainsFromManifest(process.cwd(), cli, manifest)

```

Please check out the [`web-auth-endpoint`](https://github.com/interbit/interbit/blob/master/packages/web-auth-endpoint/src/node.js) package for an example of deploying a node in code. Please note that this package has used and [interbit.config.js](../reference/interbit-cli/config.md) file and built a [manifest](../reference/interbit-cli/manifest.md) file from the config prior to deploying the node in code.


Further Documentation:
 - [start](../reference/interbit-cli/start.md)
 - [build](../reference/interbit-cli/build.md)
 - [deploy](../reference/interbit-cli/deploy.md)
 - [interbit.config.js](../reference/interbit-cli/config.md)
 - [interbit.manifest.json](../reference/interbit-cli/manifest.md)
 - [deploy function](../reference/interbit/deploy.md)
 - [createChains](../reference/interbit/createChains.md)

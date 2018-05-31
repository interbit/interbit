# Getting Started

Review the prerequisites and setup instructions in their entirety. Install any missing prerequisites before installing Interbit.

#### Version Requirements
To develop Interbit applications, your development environment will need the following software:

* <a href="https://nodejs.org" target="_blank">Node.js</a> 8.6 or higher
* <a href="https://nodejs.org" target="_blank">NPM</a> 5.8 or higher

#### Recommended
We also recommend the following npm packages for developing Interbit applications, although they are not required:

* <a href="https://babeljs.io" target="_blank">Babel</a> 6 or higher  (eventually 7)
* <a href="https://lernajs.io/" target="_blank">Lerna</a> 2.5.1 or higher
* <a href="https://mochajs.org/" target="_blank">Mocha</a> 3.3 or higher
* <a href="https://facebook.github.io/jest/" target="_blank">Jest</a> 20.0.4 (specifically)

Familiarity with the following technologies, tools, and concepts will greatly accelerate your ability to develop on Interbit:

* JavaScript
* <a href="https://nodejs.org" target="_blank">Node.js</a> & npm
* <a href="https://redux.js.org" target="_blank">Redux</a>
* Functional Programming
* Blockchain

<div class="hidden-on-print">
	<h3 id="download">Get Interbit</h3>
	<a class="download-btn" href="https://github.com/interbit/interbit" target="_blank">Interbit on Github</a>
</div>

### Setup

### Get the source code
1. Fork the Interbit repository
1. Clone the forked repository on your PC

```sh
git clone git@github.com:interbit/interbit.git
```

### Make a new Interbit site by creating a new package
Let's call the new site `app-the-new-thing`

1. Copy the `packages/interbit-template` folder to `packages/app-the-new-thing`

```sh
cp -R interbit/packages/interbit-template interbit/packages/app-the-new-thing
```

### Make the following changes in `packages/app-the-new-thing`:

1. `package.json` Change the name
   ```
   {
     "name": "app-the-new-thing",
     "version": "0.1.0",
     ...
   }
   ```

1. Tweak `src/App.js` so that you can identify your site

If you are running other apps at the same time, you will need to change the port that your node runs on as well as the port in the configuration.


#### Adjusting the Port (Optional)

> This step is only required if you will run more than one interbit node locally.

The port will need to be adjusted in both the command line script that starts your development node as well as in the apps configuration that tells your browser app which port to connect to.

Inside of `package.json` update the `interbit:start` command. We will use 6000 in this example.
```
    "scripts": {
        "interbit:start": "interbit start --db-path ./db-interbit --port 6000 --dev --no-watch",
    }
```

Inside of the interbit.config.js file, update the apps configuration with the new port. Note that this will only work for local development and a new configuration will be needed to specify peers if you decide to deploy your application. Read more [here](../reference/interbit-cli/config.md)

Update the `interbit/packages/app-the-new-thing/interbit.config.js` file like so:

```js
  // Leave the rest of the config unchanged.
  apps: {
    theNewThing: { // Name our app config something more appropriate.
      peers: ['localhost:6000'], // Change the peer connection
      // ...
      // Leave the rest of the template app config unchanged
    }
  }
```

## Install the dependencies
Run `npm i` from the repository root.  This will take care of all the lerna dependencies and set up for you

```sh
cd interbit
npm i
```

## Build the Modules
1. From the repository root, run

`cwd interbit`
```sh
npm run build:modules
```

## Run it
From within the `packages/app-the-new-thing` folder, run `npm run interbit:start` to start the Interbit blockchain node.  This command will keep running until interrupted.  Let it continue to run.

`cwd interbit`
```sh
cd packages/app-the-new-thing
npm run interbit:start
```

Open a new terminal.  From within the `packages/app-the-new-thing` folder, run `npm run start`.  This runs the development server and will cause a browser window to open to http://localhost:3000 You should see your site load in the browser.

`cwd interbit/packages/app-the-new-thing`
```sh
npm start
```

The development server continues to run.  Changes made to the Interbit website will be automatically reflected in the browser.

## Problems?

If you have run into any issues please double check the version requirements at the top of this page.

Then, clean up any extra `package-lock.json` files and `node_modules` folder and rerun `npm i` from the root.

```sh
cd interbit
node_modules/.bin/lerna clean # removes all node_modules folders in the entire monorepo
rm -f package-lock.json
npm i
```

If this does not help, please contact us for assistance on our [Slack Channel](https://interbitdev.slack.com)

## Continue...

[Walkthrough the Template App](../examples/template.md)

# Getting Started

This section demonstrates how to install the Interbit SDK, install its
dependencies, build the SDK's modules, and create and run a demonstration
application. Once complete, you have everything you need to start developing
with Interbit!

Review the prerequisites and setup instructions in their entirety. Install any missing prerequisites before installing Interbit.

## Version requirements

To develop Interbit applications, your development environment needs the
following software:

* <a href="https://nodejs.org" target="_blank">Node.js</a> 8.6 or higher
* <a href="https://nodejs.org" target="_blank">NPM</a> 5.8 or higher

We also recommend the following, optional npm packages for developing Interbit
applications:

* <a href="https://babeljs.io" target="_blank">Babel</a> 6 or higher  (eventually 7)
* <a href="https://lernajs.io/" target="_blank">Lerna</a> 2.5.1 or higher
* <a href="https://mochajs.org/" target="_blank">Mocha</a> 3.3 or higher
* <a href="https://facebook.github.io/jest/" target="_blank">Jest</a> 20.0.4 (specifically)

## Useful skills
Familiarity with the following technologies, tools, and concepts greatly
accelerates your ability to develop on Interbit:

* JavaScript, especially ECMAScript 6 (ES6)
* <a href="https://nodejs.org" target="_blank">Node.js</a> & npm
* <a href="https://redux.js.org" target="_blank">Redux</a>
* Functional Programming
* Blockchain

<div class="hidden-on-print">
	<h3 id="download">Get Interbit</h3>
	<a class="download-btn" href="https://github.com/interbit/interbit" target="_blank">Interbit on Github</a>
</div>


## Installation

These steps install the Interbit SDK, all of its dependencies, and builds the
modules that your applications require.

1.  **Clone the Interbit repository:**

    ```sh
    git clone git@github.com:interbit/interbit.git
    ```

1.  <a name="dependencies"></a>**Install the dependencies:**

    ```sh
    cd interbit
    npm i
    ```

1.  <a name="modules"></a>**Build the modules:**

    ```sh
    npm run build:modules
    ```

## Create a new Interbit application

These steps create a copy of the included _template_ application that you can
use as a starting point for working with the Interbit SDK.

1.  **Copy the `packages/interbit-template` folder to `packages/app-first`:**

    ```sh
    cp -R packages/interbit-template packages/app-first`
    ```

1.  **Customize the app configuration:**

    In `packages/app-first/package.json`, change the name of your app and the
    version string:

    ```json
    {
      "name": "app-the-new-thing",
      "version": "0.1.0",
      ...
    }
    ```

1.  **Optional: Specify the app's port:**

    To avoid port conflicts when running multiple nodes, the port specification
    for an Interbit application must be specified in two locations.

    1.  Edit `packages/app-first/package.json` and revise the line containing
        `interbit:start` to change `--port 5000` to `--port 6000`, and save the
        file.

        For example:

        ```json
            "scripts": {
                "interbit:start": "interbit start --db-path ./db-interbit --port 6000 --dev --no-watch",
            }
        ```

    1.  Edit `packages/app-first/interbit.config.js` and revise the
        configuration with the new port.

        Locate the following section of configuration:

        ```js
          apps: {
            template: {
              peers: ['localhost:5000'],
              ...
            }
          }
        ```

        Change the `5000` to `6000` and save the file.

    > In these examples, we change the port to `6000` but any value between
    > `1024` and `65000`, that is not already in use by another process, should
    > work.

1.  **Optional: Add an identifer to the app's UI:**

    > This step is only helpful if you run multiple Interbit nodes locally.

    Add some identifying markup to `packages/app-first/src/App.js`. For example,
    immediately before the `<Grid>` tag, insert `<p>My first
    app!</p>`.


## Run the new application

Now all we need to do is run the new application:

1.  **Start the Interbit blockchain node:**

    ```sh
    npm run interbit:start
    ```

    > This command continues to run until interrupted. Your application will not
    > run unless this command is running.

1.  **Start your application in a new terminal:**

    ```sh
    cd interbit/packages/app-first
    npm run start
    ```

    A new browser window opens to `http://localhost:3000/` and displays your
    application. Any updates made to the application while it is running
    automatically refreshes the browser view.

Congratulations! Your first Interbit application is now running.

For more details, see the [Template App Walkthrough](/examples/template.md)

## Problems?

* Double check the version requirements at the top of this page.

* The following steps should get your application into a clean state:

  1.  Stop the application processes (type `Ctrl-C` into each terminal).
  1.  Remove all `node_modules` folders:

      ```sh
      cwd interbit
      node_modules/.bin/lerna clean
      ```

  1.  Remove the top-level `package-lock.json` file:

      ```sh
      rm -f package-lock.json
      ```

  1.  Repeat the [dependency installation](#dependencies) and [module
      build](#modules) steps.

  1.  [Run your app](#run-the-new-application) again.

If these suggestions do not help, contact us for assistance on our [Slack
Channel](https://interbitdev.slack.com)

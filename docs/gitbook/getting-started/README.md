# Getting Started

Review the prerequisites and setup instructions in their entirety. Install any missing prerequisites before installing Interbit.

### Prerequisites

To develop Interbit applications, your development environment will need the following software:

* <a href="https://nodejs.org" target="_blank">Node.js</a> 8.6 or higher
* <a href="https://nodejs.org" target="_blank">NPM</a> 5.8 or higher

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

### Make a new Interbit site by creating a new package
Let's call the new site `app-the-new-thing`

1. Copy the `packages/template` folder to `packages/app-the-new-thing`

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

## Install the dependencies
Run `npm i` from the repository root.  This will take care of all the lerna dependencies and set up for you

## Build the new Interbit site
1. From the repository root, run `npm run build:modules && npm run build:lib`

## Run it
1. From within the `packages/app-the-new-thing` folder, run `npm run interbit:start`.  This command will keep running until interrupted.  Let it continue to run.
1. Open a second shell.  From within the `packages/app-the-new-thing` folder, run `npm run start`.  This runs the development server and will cause a browser window to open to http://localhost:3000 You should see your site load in the browser.

The development server continues to run.  Changes made to the Interbit website will be automatically reflected in the browser.


[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Heroku CI Status](https://ci-badges.herokuapp.com/pipelines/53a1a1f6-ffc6-4d44-a282-cecadaf4591f/master.svg)](https://dashboard.heroku.com/pipelines/53a1a1f6-ffc6-4d44-a282-cecadaf4591f/tests)

# Interbit Platform Repository

Interbit is a blockchain platform for building enterprise-grade applications. Interbit’s proprietary blockchain technology makes application development better and faster. All of the trust and reliability of blockchain technology with much less work and maintenance.

The Interbit Platform is a set of services and tools built on and for Interbit.

Disclaimer

The Interbit Platform is currently a test environment provided for information, education, and evaluation purposes. There is no guarantee of data preservation, uptime, stability, or security - the environment is provided "as is" with no express or implied warranty.

We will be updating this environment regularly - adding functionality, applications, and addressing issues. Our Slack community is open for reporting issues, feedback, and announcements of updates to the platform.

## To get started, make a new Interbit site

### Get the source code
1. Fork the Interbit repository
1. Clone the forked repository on your PC

### Make a new Interbit site by creating a new package
Let's call the new site `app-the-new-thing`

1. Copy the `packages/template` folder to `packages/app-the-new-thing`

### Make the following changes in `packages/app-the-new-thing`:

1. `.package.json` Change the name
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
1. From within the `packages/app-the-new-thing` folder, run `npm run interbit:start`.  This command will keep running until interrupted.  Let it continue to run.
1. Open a second shell.  From within the `packages/app-the-new-thing` folder, run `npm run start`.  This runs the development server and will cause a browser window to open to http://localhost:3000 You should see your site load in the browser.

The development server continues to run.  Changes made to the Interbit website will be automatically reflected in the browser.


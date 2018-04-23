[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Heroku CI Status](https://ci-badges.herokuapp.com/pipelines/53a1a1f6-ffc6-4d44-a282-cecadaf4591f/master.svg)](https://dashboard.heroku.com/pipelines/53a1a1f6-ffc6-4d44-a282-cecadaf4591f/tests)

# Interbit Platform Repository

Interbit is a blockchain platform for building enterprise-grade applications. Interbit’s proprietary blockchain technology makes application development better and faster. All of the trust and reliability of blockchain technology with much less work and maintenance.

The Interbit Platform is a set of services and tools built on and for Interbit. 

Disclaimer

The Interbit Platform is currently a test environment provided for information, education, and evaluation purposes. There is no guarantee of data preservation, uptime, stability, or security - the environment is provided "as is" with no express or implied warranty.

We will be updating this environment regularly - adding functionality, applications, and addressing issues. Our Slack community is open for reporting issues, feedback, and announcements of updates to the platform.

### To get started:

```
npm i
```

This will take care of all the lerna dependencies and set up for you

## To make a new site

1. Copy the `packages/template` folder to `packages/app-the-new-thing`

## Make the following changes in `packages/app-the-new-thing`:

2. `.env` Change the APP_NAME
```
APP_NAME=app-the-new-thing
```

3. `.package.json` Change the name
```
{
  "name": "app-the-new-thing",
  "version": "0.1.0",
  ...
}
```

4. Tweak `src/App.js` so that you can identify your site


## Then to develop locally:

```
$ cd packages/app-the-new-thing
$ npm start
```

If you would like to run the sites involved in MVP development (app-account, app-project, template & redux-proxy-server)

```
$ npm run start:dev # from the root
```

If you have changed lib-react-interbit and would like to include your changes in your app...

```
$ cd packages/lib-react-interbit
$ npm run build
$ cd ../app-to-work-on
$ npm start
```

If you want to work on the common components in lib-react-interbit there is a demo app that can be launched with `npm start`. The source for the demo app is in `packages/lib-react-interbit/demo/src`

This system currently deploys to a heroku pipeline.

CI tests all commits before auto deploying to the `development` stage of the pipeline.

Deployment events can be viewed and controlled from slack in the #machines channel: https://devcenter.heroku.com/articles/chatops


## To change the Template.

There is a node script inside of utils/src/distributeTemplate.js that will distribute some of the changes made to the template files to all packages that match the pattern `/app-*/`

It will clobber the following files in each app with the template versions:
 - anything in src that is a js or svg file
 - anything in the public dir
 - redux/chainReducer.js
 - services/blockchain.js

 Except for:
  - src/App.js
  - src/exports.js
  - public/manifest.json

To anything matching `/app-*/` and the template itself it will:
  - force standardized proxying
  - force standardized scripts
  - ensure the following dependencies are met

```json
{
  "interbit": "1.0.0",
  "interbit-covenant-utils": "1.0.0",
  "interbit": "1.0.0",
  "lib-react-interbit": "1.0.0",
  "react": "^16.2.0",
  "react-bootstrap": "0.31.5",
  "react-redux": "5.0.6",
  "react-scripts": "1.0.17",
  "redux": "3.7.2",
  "seamless-immutable": "^7.1.2"
}
```


*If you need to make any changes to these standardized files think very carefully about doing so before propagating them out to all the app packages.*

### To Distribute Template Changes

Commit your intended changes and work with a clean git status... this will make resetting your changes much easier if you break something.

```
$ cd packages/utils
$ npm run distribute:template
$ npm t                             # test your changes
$ npm run start:dev                 # Poke around and make sure you didn't break anything
$ git add .
$ git commit -m"Distribute changes to..."
```


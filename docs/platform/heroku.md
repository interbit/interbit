Heroku environment and process
------------------------------

This document provides details about the Heroku test environment infrastructure for the Interbit Platform for understanding and use by our internal development team.


Pipelines
-------------
* btl-website  - btl.co (website)
* interbit-website - interbit.io (website)
* interbit - test-interbit.io (platform)

Process
-------------
1. Devs work on github.com/interbit/interbit
2. Heroku auto-deploys to every app in the 'dev' stage in the interbit pipeline, and to the 'staging' app in the interbit-website pipeline
3. Devs can verify functionality on the 'dev' apps
4. Devs manually promote to 'stg' stage in the interbit pipeline so that others (internal non-devs) can verify and provide feedback
5. Devs manually promote to 'prod' stage in the interbit pipeline
6. If applicable (i.e interbit.io) promote to 'prod' app in the interbit-website pipeline

Note: The main (interbit.io) website can be promoted and viewed in the interbit pipeline as well (ib-prod-interbit-io) - it just isn't the actual live instance.

Environment variables
-----------------------
There is now only one environment variable on the Heroku apps - APP_NAME. APP_NAME is the name of the package that you wish deployed for that Heroku App.

interbit pipeline apps
------------

|app                | app_name          | description
|------------------ |------------------ |-------------------------------
|ib-dev----master   | platform-deploy   | Platform boot chain
|ib-dev-account     | app-account       | Account App
|ib-dev-app-store   | app-store         | Store App
|ib-dev-docs        | interbit-docs     | SDK Docs
|ib-dev-interbit-io | app-interbit-io   | Interbit.io website
|ib-dev-template    | template          | SDK Template (as example)
|ib-dev-web-auth    | web-auth-endpoint | Github webhook (auth callback)



Promotion
------------

What you need to promote will depend on the app and change.
- Changes to the static content on a site will only need that site/app updated
- Changes due to chain/app changes may need related apps changed and promoted as well.


BTL website
------------
The btl-website pipeline does NOT hold the live btl.co website - it is only for verification of changes.
To push verified changes to the live site the changes must be merged from the 'master' branch to the 'gh-pages' branch.

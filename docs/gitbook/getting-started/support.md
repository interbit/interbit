# Support

This section describes a few trouble-shooting suggestions that may help you
should problems occur. If not, contact us for assistance on our [Slack
Channel](https://interbitdev.slack.com).

* Double check the version requirements at the top of this page.

* The following steps should get your application into a clean state:

  > The shell commands need to be executed from the _repository root_
  > folder.

  1.  Stop the application processes (type `Ctrl-C` into each terminal).
  1.  Remove all `node_modules` folders:

      ```sh
      node_modules/.bin/lerna clean
      ```

  1.  Remove the top-level `package-lock.json` file:

      ```sh
      rm -f package-lock.json
      ```

  1.  Repeat the [dependency installation](install.md#dependencies) and [module
      build](install.md#modules) steps.

  1.  [Run your app](run.md) again.

# Create your first Interbit application

These steps create a copy of the included _template_ application that you can
use as a starting point for working with the Interbit SDK.

> To complete this section, make sure that you already have the
> [requirements](requirements.md) and the [Interbit SDK](install.md)
> installed.

1.  **Copy the `packages/interbit-template` folder to `packages/app-first`:**

    ```sh
    cp -R packages/interbit-template packages/app-first
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

1.  **Optional: Add an identifier to the app's UI:**

    > This step is only helpful if you run multiple Interbit nodes locally.

    Add some identifying markup to `packages/app-first/src/App.js`. For example,
    immediately before the `<Grid>` tag, insert `<p>My first
    app!</p>`.

That's it! You have created your first Interbit application. Next, see how to
[run your application](run.md).

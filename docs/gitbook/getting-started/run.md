# Run your new application

> To complete this section, make sure that you have already [created a
> new Interbit application](create.md).

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

For more details, see the [Template App Walk-through](/examples/template.md)

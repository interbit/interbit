# Install the Interbit SDK

These steps install the Interbit SDK, all of its dependencies, and
builds the modules that your applications require. Make sure that your
system already has the [requirements](requirements.md) installed.

The [Interbit SDK](https://github.com/interbit/interbit) is open source
software, which is available on [GitHub](https://github.com/):

<div class="hidden-on-print">
  <p>
    <a class="download-btn" href="https://github.com/interbit/interbit" target="_blank">Interbit on Github</a>
  </p>
</div>

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

That's it! You now have the Interbit SDK installed, and all of the
application modules are ready to use. Next, see how to [create your
first Interbit application](create.md).

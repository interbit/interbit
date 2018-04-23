# Contents

1. examples - source code for SDK examples
1. gitbook - SDK documentation, using the Gitbook framework
1. gitbook-plugin-theme-interbit - custom theme for Gitbook

The SDK documentation will be available online soon at https://docs.test-interbit.io.



# Installing Gitbook

Before doing anything with gitbook, install it globally

1. `sudo npm install -g gitbook-cli`
1. `alias gitbook='/usr/local/gitbook'` (On Windows)

# Creating package on Linux (works partially on Windows)

1. Run the `package.sh` script  (using Git Bash if on Windows)

Note: There will be an error 404 for git@github.com:BlockchainTechLtd/gitbook-plugin-theme-interbit.git, the gitbook-plugin-theme-interbit plugin, because we are using that library locally. Ignore this error.

# Serving Gitbook locally on Linux or Windows

1. Run the `package.sh` script  (using Git Bash if on Windows)
1. `cd docs/sdk/gitbook`
1. `gitbook serve`
1. Open http://localhost:4000



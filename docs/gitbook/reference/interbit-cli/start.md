
# `start`

Start the Developer mode hypervisor. It will:

- start an Interbit hypervisor in dev mode
- create the chains specified in the config file, attempting to use the
  resolved chain IDs in the manifest if available
- watch the files in your covenants and deploy updates
- update your `index.html` file with the temporary developer mode chain
  ID
- start the node from the port specified in options, or `5000` if none
  was specified.

Coming soon:

- a `--manifest` option that uses a dev manifest to avoid changing
  development chain IDs often and allows developers to work in test on a
  local network environment

- an `--artifacts` option that will be used as the default folder to
  find deployment artifacts


## Options

1. `--config` *(filepath)*: an Interbit configuration file to use for
   deployment. Default `[cwd]/interbit.config.js`

1. `--manifest` *(filepath)*: *Coming soon* the manifest file to use for
   variable resolution. If the manifest file contains genesis blocks
   they will be used to resolve the chain IDs of the started node.
   Default `[--artifacts]/interbit.manifest.json`

1. `--artifacts` *(dirpath)*: the directory to search for a manifest in.
   Default `/dist`

1. `--port` *(number)*: the port number Interbit will communicate on.
   Default `5000`

1. `--dev` *(empty)*: a switch to indicate running in development
   mode. Development mode does not output an updated manifest and it
   watches covenants for updates, deploying the new covenants to the
   configured static chains on change. *This does not update covenants
   applied to dynamic chains.*

1. `--no-watch` *(empty)*: used only with `--dev` this option stops the
   automatic covenant updates.


## Example

```js
interbit start --config interbit.config.js --port 8888 --manifest
src/interbit.manifest.json  --dev --no-watch
```

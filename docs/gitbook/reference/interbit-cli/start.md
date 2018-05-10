
# `start`

Start the Developer mode hypervisor. It will:

- start an interbit hypervisor in dev mode
- watch the files in your covenants and deploy updates
- update your index.html file with the temporary developer mode chain ID

Coming soon:
- a `--manifest` option that uses a dev manifest to avoid changing development chain IDs often and allows developers to work in test on a local network environment

#### Options

1. `--config` *(Filepath)*: an Interbit configuration file to use for deployment. If none is given it will look in `cwd/interbit.config.js`
1. `--port` *(number)*: the port number interbit will communicate on

#### Example

```js
interbit start --config [interbitConfigFile]
```

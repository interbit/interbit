
# `build`

<div class="tips danger">
  <p><span></span>TODO</p>
  <p>Incomplete content</p>
</div>

Builds an application

Use the production config in `interbit.config.prod.js` if it exists
Outputs to the `dist` folder
static build of the react app from webpack
contents of the `public` folder
edited html file for static hosting
bundled covenants named by hash
`interbit.manifest.json`
freshly minted genesis blocks OR genesis blocks from prod config for consistency

#### Arguments

1. `config` *(Filepath)*: a config file filepath


#### Example

```js
interbit build --config [configFilePath]
```

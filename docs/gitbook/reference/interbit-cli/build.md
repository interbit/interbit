
# `build`

Builds an Interbit application from a [configuration](config.md) file.

This script
- generates a [manifest](manifest.md) file based on the provided [configuration](config.md)
- packs all covenants described in the configuration and outputs them to dist/covenants
- updates the index.html files described in [configuration](config.md) with the chain IDs that were resolved in the [manifest](manifest.md)

Coming soon:
- build your front end applications by executing the build steps provided
- update only the index.html file from the completed application build
- support an interbit root node and [cascading deployment](../../chain-management/cascading-deployment.md)

#### Options

1. `--config` *(Filepath)*: a filepath to a config file
1. `--artifacts` *(Filepath)*: a filepath to output built artifacts to
1. `--manifest` *(Filepath)*: a filepath to a pre-existing manifest used for initial variable resolution

#### Example

```bash
interbit build --config [configFilePath] --manifest [manifestFilePath] --artifacts [outputDir]
```

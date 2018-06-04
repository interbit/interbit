# `deploy`

Deploys an application

Note that hosting the static index.html is a separate concern handled elsewhere. Deploy does not deploy your front end application. It only deploys your blockchain nodes.

Deploy will tell the local hypervisor to host the chains described in the provided manifest file.

#### Options

1. `--manifest` *(Filepath)*: an Interbit manifest file used for deployment instructions. If none is provided it will be read from `{--artifacts}/interbit.manifest.json`
1. `--artifacts` *(Filepath)*: a directory of build artifacts to deploy. Should contain a manifest file and packed covenants. If none is given the current working directory is used.
1. `--port` *(number)*: The port number interbit will communicate on
1. `--key-pair` *(filepath)*: a js or json file exporting a key pair to be used to boot the hypervisor with. If none is given a random pair will be generated which may not be permissioned on the chain network.


#### Usage

```bash
interbit deploy --manifest [interbitManifestFile] --artifacts [buildArtifactsLocation] --port 8888 --key-pair [pathToKeys]
```




# Interbit

Interbit provides scripts that work with an app that is either created with create-interbit-app (coming soon...) or installed to a project with npm. It aids in developing and deploying interbit applications.

It is composed of two packages, `interbit` and `interbit-cli` which wraps the interbit package to provide a command line interface (CLI) to work with Interbit.

## Interbit CLI

The CLI provides some basic functionality for managing the chain application lifecycle from development mode to production. It allows you to configure your network, build a manifest describing an Interbit blockchain network, and deploy your network from a single configuration file and interface.

It offers three main commands as well as several helper commands to make things easier.

 - [start](start.md)
 - [build](build.md)
 - [deploy](deploy.md)

There are two important files used to manage the chain application lifecycle

 - [Configuration](config.md)
 - [Manifest](manifest.md)

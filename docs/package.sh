#!/bin/bash

echo 'Building SDK, please wait... '

SDK_DIR=$(pwd)
THEME_DIR=$SDK_DIR/gitbook-plugin-theme-interbit

# Install and build gitbook
cd $SDK_DIR/gitbook
gitbook install
# Install will fail to install our theme plugin, it must be copied into node_modules
# This will be fixed once the plugin is a public package
cp -r $THEME_DIR $SDK_DIR/gitbook/node_modules
gitbook build

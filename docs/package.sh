#!/bin/bash

echo 'Building SDK documentation, please wait... '

SDK_DIR=$(pwd)
THEME_DIR=$SDK_DIR/gitbook-plugin-theme-interbit

# Install Asciidoctor and dependencies
bundle install

# Install and build gitbook
cd $SDK_DIR/gitbook
gitbook install
gitbook build

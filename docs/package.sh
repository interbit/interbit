#!/bin/bash

echo 'Building SDK documentation, please wait... '

git clone https://github.com/interbit/docs-interbit.git gitbook
cd gitbook
./make.sh

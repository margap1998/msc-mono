#!/bin/bash

rm -rf ./dist
rm -rf ./node_modules

mkdir /monolit

cp ./monolit.service /etc/systemd/system/monolit.service

cp -r ./ /monolit

cd /monolit

npm install

npm run build

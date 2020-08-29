#!/bin/bash

set -ex

USERNAME=ncpierson
IMAGE=fashionscape-web

docker build                     \
  --no-cache                     \
  -f builds/oldschool/Dockerfile \
  -t $USERNAME/$IMAGE:latest     \
  .

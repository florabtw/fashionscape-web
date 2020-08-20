#!/bin/bash

set -x

USERNAME=ncpierson
IMAGE=fashionscape-web
VERSION=`cat VERSION`

./scripts/build.sh

docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$VERSION
docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$VERSION-oldschool
docker push $USERNAME/$IMAGE:latest
docker push $USERNAME/$IMAGE:$VERSION
docker push $USERNAME/$IMAGE:$VERSION-oldschool

docker tag $USERNAME/$IMAGE:latest-runescape $USERNAME/$IMAGE:$VERSION-runescape
docker push $USERNAME/$IMAGE:latest-runescape
docker push $USERNAME/$IMAGE:$VERSION-runescape

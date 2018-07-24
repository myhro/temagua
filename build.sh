#!/bin/bash

set -eu

ASSET_LIST="
css/materialize.min.css
js/main.js
js/materialize.min.js
js/ui.js
"

mkdir -p dist/css dist/data dist/js

cp data/table.txt dist/data/
cp index.html dist/
touch dist/favicon.ico

for a in $ASSET_LIST; do
    ASSET_HASH=$(sha1sum "$a" | cut -c 1-7)
    ASSET_PREFIX=$(echo "$a" | cut -d '.' -f 1)
    ASSET_EXT=$(echo "$a" | cut -d '/' -f 1)
    ASSET_NAME="${ASSET_PREFIX}.${ASSET_HASH}.${ASSET_EXT}"
    cp "$a" "dist/$ASSET_NAME"
    sed -i "s|${a}|${ASSET_NAME}|" dist/index.html
done

#!/bin/bash

#
# Cleans up icon set from https://docs.microsoft.com/en-us/azure/architecture/icons/
#

# flatten folder structure
find . -name "*.svg" | xargs -I file mv file .
find . -type d -empty -delete
rm *.pdf

# weird files, one of which is broken
rm 00474-Icon-Service-Elixir.svg
mv '00474-Icon-Service-Elixir Purple.svg' Elixir-Purple.svg

# remove stupid prefixes
rename 's/\d+-icon-service-(.*)$/${1}/' *.svg

# remove xlink which causes svgo to explode
find . -type f -exec sed -i 's/xlink:href=".*"//g' {} \;

# finally remove width & height from files and optimize
svgo -f . --enable=removeDimensions
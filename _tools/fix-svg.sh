#!/bin/bash

inputFiles=$1/*

for inFile in $inputFiles
do
  echo "Fixing SVG $inFile ..."
  svgo "$inFile"
done
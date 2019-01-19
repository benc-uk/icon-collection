#!/bin/bash

inputFiles=$1/*
outDir=$2

mkdir -p $outDir

for inFile in $inputFiles
do
  outFile=${inFile%.*}.png
  outFile="$outDir/$(basename $outFile)"
  echo "Converting $inFile ..."
  #convert -background none -density 600 $inFile $outFile
  /mnt/c/Program\ Files/Inkscape/inkscape.exe $inFile --export-png $outFile -d 600
done
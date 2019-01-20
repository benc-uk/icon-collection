#!/usr/bin/node

const fs = require('fs');
const ejs = require('ejs');

var DIR = process.argv[2];
var TITLE = process.argv[3] || "Gallery";
if(!DIR || !TITLE) {
  console.log(`### ERROR! No directory and/or title provided!`);
  console.log(`Usage: node gallery.js {directory} {title}`);
  process.exit(1);
}

// Prep data to be rendered 
var data = {}
data.title = TITLE;
data.images = [];

// Image files
var files = fs.readdirSync(DIR);
for(let file of files) {
  if(!file.endsWith(".svg")) continue;
  data.images.push(file)
}

console.log(`### Generating gallery index.html for ${DIR}`);

ejs.renderFile("templates/gallery.ejs", data, {}, function(err, outHtml){
  if(err) {
    console.log(err)
  } else {
    fs.writeFileSync(DIR + '/index.html', outHtml);
  }
});
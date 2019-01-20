#!/usr/bin/node

const fs = require('fs');

var DIR = process.argv[2];
var TITLE = process.argv[3] || "Gallery";
if(!DIR || !TITLE) {
  console.log(`### ERROR! No directory and/or title provided!`);
  console.log(`Usage: node gallery.js {directory} {title}`);
  process.exit(1);
}

outHtml = `
<head><title>${TITLE}</title></head>
<style>
body {
  font-family: 'Segoe UI', Arial;
  font-size: 15px;
  background-color: #aaa;
}
img { 
  width: 100%;
  height: auto;
}
.imgbox {
  display: inline-block;
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  width: 12rem;
  
  word-wrap: break-word;
  background-color: #e0e0e0;
}
</style>
<body>
`
var files = fs.readdirSync(DIR);
for(let f of files) {
  if(!f.endsWith(".svg")) continue;
  //console.log(f);
  //<br/><span>${f}<span><br/>
  outHtml += `<div class="imgbox"><img src="${f}" /><span>${f}</span></div>\n`
}

outHtml += "</body></html>"

fs.writeFileSync(DIR + '/index.html', outHtml);

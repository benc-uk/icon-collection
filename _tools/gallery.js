#!/usr/bin/node

const fs = require('fs');

var DIR = process.argv[2];
if(!DIR) {
  console.log(`### ERROR! No directory provided!`);
  console.log(`Usage: node gallery.js {directory REQUIRED}`);
  process.exit(1);
}

outHtml = `
<head><title>Gallery</title></head>
<style>
body {
  font-family: 'Segoe UI', Arial;
  font-size: 15px;
  background-color: #eee;
}
img { 
  display: block;
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
  background-color: #fff;
}
</style>
<body>
`
var files = fs.readdirSync(DIR);
for(let f of files) {
  if(!f.endsWith(".svg")) continue;
  //console.log(f);
  //<br/><span>${f}<span><br/>
  outHtml += `<div class="imgbox"><img src="${f}"/><span>${f}</span></div>\n`
}

outHtml += "</body></html>"

fs.writeFileSync(DIR + '/index.html', outHtml);

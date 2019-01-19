#!/usr/bin/node
const fs = require('fs');
const path = require('path');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var BASEURL = process.argv[2];
//var OUTPUT = path.resolve(process.argv[3]);
//var EXTENSION = process.argv[3] || 'svg';
if(!BASEURL) {
  console.log(`### ERROR! No base URL provided!`);
  console.log(`Usage: node scrape.js {URL to scrape REQUIRED}`);
  process.exit(1);
}

OUTPUT = BASEURL.replace(/http:\/\/|https:\/\//g, "");
OUTPUT = OUTPUT.replace(/\//g, '_');
OUTPUT = OUTPUT.trim();
if(OUTPUT.endsWith('_')) OUTPUT = OUTPUT.substring(0, OUTPUT.length - 1)

try {
  fs.mkdirSync(OUTPUT, {recursive: true})
} catch(e) {}

console.log(`### Scraping icons from ${BASEURL} ...`);

// Get page HTML
request.get(BASEURL, (err, resp, body) => {

  if(err) {
    console.log(`### ERROR! Loading page - ${err}`);
    return;
  }

  var doc = new JSDOM(body).window.document;
  let count = 0;

  // Process inline SVGs
  var svgs = doc.getElementsByTagName('svg');
  for(let svg of svgs) {
    var name = `svg-${++count}`;

    // If the SVG has <use> we need to handle that
    uses = svg.getElementsByTagName('use')
    for(let use of uses) {
      let href = use.getAttribute('xlink:href') || use.getAttribute('href');

      // Use is an id of another SVG element in the page
      if(href.startsWith('#')) {
        name = href.substring(1);
        let symbol = doc.getElementById(href.substring(1));
        use.replaceWith(symbol)
      }
      // Use is external URL
      if(href.startsWith('http')) {
        // NOT HANDLED - NOT EVEN SURE ITS PART OF THE SVG SPEC
      }        
    }

    // Skip SVGs which just contain the defs
    if(svg.firstElementChild.nodeName == "defs") {
      continue;
    }

    console.log(`### - ${name} (Inline SVG)`)
    let svgContent = `<svg>${svg.innerHTML}</svg>`;
    fs.writeFileSync(`${OUTPUT}/${name}.svg`, svgContent)
  }

  // Process images
  var images = doc.getElementsByTagName('img');
  for(let img of images) {
    let src = img.getAttribute('src');
    
    if (src) {
      let fileName = src.split('/');
      fileName = fileName[fileName.length - 1];
      console.log(`### - ${fileName}`);      

      if (src.startsWith('//')) src = 'https:' + src;
      if (!src.startsWith('http')) src = BASEURL + "/" + src;
    
      //console.log(src);
      
      // Fetch image file and write to disk
      request.get(src)
      .pipe(fs.createWriteStream(`${OUTPUT}/${fileName}`))
      .on('error', err => {
        console.log(`### ERROR! Unable to fetch: ${err}`);
      })  
    }  
  }
})
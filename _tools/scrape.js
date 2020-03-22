#!/usr/bin/node

const fs = require('fs');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var BASEURL = process.argv[2];
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

// Fetch page HTML from server
request.get(BASEURL, (err, resp, body) => {

  if(err) {
    console.log(`### ERROR! Loading page - ${err}`);
    return;
  }

  // Load and parse into a virtual DOM document
  var doc = new JSDOM(body).window.document;
  let count = 0;
  //var viewBox = null;

  // Process inline SVGs
  var svgs = doc.getElementsByTagName('svg');
  for(let svg of svgs) {
    var viewBox = null;
    var name = `svg-${++count}`;

    if(svg.getAttribute('data-slug-id')) {
      name = svg.getAttribute('data-slug-id')
    }

    if(svg.getAttribute('viewBox')) {
      viewBox = svg.getAttribute('viewBox');
    }

    // If the SVG has <use> we need to handle that
    uses = svg.getElementsByTagName('use')
    for(let use of uses) {
      let href = use.getAttribute('xlink:href') || use.getAttribute('href');

      // Use is an id of another SVG element in the page
      if(href.startsWith('#')) {
        name = href.substring(1);
        let symbol = doc.getElementById(href.substring(1));
        viewBox = symbol.getAttribute('viewBox');
        //console.log(viewbox);
        
        // Remove the <use> node and insert the contents of the referred symbol
        svg.removeChild(use);
        svg.innerHTML = svg.innerHTML + symbol.innerHTML;
      }
      // Use is pointing at external URL
      if(href.startsWith('http')) {
        // NOT HANDLED - NOT EVEN SURE ITS PART OF THE SVG SPEC
      }
    }
    
    // Skip SVGs which just contain the defs
    if(svg.firstElementChild && svg.firstElementChild.nodeName == "defs") {
      continue;
    }

    console.log(`### - ${name} (Inline SVG)`)
    let viewBoxAttr = viewBox ? `viewBox="${viewBox}"` : '';
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" ${viewBoxAttr}>${svg.innerHTML}</svg>`;
    fs.writeFileSync(`${OUTPUT}/${name}.svg`, svgContent)
  }

  // Process images
  var images = doc.getElementsByTagName('img');
  for(let img of images) {
    let src = img.getAttribute('src');
    
    if (src) {
      let fileName = src.split('/');
      fileName = fileName[fileName.length - 1];
      if(fileName.endsWith('.jpeg') || fileName.endsWith('.jpg')) continue;
      console.log(`### - ${fileName}`);      

      if (src.startsWith('//')) src = 'https:' + src;
      if (!src.startsWith('http')) src = BASEURL + "/" + src;
      
      // Fetch image file and write to disk
      request.get(src)
      .pipe(fs.createWriteStream(`${OUTPUT}/${fileName}`))
      .on('error', err => {
        console.log(`### ERROR! Unable to fetch: ${err}`);
      })  
    }  
  }
})
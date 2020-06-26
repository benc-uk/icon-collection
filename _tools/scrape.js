#!/usr/bin/node

const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');
const SVGO = require('svgo');

const svgo = new SVGO(); //{js2svg: { pretty: true }});

// Sort out input params
const baseURL = process.argv[2];
if(!baseURL) {
  console.log(`### ERROR! No base URL provided!`);
  console.log(`Usage: node scrape.js {url}`);
  process.exit(1);
}

// Construct a output dir from the URL
let outputDir = baseURL.replace(/http:\/\/|https:\/\//g, "");
outputDir = outputDir.replace(/\//g, '_');
outputDir = outputDir.trim();
if(outputDir.endsWith('_')) outputDir = outputDir.substring(0, outputDir.length - 1)

// Create output dir
try {
  fs.mkdirSync(outputDir, {recursive: true})
} catch(e) {}

console.log(`### Scraping icons from ${baseURL} ...`);
runScrape(baseURL);

//
// Main scraping function
//
async function runScrape(url) {
  // Load the page / base URL
  let resp = await fetch(url);
  if(!resp.ok) {
    console.log(`### Failed to fetch ${url}`);
    process.exit(1)
  }

  // Get page body (HTML)
  let body = await resp.text()

  // Load and parse page into a virtual DOM document
  var doc = new JSDOM(body).window.document;
  let count = 0;

  //
  // Process inline SVGs
  //
  var svgs = doc.getElementsByTagName('svg');
  for(let svg of svgs) {
    var viewBox = null;
    
    // Default name if we can't get anything better 
    var name = `svg-${++count}`;

    // If there's a slug-id we can use that as a
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

    console.log(`### Inline - ${name}`)
    let viewBoxAttr = viewBox ? `viewBox="${viewBox}"` : '';
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" ${viewBoxAttr}>${svg.innerHTML}</svg>`;
    svgContent = (await svgo.optimize(svgContent)).data
    fs.writeFileSync(`${outputDir}/${name}.svg`, svgContent)
  }

  //
  // Process img tags
  //
  var images = doc.getElementsByTagName('img');
  for(let img of images) {
    let src = img.getAttribute('src');
    
    if (src) {
      let fileName = src.split('/');
      fileName = fileName[fileName.length - 1];
      if(fileName.endsWith('.jpeg') || fileName.endsWith('.jpg')) continue;
      if(fileName.endsWith('.png') || fileName.endsWith('.png')) continue;
            
      // Make a fetchable URL (it might be a fragment or a path)
      const url = new URL(src, baseURL)
      console.log(`### Linked - ${url.href}`);

      // fetch optimize and save
      let imgResp = await fetch(url.href)
      let svgContent = await imgResp.text()
      svgContent = (await svgo.optimize(svgContent)).data
      fs.writeFileSync(`${outputDir}/${fileName}`, svgContent)
    }  
  }  
}
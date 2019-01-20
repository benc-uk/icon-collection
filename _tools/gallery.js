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
<head><title>${TITLE}</title>
</head>
<style>
body {
  font-family: 'Segoe UI', Arial;
  background-color: #aaa;
  padding: 0;
  margin: 0;
}
.bg0 {
  background-image: url("https://github.com/benc-uk/icon-collection/raw/master/_tools/background.png")
}
.bg1 {
  background-color: #333;
}
.bg2 {
  background-color: #fff;
}
.imgbox img { 
  width: 10.5rem;
  height: 10.5rem;
  object-fit: contain;
  cursor: pointer;
}
.imgbox {
  margin: 0.6rem;
  padding: 0.5rem;
  text-align: center;
  width: 12rem;
  height: 12rem;
  background-color: #e0e0e0;
}
h1 {
  font-size: 2.6rem;
}
.find, .find input {
  font-size: 1.5rem;
}
.top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #aaa;
  padding: 1rem;
  padding-top: 0;
  box-shadow: 0px 5px 18px 3px rgba(0,0,0,0.59);
}
.top button {
  float: right; 
  position: relative; 
  top: -2rem; 
  font-size: 1.5rem;
}
.pngbox {
  position: absolute; 
  top: 2rem; 
  right: 1rem;
  font-size: 1.5rem;
}
input[type="checkbox"] {
  width: 1.6em;
  height: 1.6em;
}
.label {
  height: 2.5em;
  line-height: 1em;
  overflow: hidden;
  font-size: 0.9rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
<body>
<div class="top">
<h1>${TITLE}</h1>
<span class="find">Finder: <input onkeyup="search()" id="finder"><br></span> 
<div class="pngbox"><input type="checkbox" id="pngcheck"><label for="pngcheck">Download as PNG</label></div>
<button onclick="toggleBg()">Change Background</button>
</div>
<div class="grid">
`

var files = fs.readdirSync(DIR);
for(let f of files) {
  if(!f.endsWith(".svg")) continue;
  outHtml += `<div id="${f}" class="imgbox"><img src="${f}" class="bg0" onclick="download('${f}', this)"/><div class="label">${f}</div></div>\n`
}

outHtml += `
</div>
<script>
var bg = 0;
function toggleBg() {
  bg++
  if(bg > 2) bg = 0;
  for(let img of document.getElementsByTagName("img")) {
    img.className = \`bg\${bg}\`;
  }
}

function search() {
  let q = document.getElementById('finder').value.trim().toLowerCase()
  if(q.length <= 0) {
    for(let imgbox of document.getElementsByClassName("imgbox")) {
      imgbox.style.display = "inline-block"
    }
  }
  for(let imgbox of document.getElementsByClassName("imgbox")) {
    imgbox.style.display = "inline-block"
    if(!imgbox.id.includes(q)) {
      imgbox.style.display = "none"
    }
  }
}

function download(f, e) {
  var downloadPNG = document.getElementById("pngcheck").checked;
  if(downloadPNG) {
    var data = getBase64Image(e);
    let a = document.createElement('a')
    a.href = "data:application/octet-stream;base64," + data
    a.download = f.replace('.svg', '.png')
    a.click()
  } else {
    let a = document.createElement('a')
    a.href = f
    a.download = f
    a.click()
  }
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  console.log(canvas.width , canvas.height)
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\\/(png|jpg);base64,/, "");
}
</script>
</body></html>`

console.log(`### Generating gallery index.html for ${DIR}`);

fs.writeFileSync(DIR + '/index.html', outHtml);

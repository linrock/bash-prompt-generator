const fs = require('fs');
const path = require('path');

const { Snapshot } = require('snapshot-url');

const OUT_DIR = './build';                     // output dir, relative to this file
const HTML_OUTFILE = './build/index.html';     // output html file, pretty-printed + cleaned

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);
// fs.copyFileSync(`./public/favicon.ico`, `${OUT_DIR}/favicon.ico`);

(async () => {
  const url = `file://${path.resolve('./build/index.html')}`;

  const snapshot = new Snapshot(url);
  const dom = await snapshot.renderDOM();

  // replace css links with inline css
  const STYLE_NODES = 'link[rel="stylesheet"]';
  dom.window.document.
    querySelectorAll(STYLE_NODES).
    forEach(async (cssNodeEl) => {
      const cssSrc = cssNodeEl.attributes.href.value;
      let data;
      // external links not supported yet
      if (cssSrc.startsWith('https://')) {
        return;
      }
      data = fs.readFileSync(path.resolve(`./build/${cssSrc}`), {encoding: 'utf8', flag: 'r'});
      const styleNode = dom.window.document.createElement('style');
      styleNode.innerHTML = data;
      cssNodeEl.parentNode.appendChild(styleNode);
      cssNodeEl.parentNode.removeChild(cssNodeEl);
      return true;
    });

  const finalHtml = snapshot.getHtml({ prettyPrint: true });

  // write the final html to a file
  fs.open(HTML_OUTFILE, 'w', (err) => {
    if (err) {
      throw `Couldn't open file: ${HTML_OUTFILE}`;
    }
    fs.writeFile(HTML_OUTFILE, finalHtml, async (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Saved static html to ${OUT_DIR}/index.html (size: ${finalHtml.length})`);
      }
    });
  });
})();

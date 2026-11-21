const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync, spawn } = require('child_process')
const glob = require('glob')

const root = path.resolve(__dirname, '..')
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ol-ext-examples-'))
const upstream = path.join(root, 'ol-ext')
const tag = process.env.OL_EXT_TAG || 'v4.0.39'
const archive = execFileSync('git', ['-C', upstream, 'archive', tag, 'examples', 'dist'], {
  maxBuffer: 256 * 1024 * 1024,
})
execFileSync('tar', ['-xf', '-', '-C', temp], { input: archive })
fs.copyFileSync(path.join(root, 'node_modules/ol/ol.css'), path.join(temp, 'ol.css'))
const examples = glob.sync('examples/**/*.ts', { cwd: root })
const available = []
for (const example of examples) {
  const relative = example.replace(/\.ts$/, '.html')
  const htmlPath = path.join(temp, relative)
  if (!fs.existsSync(htmlPath)) {
    console.warn(`No ${tag} HTML found for ${example}; skipping`)
    continue
  }
  let replaced = false
  let html = fs.readFileSync(htmlPath, 'utf8')
  const portSource = fs.readFileSync(path.join(root, example), 'utf8')
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, body) => {
    if (/\bsrc\s*=/.test(attrs)) {
      if (/src=["']\/v2\/polyfill\.min\.js/i.test(attrs)) return ''
      if (/openlayers\.org\/.*ol\.js|cdn\.jsdelivr\.net\/npm\/ol@[^/]+\/dist\/ol\.js|\.\.\/\.\.\/dist\/ol-ext\.js/i.test(attrs)) return ''
      // These ports import the corresponding ol-ext modules in their bundles.
      const bundledExtras = {
        'examples/style/map.fontawesome.5.html': /\/FontAwesome(?:5)?Def\.js/i,
        'examples/filter/map.filter.texture.html': /\/TextureImage\.js/i,
        'examples/style/map.style.font.html': /\/(?:FontMaki(?:2)?Def|FontAwesomeDef)\.js/i,
        'examples/misc/map.control.cloud.html': /\/Cloud\.js/i,
      }
      if (bundledExtras[relative]?.test(attrs)) return ''
      const fontDefinition = attrs.match(/\/dist\/extra\/(Font\w+Def)\.js/)
      if (fontDefinition && portSource.includes(`ol-ext/style/${fontDefinition[1]}`)) return ''
      if (/\/dist\/extra\/Exif2Geojson\.js/i.test(attrs) && portSource.includes('ol-ext/utils/Exif2Geojson')) return ''
      if (/\/jspdf[/.]/i.test(attrs) && portSource.includes('from \'jspdf\'')) return ''
      if (/\/jspdf[/.]/i.test(attrs) && portSource.includes('/.shared/print')) return ''
      if (/FileSaver(?:\.min)?\.js/i.test(attrs) && portSource.includes('/.shared/download')) return ''
      return whole
    }
    if (/ol\.(?:Map|PerspectiveMap|ext)\b|ol\.layer\.Geoportail\.getCapabilities\(/.test(body)) {
      if (replaced) return ''
      replaced = true
      return `<script src="${path.basename(example, '.ts')}.js"></script>`
    }
    return whole
  })
  if (!replaced) {
    console.warn(`Could not identify the main script in ${relative}; skipping`)
    continue
  }
  html = html.replace(/https:\/\/cdn\.jsdelivr\.net\/npm\/ol@latest\/ol\.css/g, '/ol.css')
  fs.writeFileSync(htmlPath, html)
  available.push(relative)
}
console.log('Building examples into', temp)
execFileSync(path.join(root, 'node_modules/.bin/webpack'), [
  '-c', path.join(root, 'examples/webpack.config.js'), '--output-path', path.join(temp, 'examples'),
], { cwd: root, stdio: 'inherit' })
const port = process.env.PORT || '8765'
console.log(`Available TypeScript examples (${tag}):`)
for (const example of available) console.log(`  http://localhost:${port}/${example}`)
console.log('Press Ctrl+C to stop')
const server = spawn('python3', ['-m', 'http.server', port, '--directory', temp], { stdio: 'inherit' })
server.on('exit', code => { process.exitCode = code || 0 })

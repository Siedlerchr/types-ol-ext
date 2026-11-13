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
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (whole, attrs, body) => {
    if (/\bsrc\s*=/.test(attrs)) {
      if (/openlayers\.org\/.*ol\.js|cdn\.jsdelivr\.net\/npm\/ol@[^/]+\/dist\/ol\.js|\.\.\/\.\.\/dist\/ol-ext\.js/i.test(attrs)) return ''
      return whole
    }
    if (/ol\.Map|ol\.ext/.test(body)) {
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

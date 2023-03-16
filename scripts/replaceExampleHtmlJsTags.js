const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const htmlParser = require('node-html-parser')

const BASE_DIR = process.cwd()

const olExtDir = path.resolve(BASE_DIR, 'ol-ext')
const olExtExamplesDir = path.resolve(olExtDir, 'examples')
const tsExamplesDir = path.resolve(BASE_DIR, 'examples')

if (!fs.existsSync(olExtDir) || !fs.existsSync(olExtExamplesDir)) {
  console.log('# ERROR:', '"ol-ext" or "ol-ext/examples" directory does not exist')
  process.exit(1)
}

const tsExamplePaths = glob.sync(path.join(tsExamplesDir, '**/*.ts'))

if (!tsExamplePaths.length) {
  console.log('# No TypeScript examples. Exiting...')
  process.exit()
}

console.log('# ===== REPLACING HTML JS TAGS =====')
// eslint-disable-next-line no-restricted-syntax
for (const tsExamplePath of tsExamplePaths) {
  const relExampleHtmlPath = path.relative(tsExamplesDir, tsExamplePath)
    .replace(/\.ts$/, '.html')
  const exampleHtmlPath = path.resolve(olExtExamplesDir, relExampleHtmlPath)
  console.log(exampleHtmlPath)
  const html = fs.readFileSync(exampleHtmlPath)
  const root = htmlParser.parse(html.toString(), {
    comment: true,
    blockTextElements: {
      script: true,
      noscript: true,
      style: true,
      pre: true,
    },
  })
  const scripts = root.querySelectorAll('script')
  // eslint-disable-next-line no-restricted-syntax
  for (const script of scripts) {
    const src = script.getAttribute('src')
    if (src) {
      if (src === 'https://openlayers.org/en/latest/build/ol.js'
          || src.indexOf('../../dist/') >= 0) {
        script.remove()
      }
    } else {
      const code = script.text
      if (code && (code.indexOf('ol.Map') >= 0 || code.indexOf('ol.ext') >= 0)) {
        const exampleJsPath = exampleHtmlPath.replace(/\.html$/, '.js')
        const exampleJsBakPath = `${exampleJsPath}.bak`
        fs.writeFileSync(exampleJsBakPath, code)
        script.set_content('')
        script.setAttribute('src', path.basename(exampleJsPath))
      }
    }
  }
  fs.writeFileSync(exampleHtmlPath, root.toString())
}

console.log('# Examples html has been replaced')

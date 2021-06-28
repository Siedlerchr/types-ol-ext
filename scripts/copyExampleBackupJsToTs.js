const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const BASE_DIR = process.cwd();

const olExtDir = path.resolve(BASE_DIR, 'ol-ext');
const olExtExamplesDir = path.resolve(olExtDir, 'examples');
const tsExamplesDir = path.resolve(BASE_DIR, 'examples');

if (!fs.existsSync(olExtDir) || !fs.existsSync(olExtExamplesDir)) {
  console.log('# ERROR:', '"ol-ext" or "ol-ext/examples" directory does not exist');
  process.exit(1);
}

const tsExamplePaths = glob.sync(path.join(tsExamplesDir, '**/*.ts'));

if (!tsExamplePaths.length) {
  console.log('# No TypeScript examples. Exiting...');
  process.exit();
}

console.log('# ===== COPYING BACKUP JS TO TS =====');
for (const tsExamplePath of tsExamplePaths) {
  const relExampleHtmlPath = path.relative(tsExamplesDir, tsExamplePath)
    .replace(/\.ts$/, '.html');
  const exampleHtmlPath = path.resolve(olExtExamplesDir, relExampleHtmlPath);
  const exampleJsBakPath = exampleHtmlPath.replace(/\.html$/, '.js.bak');
  console.log(exampleJsBakPath);
  fs.copyFileSync(exampleJsBakPath, tsExamplePath);
}

console.log('# Examples ts files has been copied');

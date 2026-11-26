const path = require('path')
const glob = require('glob')

module.exports = {
  entry: () => {
    const entries = {}
    glob.sync('./examples/**/*.ts').forEach(file => {
      const basename = path.basename(file).replace(path.extname(file), '')
      const dirname = path.basename(path.dirname(file))
      const key = `${dirname}/${basename}`
      entries[key] = path.resolve(file)
    })
    return entries
  },
  output: {
    path: path.resolve(__dirname, '..', 'ol-ext', 'examples'),
    filename: '[name].js',
  },
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      // Use the ESM entry with the same OpenLayers classes as the examples.
      'ol-mapbox-style$': path.resolve(path.dirname(require.resolve('ol-mapbox-style')), '../src/index.js'),
      // ol-ext 4.0.39's TinkerBell import has the wrong case on Linux.
      '../util/getMapcanvas.js$': require.resolve('ol-ext/util/getMapCanvas.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: 'examples/tsconfig.json',
        },
      },
      {
        test: /\.m?js/,
        type: 'javascript/auto',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
}

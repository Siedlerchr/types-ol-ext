const path = require('path');
const glob = require('glob');

module.exports = {
  entry: () => {
    const entries = {};
    glob.sync('./examples/**/*.ts').forEach(file => {
      const basename = path.basename(file).replace(path.extname(file), '');
      const dirname = path.basename(path.dirname(file));
      const key = dirname + '/' + basename;
      entries[key] = file;
    })
    return entries;
  },
  output: {
    path: path.resolve(__dirname, '..', 'ol-ext', 'examples'),
    filename: '[name].js',
  },
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: "examples/tsconfig.json",
        },
      },
    ],
  }
}

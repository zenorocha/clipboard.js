const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const ClosurePlugin = require('closure-webpack-plugin');

const production = process.env.NODE_ENV === 'production' || false;

const banner = `clipboard.js v${pkg.version}
https://clipboardjs.com/

Licensed MIT © Zeno Rocha`;

module.exports = {
  entry: './src/clipboard.js',
  mode: 'production',
  output: {
    filename: production ? 'clipboard.min.js' : 'clipboard.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'clipboard',
    globalObject: 'this',
    libraryExport: 'default',
    libraryTarget: 'window',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  optimization: {
    minimizer: [new ClosurePlugin({ mode: 'STANDARD' }, {})],
  },
  plugins: [new webpack.BannerPlugin({ banner })],
};

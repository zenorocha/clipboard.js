const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

const production = process.env.NODE_ENV === 'production' || false;

const banner = `clipboard.js v${pkg.version}
https://clipboardjs.com/

Licensed MIT © Zeno Rocha`;

module.exports = {
  entry: './src/clipboard.js',
  mode: 'production',
  target: ['web', 'es5'],
  output: {
    filename: production ? 'clipboard.min.js' : 'clipboard.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ClipboardJS',
    globalObject: 'this',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  optimization: {
    minimize: production,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: /^!/
          },
        },
      }),
    ],
  },
  plugins: [new webpack.BannerPlugin({ banner })],
};

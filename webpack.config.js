var path = require('path');

module.exports = {
  entry: path.resolve(path.join(__dirname, '.', 'index.js')),
  output: {
    path: path.resolve(path.join(__dirname, '.', 'dist')),
    library: 'Clipboard',
    libraryTarget: 'umd',
    filename: 'clipboard.js'
  },
  module: {
    loaders: [{test: /\.js?$/, exclude: /(node_modules|bower_components)/, loader: 'babel?optional[]=runtime&stage=0'}]
  },
  externals: [
    // delegate-events and tiny-emitter could go here if you want them externally provided
    // {library: {root: 'LibraryWindowSymbol', amd: 'library', commonjs: 'library', commonjs2: 'library'}},
  ]
};

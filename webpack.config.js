const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production' || false;

const banner = `clipboard.js v${pkg.version}
https://zenorocha.github.io/clipboard.js

Licensed MIT © Zeno Rocha`;

module.exports = {
    entry: './src/clipboard.js',
    output: {
        filename: production ? 'clipboard.min.js' : 'clipboard.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ClipboardJS',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: production ? [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            }),
            new webpack.BannerPlugin({banner})
        ] : [
            new webpack.BannerPlugin({banner})
        ]
};

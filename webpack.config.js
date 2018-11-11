const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                parallel: require('os').cpus().length,
                uglifyOptions: {
                    ie8: false,
                    keep_fnames: false,
                    output: {
                        beautify: false,
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [new webpack.BannerPlugin({ banner })]
};

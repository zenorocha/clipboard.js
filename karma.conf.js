module.exports = function(karma) {
    karma.set({
        plugins: ['karma-browserify', 'karma-chai', 'karma-sinon', 'karma-mocha', 'karma-phantomjs-launcher'],

        frameworks: ['browserify', 'chai', 'sinon', 'mocha'],

        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.js',
            'test/**/*.js'
        ],

        exclude: ['test/module-systems.js'],

        preprocessors: {
            'src/**/*.js' : ['browserify'],
            'test/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        browsers: ['PhantomJS']
    });
}

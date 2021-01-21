var webpackConfig = require('./webpack.config.js');

module.exports = function (karma) {
  karma.set({
    plugins: [
      'karma-webpack',
      'karma-chai',
      'karma-sinon',
      'karma-mocha',
      'karma-chrome-launcher',
    ],

    frameworks: ['chai', 'sinon', 'mocha', 'webpack'],

    files: [
      { pattern: 'src/**/*.js', watched: false },
      { pattern: 'test/**/*.js', watched: false },
    ],

    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack'],
    },

    webpack: {
      module: webpackConfig.module,
      plugins: webpackConfig.plugins,
    },

    webpackMiddleware: {
      stats: 'errors-only',
    },

    browsers: ['ChromeHeadless'],
  });
};

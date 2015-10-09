var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

gulp.task('build', function () {
  gulp.src('index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(concat('clipboard.js'))
  .pipe(gulp.dest('dist'))
  .pipe(uglify())
  .pipe(rename({extname: '.min.js' }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

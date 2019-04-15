const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass');

function defaultTask() {
  return gulp
    .src('./styles/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('../lib/'));
}

function pipFonts() {
  return gulp.src('./fonts/xy.*').pipe(gulp.dest('../lib/fonts/'));
}

exports.pipFonts = pipFonts;
exports.default = gulp.series(defaultTask, pipFonts);

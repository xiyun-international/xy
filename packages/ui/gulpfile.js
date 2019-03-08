const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const sass = require("gulp-sass");

function defaultTask() {
  return gulp
    .src('./index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest("../lib/"));
}

exports.default = defaultTask;

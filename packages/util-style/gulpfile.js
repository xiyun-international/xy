const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const less = require('gulp-less');

// 将每个 less 文件单独编译
function defaultTask() {
  return gulp
    .src('./src/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/'));
}

exports.default = defaultTask;

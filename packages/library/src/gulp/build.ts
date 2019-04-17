import gulp from "gulp";
import less from "gulp-less";
import sass from "gulp-sass";
import cssmin from "gulp-cssmin";
import autoprefixer from "gulp-autoprefixer";

import { IOutputOpts } from "./types";

export async function buildCss(type: String, outputOpts: IOutputOpts) {
  gulp.task(type, () => {
    build(type, outputOpts)
  })
}

function build(type: String, outputOpts: IOutputOpts) {
  const { themeDir, libDir } = outputOpts;

  // SASS、Less
  gulp
    .src(`${themeDir}/styles/index.${type}`)
    .pipe(type === "scss" ? sass().on("error", sass.logError) : less())
    .pipe( autoprefixer({
        browsers: ["ie > 9", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest(libDir));

  console.dir(themeDir)
  // Font
  gulp
    .src(`${themeDir}/fonts/xy.*`)
    .pipe(gulp.dest(`${libDir}/fonts/`));
}

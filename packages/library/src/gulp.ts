import gulp from "gulp";
import signale from "signale";

import { join } from "path";
import { IOpts } from "./types";
import { buildCss } from "./gulp/build";
import { existsSync, readdirSync } from "fs";

export default async function(opts: IOpts) {
  const { cwd } = opts;
  if (isLerna(cwd)) {
    const dirs = readdirSync(join(cwd, "packages"));
    dirs.forEach(pkg => build(`./packages/${pkg}`, { cwd }));
  } else {
    build("./", { cwd });
  }
}

function isLerna(cwd) {
  return existsSync(join(cwd, "lerna.json"));
}

export async function build(dir: any, opts: IOpts) {
  const { cwd } = opts;
  const pkgPath = join(cwd, dir);

  const libDir = join(pkgPath, "lib");
  const themeDir = join(pkgPath, "theme");

  // 编译 Gulp
  if (existsSync(themeDir)) {
    // Todo: 改造成 .xy.library.js
    const type = themeDir.indexOf("element-ui") === -1 ? "less" : "scss";

    buildCss(type, {
      themeDir,
      libDir
    });

    const taskInstance = gulp.task(type);
    if (taskInstance === undefined) {
      signale.error("Task not found!");
      return;
    }

    try {
      taskInstance.apply(gulp);
      signale.success(`Run task ${dir}`);
    } catch (err) {
      signale.error(err);
    }
  }
}


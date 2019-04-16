import gulp from 'gulp';
import less from 'gulp-less';
import cssmin from 'gulp-cssmin';
import autoprefixer from 'gulp-autoprefixer';
import assert from 'assert';

import { join } from 'path';
import { existsSync, readdirSync } from 'fs';

// import { existsSync, readdirSync, readFileSync } from 'fs';
// import rollup, { RollupOptions, OutputOptions } from 'rollup';
// import { getExistFile } from './utils';
// import getUserConfig from './getUserConfig';

import { IOpts } from './types';

export async function build(opts: IOpts) {
  const { cwd } = opts;
  const pkgPath = join(opts.cwd, 'packages', cwd);
  const libDir = join(pkgPath, 'lib');
  const srcDir = join(pkgPath, 'src');

  console.dir(libDir)
  console.dir(srcDir)


  // const pkgs = readdirSync(join(cwd, 'packages'));

  // for (const pkg of pkgs) {
  //   if (process.env.PACKAGE && pkg !== process.env.PACKAGE) continue;
  //   const pkgPath = join(opts.cwd, 'packages', pkg);
  //   assert.ok(
  //     existsSync(join(pkgPath, 'package.json')),
  //     `package.json not found in packages/${pkg}`,
  //   );
  //   process.chdir(pkgPath);
  //   await build(
  //     {
  //       // eslint-disable-line
  //       ...opts,
  //       buildArgs: merge(opts.buildArgs, userConfig),
  //       cwd: pkgPath,
  //     },
  //     {
  //       pkg,
  //     },
  //   );
  // }


  // return gulp
  //   .src(`${cwd}/styles/index.less`)
  //   .pipe(less())
  //   .pipe(autoprefixer({
  //     browsers: ['ie > 9', 'last 2 versions'],
  //     cascade: false,
  //   }))
  //   .pipe(cssmin())
  //   .pipe(gulp.dest('../lib/'));
}


function isLerna(cwd) {
  return existsSync(join(cwd, 'lerna.json'));
}

export default async function(opts: IOpts) {
  const { cwd } = opts;
  if (isLerna(cwd)) {
    const dirs = readdirSync(join(cwd, 'packages')).filter(dir => dir.charAt(0) !== '.');
    dirs.forEach(pkg => {
      build({ cwd });
    });
  } else {
      build({ cwd });
  }
}

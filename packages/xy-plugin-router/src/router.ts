import assert from 'assert';
import path from 'path';
import fs from 'fs';
import template from './template';

function run(dir: string) {
  assert(dir, 'no directory specified');

  const cwd = process.cwd();
  const res = /.*?\/src/.exec(cwd);

  assert(res, 'can not found the "src" directory');

  const routerPath = path.resolve(res[0], 'router', 'routers', dir);

  assert(!fs.existsSync(routerPath), 'target path is already exist');

  const childrenRouterPath = path.resolve(
    res[0],
    'router',
    'childrenRouter.js',
  );

  assert(
    fs.existsSync(childrenRouterPath),
    '"childrenRouter.js" file is not exist',
  );

  try {
    fs.mkdirSync(routerPath);
  } catch (e) {
    throw new Error('create target directory error');
  }

  const replace = template.replace(/\$1/g, dir);

  try {
    fs.writeFileSync(path.resolve(routerPath, 'index.js'), replace);
  } catch (e) {
    throw new Error('create router file error');
  }

  const childrenRouterStr = fs.readFileSync(childrenRouterPath, {
    encoding: 'utf8',
  });
  console.log(childrenRouterStr);
}

export default run;

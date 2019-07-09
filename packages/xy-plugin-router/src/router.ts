import assert from 'assert';
import path from 'path';
import fs from 'fs';
import signale from 'signale';
import template from './template';

function run(dir: string) {
  assert(dir, 'no directory specified');
  assert(
    !(dir === '.' || dir === './'),
    'directory can not specified with "." or "./"',
  );
  signale.start('start adding router...');

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
    signale.success(`create "${dir}" directory at "${routerPath}"`);
  } catch (e) {
    throw new Error('create target directory error');
  }

  const replace = template.replace(/\$1/g, dir);

  try {
    fs.writeFileSync(path.resolve(routerPath, 'index.js'), replace);
    signale.success(`create "index.js" in "${routerPath}"`);
  } catch (e) {
    throw new Error('create router file error');
  }

  const childrenRouterStr = fs.readFileSync(childrenRouterPath, {
    encoding: 'utf8',
  });
  const rawArr = childrenRouterStr.split(/[\n]/);
  const tmp = [];
  const end = [];
  rawArr.forEach((line, idx) => {
    if (line.indexOf('import') !== -1) {
      tmp.push(idx);
    }
    if (line.indexOf(']') !== -1) {
      end.push(idx);
    }
  });
  const lastTmpKey = tmp[tmp.length - 1];
  rawArr[lastTmpKey] = `${
    rawArr[lastTmpKey]
  }\n\nimport ${dir} from './routers/${dir}';`;
  const lastEndKey = end[end.length - 1];
  rawArr[lastEndKey] = `  ...${dir},\n${rawArr[lastEndKey]}`;
  const newStr = rawArr.join('\n');
  try {
    fs.writeFileSync(childrenRouterPath, newStr);
    signale.success('write router complete');
  } catch (e) {
    throw new Error('write "childrenRouter.js" file error');
  }
}

export default run;

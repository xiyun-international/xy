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
  let res = /.*?\/src/.exec(cwd);
  if (!res) {
    res = /.*?\/src/.exec(path.resolve(cwd, 'src'));
  }

  assert(res, 'can not found the "src" directory');

  const routerPath = path.resolve(res[0], 'router', 'routes', dir);

  assert(!fs.existsSync(routerPath), 'target path is already exist');

  const childrenRouterPath = path.resolve(res[0], 'router', 'children.js');

  assert(fs.existsSync(childrenRouterPath), '"children.js" file is not exist');

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
    throw new Error('write "children.js" file error');
  }
}

export default run;

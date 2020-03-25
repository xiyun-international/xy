const ora = require('ora');
const chokidar = require('chokidar');
const resolve = require('path').resolve;
const getMockData = require('./get-mock-files');

// interface Options {
//   cwd: string;
//   errors: Array<string>;
//   config: object;
//   absPagesPath: string;
//   path: string;
//   watch: boolean;
// }

module.exports = (opts = {}) => {
  // console.log(77777);
  // console.log(forever);
  const { watch = true, path = '**/__mock__/**/*.[jt]s' } = opts;
  // console.log(88888);
  const spinner = ora();
  let port = 8999; //固定端口 冲突时会报错
  let watcher = null;
  let mockData = null;

  const HOME_PAGE = 'homepage';
  if (watch) {
    watcher = chokidar.watch(resolve(process.cwd(), path), {
      ignored: '**/node_modules/**',
    });
    watcher.on('all', (event, pathWatch) => {
      spinner.start(`[${event}] ${pathWatch}, reload mock data`);

      cleanRequireCache();
      fetchMockData(path); //每次要收集所有路径的数据
      spinner.stop();
      // signale.success(`Mock files parse success`);
    });
  } else {
    fetchMockData(path);
  }
  function cleanRequireCache() {
    Object.keys(require.cache).forEach(file => {
      if (require.cache[file]) {
        delete require.cache[file];
      }
    });
  }
  function fetchMockData(path) {
    mockData = getMockData({
      spinner,
      path,
    });
  }
};

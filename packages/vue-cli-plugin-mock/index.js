const getMockData = require('./get-mock-files');
const ora = require('ora');
const resolve = require('path').resolve;
const chokidar = require('chokidar');
const signale = require('signale');
const matchMock = require('./match-mock');

const spinner = ora();
module.exports = (api, options) => {
  const path = options.path || '**/__mock__/**/*.[jt]s';
  let mockData = [];

  function cleanRequireCache() {
    Object.keys(require.cache).forEach(file => {
      if (require.cache[file]) {
        delete require.cache[file];
      }
    });
  }

  api.chainWebpack(webpackConfig => {
    webpackConfig.devServer.set('before', (app, server) => {
      mockData = getMockData({
        spinner,
        path,
      });
      app.use((req, res, next) => {
        const match = mockData && matchMock(req, mockData);
        if (match) {
          signale.info(`mock matched: [${match.method}] ${match.path}`);
          match.handler(req, res, next);
          res.end();
        } else {
          next();
        }
      });
      server.compiler.hooks.beforeCompile.tap('beforeCompile', async () => {
        if (process.env.NODE_ENV === 'development') {
          const watcher = chokidar.watch(resolve(path), {
            ignored: '**/node_modules/**',
            persistent: true,
          });

          watcher.on('change', async () => {
            cleanRequireCache();
            mockData = await getMockData({
              spinner,
              path,
            });
            app.use((req, res, next) => {
              const match = mockData && matchMock(req, mockData);
              if (match) {
                signale.info(`mock matched: [${match.method}] ${match.path}`);
                match.handler(req, res, next);
                res.end();
              } else {
                next();
              }
            });
          });
        }
      });
    });
  });
};

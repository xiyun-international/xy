import ora from 'ora';
import express from 'express';
import chokidar from 'chokidar';
import { resolve } from 'path';
import signale from 'signale';
import cors from 'cors';
import getMockData from './get-mock-files';
import matchMock from './match-mock';

interface Options {
  cwd: string;
  errors: Array<string>;
  config: object;
  absPagesPath: string;
  path: string;
  watch: boolean;
}

export default async function(opts: Options) {
  const { watch = true, path = '**/__mock__/**/*.[jt]s' } = opts;

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
      signale.success(`Mock files parse success`);
    });
  } else {
    await fetchMockData(path);
  }
  function cleanRequireCache() {
    Object.keys(require.cache).forEach(file => {
      if (require.cache[file]) {
        delete require.cache[file];
      }
    });
  }
  function fetchMockData(path: string) {
    mockData = getMockData({
      spinner,
      path,
    });
  }
  new Promise((resolve, reject) => {
    const app = express();
    app.use(cors());
    app.use(function XY_MOCK(req, res, next) {
      const match = mockData && matchMock(req, mockData);
      if (match) {
        signale.info(`mock matched: [${match.method}] ${match.path}`);
        return match.handler(req, res, next);
      } else {
        return next();
      }
    });

    app.use((req, res, next) => {
      if (req.path === '/') {
        res.end(HOME_PAGE);
      } else {
        next();
      }
    });
    app.listen(port, err => {
      signale.info(`
      Server running at \n
      - http://127.0.0.1:${port}\n
      - http://localhost:${port}
      `);
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

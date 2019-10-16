import ora from 'ora';
import express from 'express';
import chokidar from 'chokidar';
import { join } from 'path';
import signale from 'signale';
import { windowPath, cleanRequireCache } from './utils';
import getMockData from './get-mock-files';
import matchMock from './match-mock';

interface OraInter {
  start: Function;
  fail: Function;
  succeed: Function;
}
interface Options {
  cwd: string;
  errors: Array<string>;
  config: object;
  absPagesPath: string;
  absSrcPath: string;
  watch: boolean;
}

export default async function(opts: Options) {
  const { watch } = opts;
  const spinner = ora();
  let port = 80;
  let watcher = null;
  let mockData = null;

  const HOME_PAGE = 'homepage';

  await fetchMockData();

  if (watch) {
    console.log(join(process.cwd(), '**/__mock__/*.[jt]s'));
    watcher = chokidar.watch(join(process.cwd(), '**/__mock__/*.[jt]s'), {
      ignored: '**/node_modules/**',
    });
    watcher.on('all', (event, path) => {
      spinner.start(`[${event}] ${path}, reload mock data`);

      // cleanRequireCache(paths);
      fetchMockData();
      spinner.stop();
      signale.success(`Mock files parse success`);
    });
  }
  function fetchMockData() {
    mockData = getMockData({
      spinner,
    });
  }
  let mockServer = new Promise((resolve, reject) => {
    const app = express();
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
      signale.info(`server is listening at ${port} port`);
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

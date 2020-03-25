const bodyParser = require('body-parser');
const multer = require('multer');
const assert = require('assert');
const pathToRegexp = require('path-to-regexp');
const resolve = require('path').resolve;
const windowPath = require('./utils').windowPath;
const glob = require('glob');
const mockjs = require('mockjs');

const VALID_METHODS = ['post', 'get', 'put', 'patch', 'delete'];
const BODY_PARSED_METHODS = ['post', 'get', 'put', 'patch', 'delete'];
let spinner = null;

function createHandler(method, handler) {
  return function(req, res, next) {
    if (BODY_PARSED_METHODS.includes(method)) {
      bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
        bodyParser.urlencoded({ limit: '5mb', extended: true })(
          req,
          res,
          () => {
            sendData();
          },
        );
      });
    }

    function sendData() {
      if (typeof handler === 'function') {
        multer().any()(req, res, () => {
          let result = handler(req, res, next);
          if (res) {
            res.json(result);
          }
        });
      } else {
        res.json(mockjs.mock(handler));
      }
    }
  };
}

function normalizeConfig(config) {
  return Object.keys(config).reduce((memo, key) => {
    const handler = config[key];
    const type = typeof handler;
    assert(
      type === 'function' || type === 'object',
      `mock value of ${key} should be function or object, but got ${type}`,
    );
    const { method, path } = parseKey(key);
    const keys = [];
    const re = pathToRegexp(path, keys);
    memo.push({
      method,
      path,
      re,
      keys,
      handler: createHandler(method, handler),
    });
    return memo;
  }, []);
}

function parseKey(key) {
  let method = 'get';
  let path = key;
  if (/\s+/.test(key)) {
    const splited = key.split(/\s+/);
    method = splited[0].toLowerCase();
    path = splited[1]; // eslint-disable-line
  }
  assert(
    VALID_METHODS.includes(method),
    `Invalid method ${method} for path ${path}, please check your mock files.`,
  );
  return {
    method,
    path,
  };
}

function getMockFiles(opts) {
  // console.log(opts);
  let mockFiles = glob
    .sync(opts.path, {
      ignore: ['**/node_modules/**'],
    })
    .map(p => resolve(process.cwd(), p));
  console.log(91, mockFiles);

  // 处理一下路径，不然在 win 下面会报错
  //   mockFiles = mockFiles.map(p => windowPath(p));
  // console.log(95,mockFiles);
  return mockFiles;
}

function getMockConfigFromFiles(files) {
  console.log(97, files);
  return files.reduce((memo, mockFile) => {
    console.log(99);
    try {
      const m = require(mockFile); // eslint-disable-line
      return {
        ...memo,
        ...(m.default || m),
      };
    } catch (e) {
      throw new Error(e.stack);
    }
  }, {});
}

function getMockConfig(opts) {
  console.log(2233);
  const files = getMockFiles(opts);
  console.log(115, files);
  return getMockConfigFromFiles(files);
}

module.exports = function(opts) {
  spinner = opts.spinner;

  try {
    return normalizeConfig(getMockConfig(opts));
  } catch (e) {
    spinner.fail(`Mock files parse failed`);
  }
};

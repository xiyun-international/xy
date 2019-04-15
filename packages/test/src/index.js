import jest from 'jest';
import { join } from 'path';
import { existsSync } from 'fs';

const debug = require('debug')('xy-test');

process.env.NODE_ENV = 'test';

export default function(opts = {}) {
  const { cwd = process.cwd(), moduleNameMapper } = opts;
  let transformInclude = opts.transformInclude || [];
  if (typeof transformInclude === 'string') {
    transformInclude = [transformInclude];
  }

  const jestConfigFile = join(cwd, 'jest.config.js');
  let userJestConfig = {};
  if (existsSync(jestConfigFile)) {
    userJestConfig = require(jestConfigFile); // eslint-disable-line
  }

  const {
    moduleNameMapper: userModuleNameMapper,
    ...restUserJestConfig
  } = userJestConfig;

  const config = {
    rootDir: process.cwd(),
    testMatch: ['**/?*.(spec|test|e2e).(j|t)s?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    testPathIgnorePatterns: ['/node_modules/'],
    ...(restUserJestConfig || {}),
  };

  delete opts.transformInclude;

  return new Promise((resolve, reject) => {
    jest
      .runCLI(
        {
          config: JSON.stringify(config),
          ...opts,
        },
        [cwd],
      )
      .then(result => {
        debug(result);
        const { results } = result;
        if (results.success) {
          resolve();
        } else {
          reject(new Error('Jest failed'));
        }
      })
      .catch(e => {
        console.log(e);
      });
  });
}

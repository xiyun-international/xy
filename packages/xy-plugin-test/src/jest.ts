const fs = require('fs');
const cwd = process.cwd();
const path = require('path');

const config = {
  transform: {
    '^.+\\.js$': require.resolve('babel-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(vue)$': require.resolve('vue-jest'),
  },
  // serializer for snapshots
  snapshotSerializers: ['jest-serializer-vue'],
  transformIgnorePatterns: ['node_modules'],
  testMatch: ['**/?*.(spec|test|e2e).(j|t)s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
};

async function run(cmd) {
  const jestArgs = [
    '--env',
    'node',
    '--runInBand',
    '-all',
    JSON.stringify(config),
  ];
  require('jest').run(jestArgs);
}

export default run;

import { existsSync } from 'fs';
import { getExistFile } from './utils';

function testDefault(obj) {
  return obj.default || obj;
}

export const CONFIG_FILES = [
  '.xy.library.js',
  '.xy.library.ts',
];

export default function ({ cwd }) {
  const configFile = getExistFile({
    cwd,
    files: CONFIG_FILES,
  });

  if (existsSync(configFile)) {
    return testDefault(require(configFile));
  } else {
    return {};
  }
}

import { existsSync } from 'fs';
import { join } from 'path';

const cwd = process.cwd();

/**
 * 检测文件是否存在
 * @param object
 */
export function getExistFile({ cwd, files }) {
  for (const file of files) {
    const absFilePath = join(cwd, file);
    if (existsSync(absFilePath)) {
      return file;
    }
  }
}

export function getProjectPath(...filePath) {
  return join(cwd, ...filePath);
}

export function resolve(moduleName) {
  return require.resolve(moduleName);
}

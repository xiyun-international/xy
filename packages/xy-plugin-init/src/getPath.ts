import { join, resolve } from 'path';

export const getPath = filename => {
  const cwd = process.cwd();
  const sourceFile = join(__dirname, '../template', filename);
  const target = resolve(cwd, filename);
  return [sourceFile, target];
};

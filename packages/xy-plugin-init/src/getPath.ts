import { resolve } from 'path';

export const getPath = filename => {
  const cwd = process.cwd();
  const sourceFile = resolve('../template', filename);
  const target = resolve(cwd, filename);
  return [sourceFile, target];
};

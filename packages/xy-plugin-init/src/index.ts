import { copyFile } from 'fs';
import { resolve } from 'path';

export default {
  name: 'xy-plugin-init',
  command: 'init',
  alias: 'i',
  onRun: async api => {
    const cwd = process.cwd();
    const dirname = resolve(__dirname, '..');
    copyFile(`${dirname}\\.yarnrc`, `${cwd}\\.yarnrc`, err => {
      if (!err) {
        console.log('拷贝成功');
      }
    });
  },
};

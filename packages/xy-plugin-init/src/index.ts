import { copyFile } from 'fs';

export default {
  name: 'xy-plugin-init',
  command: 'init',
  alias: 'i',
  onRun: async api => {
    const cwd = process.cwd();
    const dirname = __dirname;
    copyFile(`${dirname}\\.yarnrc`, `${cwd}\.yarnrc`, err => {
      if (!err) {
        console.log('拷贝成功');
      }
    });
  },
};

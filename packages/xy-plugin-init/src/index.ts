import { copyFile } from 'fs';

export default {
  name: 'xy-plugin-init',
  command: 'init',
  alias: 'i',
  onRun: async api => {
    copyFile('./.yarnrc', api.args, err => {
      console.log('拷贝成功');
    });
  },
};

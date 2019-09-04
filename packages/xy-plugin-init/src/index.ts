import signale from 'signale';
import { copyFile } from 'fs';
import { getPath } from './getPath';

export default {
  name: 'xy-plugin-init',
  command: 'init',
  onRun: async api => {
    const opts = Object.keys(api.opts);
    if (opts.length === 1) {
      signale.error('请输入正确参数');
    }

    const filename = opts[1];
    const map = {
      yarn: '.yarnrc',
      editor: '.editorconfig',
    };

    const [sourceFile, target] = getPath(map[filename]);
    copyFile(sourceFile, target, err => {
      if (!err) {
        console.log('拷贝成功');
      }
    });
  },
};

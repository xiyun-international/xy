import Qiniu from './qiniu';
import inquirer from 'inquirer';
import assert from 'assert';

export default {
  name: 'xy-plugin-qiniu',
  command: 'qiniu',
  // onRun: async api => {
  //   const { opts } = api;
  //   opts['_'].splice(0, 1);
  //   await Upload(opts._, opts.config);
  // },
  onRun: async api => {
    const { opts } = api;
    opts['_'].splice(0, 1);
    assert(opts, 'No appName specified');

    (async () => {
      const { path } = await inquirer.prompt({
        name: 'path',
        type: 'input',
        message: '请输入您的七牛配置文件目录：',
        default: '',
      });
      const { prefix } = await inquirer.prompt({
        name: 'prefix',
        type: 'input',
        message: '请输入您要上传到的七牛目录，根目录无需输入：',
        default: '',
      });

      await Qiniu(opts._, path, prefix);
    })();
  },
};

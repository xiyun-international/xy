import { block } from '@xiyun/xy-plugin-block';
import { router } from '@xiyun/xy-plugin-router';

export default {
  name: 'xy-plugin-generator',
  command: 'generator',
  alias: 'g',
  onRun: async api => {
    const scaffold = api.opts.scaffold;
    const ele = api.opts.ele;
    const folder = api.args;

    /**
     *  --scaffold 下载 antd 或 ele 的全部代码。
     *  默认下载 antd 代码
     *  下载 ele 代码必须加 --ele
     */
    if (scaffold) {
      /**
       *  判断是否是 ele 类型的。
       *  不是的话默认下载 antd 类型。
       */
      if (ele) {
        /**
         *  判断有没有指定要保存的文件夹比如：xy g list，list指要保存的文件夹。
         *  没有的话默认保存到 views 里。
         */
        if (folder) {
          await block(
            `https://github.com/xiyun-international/template/tree/master/projects/ele`,
            `./src/views/${folder}`,
          );
          await router(folder);
        } else {
          await block(
            `https://github.com/xiyun-international/template/tree/master/projects/ele`,
            `./src/views`,
          );
          await router('views');
        }
      } else {
        if (folder) {
          await block(
            `https://github.com/xiyun-international/template/tree/master/projects/antd`,
            `./src/views/${folder}`,
          );
          await router(folder);
        } else {
          await block(
            `https://github.com/xiyun-international/template/tree/master/projects/antd`,
            `./src/views`,
          );
          await router('views');
        }
      }
    } else {
      if (folder) {
        if (ele) {
          await block(
            `https://github.com/xiyun-international/template/tree/master/projects/ele/${folder}`,
            `./src/views/${folder}`,
          );
          await router(folder);
        } else {
          await block(
            `https://github.com/xiyun-international/template/tree/master/projects/antd/${folder}`,
            `./src/views/${folder}`,
          );
          await router(folder);
        }
      } else {
        console.log('命令中应有保存到的文件夹');
      }
    }
  },
};

import { block } from '@xiyun/xy-plugin-block/lib';

export default {
  name: 'xy-plugin-generator',
  command: 'generator',
  alias: 'g',
  onRun: async api => {
    block(
      `https://github.com/xiyun-international/template/tree/master/projects/${api.args}`,
      `./${api.args}`,
    );
  },
};

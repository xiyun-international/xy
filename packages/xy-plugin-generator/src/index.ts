import { block } from '@xiyun/xy-plugin-block/lib';

export default {
  name: 'xy-plugin-generator',
  command: 'generator',
  alias: 'g',
  onRun: async api => {
    const scaffold = api.opts.scaffold;
    const dirname = __dirname;
    if (scaffold) {
      block(
        `https://github.com/xiyun-international/template/tree/master/projects`,
        `${dirname}/${api.args}`,
      );
    } else {
      block(
        `https://github.com/xiyun-international/template/tree/master/projects/${api.args}`,
        `${dirname}/${api.args}`,
      );
    }
  },
};

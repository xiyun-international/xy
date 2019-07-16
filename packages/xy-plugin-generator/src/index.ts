import { block } from '@xiyun/xy-plugin-block';
import { router } from '@xiyun/xy-plugin-router';

export default {
  name: 'xy-plugin-generator',
  command: 'generator',
  alias: 'g',
  onRun: async api => {
    const scaffold = api.opts.scaffold;
    const dirname = __dirname;
    if (scaffold) {
      await block(
        `https://github.com/xiyun-international/template/tree/master/projects`,
        `./src/views/${api.args}`,
      );
      await router(api.args);
    } else {
      await block(
        `https://github.com/xiyun-international/template/tree/master/projects/${api.args}`,
        `./src/views/${api.args}`,
      );
      await router(api.args);
    }
  },
};
